"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { adminAuth, isFirebaseConfigured } from "./firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getUserProfile, saveUserProfile, UserProfile } from "./db";

interface AdminAuthContextType {
  adminUser: UserProfile | null;
  adminLoading: boolean;
  adminLogin: (email: string, pass: string) => Promise<UserProfile>;
  adminLogout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const DEFAULT_ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@mediguide.com";
const DEFAULT_ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Admin@1234";

const fallbackToLocalAdmin = (email: string, pass: string): UserProfile | null => {
  if (email.trim().toLowerCase() !== DEFAULT_ADMIN_EMAIL || pass !== DEFAULT_ADMIN_PASSWORD) {
    return null;
  }

  if (typeof window === "undefined") {
    return null;
  }

  const users = JSON.parse(localStorage.getItem("mediguide_admin_users") || "[]") as UserProfile[];
  let profile = users.find((u) => u.email === DEFAULT_ADMIN_EMAIL);

  if (!profile) {
    profile = {
      uid: `admin-${Date.now()}`,
      email: DEFAULT_ADMIN_EMAIL,
      displayName: "Hub Administrator",
      role: "admin",
      savedPosts: [],
      createdAt: new Date().toISOString(),
    };
    users.push(profile);
    localStorage.setItem("mediguide_admin_users", JSON.stringify(users));
  }

  localStorage.setItem("mediguide_admin_user", JSON.stringify(profile));
  return profile;
};

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [adminUser, setAdminUser] = useState<UserProfile | null>(null);
  const [adminLoading, setAdminLoading] = useState(true);

  const buildProfileFromAuthUser = (
    authUser: { uid: string; email?: string | null; displayName?: string | null }
  ): UserProfile => ({
    uid: authUser.uid,
    email: authUser.email || "",
    displayName: authUser.displayName || authUser.email?.split("@")[0] || "Admin",
    role: "admin",
    savedPosts: [],
    createdAt: new Date().toISOString(),
  });

  const ensureAdminProfileForAuthUser = async (
    authUser: { uid: string; email?: string | null; displayName?: string | null }
  ): Promise<UserProfile> => {
    const existing = await getUserProfile(authUser.uid);
    const isDefaultAdmin = authUser.email?.toLowerCase() === DEFAULT_ADMIN_EMAIL;

    if (existing) {
      if (isDefaultAdmin && existing.role !== "admin") {
        existing.role = "admin";
        try {
          await saveUserProfile(existing);
        } catch (e) {}
      }
      return existing;
    }

    const newProfile = buildProfileFromAuthUser(authUser);
    if (isDefaultAdmin) {
      try {
        await saveUserProfile(newProfile);
      } catch (error) {
        console.warn("Could not save newly created admin profile:", error);
      }
    }
    return newProfile;
  };

  // Sync session
  useEffect(() => {
    const savedSession = localStorage.getItem("mediguide_admin_user");
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        if (parsed && parsed.email?.toLowerCase() === DEFAULT_ADMIN_EMAIL) {
          setAdminUser(parsed);
        }
      } catch (e) {}
    }

    if (isFirebaseConfigured && adminAuth) {
      const unsubscribe = onAuthStateChanged(adminAuth, async (fbUser) => {
        if (fbUser && fbUser.email?.toLowerCase() === DEFAULT_ADMIN_EMAIL) {
          const profile = await ensureAdminProfileForAuthUser(fbUser);
          localStorage.setItem("mediguide_admin_user", JSON.stringify(profile));
          setAdminUser(profile);
        } else {
          // Keep local fallback admin logged in even if Firebase Auth doesn't have an active session
          const savedSession = localStorage.getItem("mediguide_admin_user");
          let isLocalAdmin = false;
          if (savedSession) {
            try {
              const parsed = JSON.parse(savedSession);
              if (parsed && parsed.role === "admin" && parsed.email?.toLowerCase() === DEFAULT_ADMIN_EMAIL) {
                isLocalAdmin = true;
              }
            } catch (e) {}
          }

          if (!isLocalAdmin) {
            localStorage.removeItem("mediguide_admin_user");
            setAdminUser(null);
          }
        }
        setAdminLoading(false);
      });
      return () => unsubscribe();
    } else {
      setAdminLoading(false);
    }
  }, []);

  const adminLogin = async (email: string, pass: string): Promise<UserProfile> => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail !== DEFAULT_ADMIN_EMAIL) {
      throw new Error("Only the primary administrator email is permitted to log into the admin portal.");
    }

    if (isFirebaseConfigured && adminAuth) {
      try {
        const credentials = await signInWithEmailAndPassword(adminAuth, cleanEmail, pass);
        const profile = await ensureAdminProfileForAuthUser(credentials.user);
        setAdminUser(profile);
        return profile;
      } catch (error) {
        const localProfile = fallbackToLocalAdmin(cleanEmail, pass);
        if (localProfile) {
          setAdminUser(localProfile);
          return localProfile;
        }
        throw error;
      }
    } else {
      const localProfile = fallbackToLocalAdmin(cleanEmail, pass);
      if (localProfile) {
        setAdminUser(localProfile);
        return localProfile;
      }
      throw new Error("Invalid admin credentials.");
    }
  };

  const adminLogout = async (): Promise<void> => {
    if (isFirebaseConfigured && adminAuth) {
      await signOut(adminAuth);
    }
    localStorage.removeItem("mediguide_admin_user");
    setAdminUser(null);
  };

  const forgotPassword = async (email: string): Promise<void> => {
    if (isFirebaseConfigured && adminAuth) {
      await sendPasswordResetEmail(adminAuth, email);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        adminLoading,
        adminLogin,
        adminLogout,
        forgotPassword,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
