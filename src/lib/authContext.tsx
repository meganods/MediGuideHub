"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { auth as firebaseAuth, isFirebaseConfigured } from "./firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  updateEmail,
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { getUserProfile, saveUserProfile, UserProfile } from "./db";

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<UserProfile>;
  signup: (email: string, pass: string, name: string) => Promise<UserProfile>;
  logout: () => Promise<void>;
  updateAvatar: (url: string) => Promise<void>;
  updateProfile: (updates: { displayName?: string; email?: string; password?: string; currentPassword?: string }) => Promise<UserProfile>;
  deleteAccount: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<UserProfile>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@mediguide4u.com";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const isRegisteringRef = useRef(false);

  const buildProfileFromAuthUser = (
    authUser: { uid: string; email?: string | null; displayName?: string | null }
  ): UserProfile => ({
    uid: authUser.uid,
    email: authUser.email || "",
    displayName: authUser.displayName || authUser.email?.split("@")[0] || "User",
    role: "user",
    savedPosts: [],
    createdAt: new Date().toISOString(),
  });

  const ensureProfileForAuthUser = async (
    authUser: { uid: string; email?: string | null; displayName?: string | null }
  ): Promise<UserProfile> => {
    const existing = await getUserProfile(authUser.uid);
    if (existing) {
      return existing;
    }

    const newProfile = buildProfileFromAuthUser(authUser);
    try {
      await saveUserProfile(newProfile);
    } catch (error) {
      console.warn("Could not save newly created user profile:", error);
    }
    return newProfile;
  };

  // Sync session
  useEffect(() => {
    // Fast-track session load from local storage to prevent redirect flash
    const savedSession = localStorage.getItem("mediguide4u_current_user");
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        if (parsed) {
          if (parsed.role === "admin") {
            parsed.role = "user";
            localStorage.setItem("mediguide4u_current_user", JSON.stringify(parsed));
          }
          setUser(parsed);
        }
      } catch (e) {}
    }

    if (isFirebaseConfigured && firebaseAuth) {
      const unsubscribe = onAuthStateChanged(firebaseAuth, async (fbUser) => {
        if (isRegisteringRef.current) {
          return;
        }
        if (fbUser) {
          if (fbUser.email?.toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase()) {
            await signOut(firebaseAuth!);
            setUser(null);
            localStorage.removeItem("mediguide4u_current_user");
            setLoading(false);
            return;
          }
          const profile = await ensureProfileForAuthUser(fbUser);
          localStorage.setItem("mediguide4u_current_user", JSON.stringify(profile));
          setUser(profile);
        } else {
          localStorage.removeItem("mediguide4u_current_user");
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // LocalStorage Mock Auth Session
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<UserProfile> => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === DEFAULT_ADMIN_EMAIL.toLowerCase()) {
      throw new Error("Admin logins must use the administrator login portal.");
    }
    
    if (isFirebaseConfigured && firebaseAuth) {
      const credentials = await signInWithEmailAndPassword(firebaseAuth, cleanEmail, pass);
      const profile = await ensureProfileForAuthUser(credentials.user);
      if (profile.banned) {
        await signOut(firebaseAuth);
        throw new Error("This account has been banned by an administrator.");
      }
      setUser(profile);
      return profile;
    } else {
      // Mock Authentication
      const users = JSON.parse(localStorage.getItem("mediguide4u_users") || "[]") as UserProfile[];
      const found = users.find((u) => u.email === cleanEmail);
      if (!found) {
        // Create user on the fly to make local testing extremely smooth!
        const newProfile: UserProfile = {
          uid: `user-${Date.now()}`,
          email: cleanEmail,
          displayName: cleanEmail.split("@")[0].toUpperCase(),
          role: "user",
          savedPosts: [],
          createdAt: new Date().toISOString(),
        };
        users.push(newProfile);
        localStorage.setItem("mediguide4u_users", JSON.stringify(users));
        localStorage.setItem("mediguide4u_current_user", JSON.stringify(newProfile));
        setUser(newProfile);
        return newProfile;
      }
      if (found.banned) {
        throw new Error("This account has been banned by an administrator.");
      }
      localStorage.setItem("mediguide4u_current_user", JSON.stringify(found));
      setUser(found);
      return found;
    }
  };

  const signup = async (email: string, pass: string, name: string): Promise<UserProfile> => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === DEFAULT_ADMIN_EMAIL.toLowerCase()) {
      throw new Error("Admin registration is not permitted through this portal.");
    }
    
    if (isFirebaseConfigured && firebaseAuth) {
      isRegisteringRef.current = true;
      try {
        const credentials = await createUserWithEmailAndPassword(firebaseAuth, cleanEmail, pass);
        const newProfile: UserProfile = {
          uid: credentials.user.uid,
          email: cleanEmail,
          displayName: name,
          role: "user",
          savedPosts: [],
          createdAt: new Date().toISOString(),
        };
        await saveUserProfile(newProfile);
        await signOut(firebaseAuth);
        return newProfile;
      } finally {
        isRegisteringRef.current = false;
      }
    } else {
      // Mock signup
      const users = JSON.parse(localStorage.getItem("mediguide4u_users") || "[]") as UserProfile[];
      if (users.some((u) => u.email === cleanEmail)) {
        throw new Error("User already exists with this email address.");
      }
      const newProfile: UserProfile = {
        uid: `user-${Date.now()}`,
        email: cleanEmail,
        displayName: name,
        role: "user",
        savedPosts: [],
        createdAt: new Date().toISOString(),
      };
      users.push(newProfile);
      localStorage.setItem("mediguide4u_users", JSON.stringify(users));
      return newProfile;
    }
  };

  const logout = async (): Promise<void> => {
    if (isFirebaseConfigured && firebaseAuth) {
      await signOut(firebaseAuth);
    }
    localStorage.removeItem("mediguide4u_current_user");
    setUser(null);
  };

  const updateAvatar = async (url: string): Promise<void> => {
    if (!user) return;
    const updated = { ...user, avatarUrl: url };
    await saveUserProfile(updated);
    setUser(updated);
    if (!isFirebaseConfigured) {
      localStorage.setItem("mediguide4u_current_user", JSON.stringify(updated));
    }
  };

  const updateProfile = async (updates: { displayName?: string; email?: string; password?: string; currentPassword?: string }): Promise<UserProfile> => {
    if (!user) throw new Error("Please sign in to update your profile.");

    const nextProfile: UserProfile = {
      ...user,
      displayName: updates.displayName ?? user.displayName,
      email: (updates.email ?? user.email).trim().toLowerCase(),
    };

    if (isFirebaseConfigured && firebaseAuth && firebaseAuth.currentUser) {
      try {
        if (updates.password && updates.currentPassword) {
          const credential = EmailAuthProvider.credential(user.email, updates.currentPassword);
          await reauthenticateWithCredential(firebaseAuth.currentUser, credential);
        } else if (updates.password && !updates.currentPassword) {
          throw new Error("Current password is required to change your password.");
        }

        if (updates.email && updates.email.trim().toLowerCase() !== user.email.toLowerCase()) {
          await updateEmail(firebaseAuth.currentUser, updates.email.trim().toLowerCase());
        }
        if (updates.password) {
          await updatePassword(firebaseAuth.currentUser, updates.password);
        }
      } catch (error) {
        console.error("Firebase profile update failed:", error);
        throw error;
      }
    }

    await saveUserProfile(nextProfile);
    setUser(nextProfile);
    if (typeof window !== "undefined") {
      localStorage.setItem("mediguide4u_current_user", JSON.stringify(nextProfile));
    }
    return nextProfile;
  };

  const deleteAccount = async (): Promise<void> => {
    if (!user) return;

    if (isFirebaseConfigured && firebaseAuth && firebaseAuth.currentUser) {
      try {
        await deleteUser(firebaseAuth.currentUser);
      } catch (error) {
        console.error("Could not delete Firebase account:", error);
        throw error;
      }
    }

    if (typeof window !== "undefined") {
      const users = JSON.parse(localStorage.getItem("mediguide4u_users") || "[]") as UserProfile[];
      const remaining = users.filter((entry) => entry.uid !== user.uid);
      localStorage.setItem("mediguide4u_users", JSON.stringify(remaining));
      localStorage.removeItem("mediguide4u_current_user");
    }

    setUser(null);
  };

  const forgotPassword = async (email: string): Promise<void> => {
    const cleanEmail = email.trim().toLowerCase();
    if (isFirebaseConfigured && firebaseAuth) {
      await sendPasswordResetEmail(firebaseAuth, cleanEmail);
    } else {
      // Simulation: verify user exists in local storage
      const users = JSON.parse(localStorage.getItem("mediguide4u_users") || "[]") as UserProfile[];
      const found = users.some((u) => u.email === cleanEmail);
      if (!found && cleanEmail !== "admin@mediguide4u.com") {
        throw new Error("No user found with this email address.");
      }
      console.log(`[Simulation] Password reset email sent to ${cleanEmail}`);
    }
  };

  const signInWithGoogle = async (): Promise<UserProfile> => {
    if (isFirebaseConfigured && firebaseAuth) {
      const provider = new GoogleAuthProvider();
      const credentials = await signInWithPopup(firebaseAuth, provider);
      const profile = await ensureProfileForAuthUser(credentials.user);
      if (profile.banned) {
        await signOut(firebaseAuth!);
        throw new Error("This account has been banned by an administrator.");
      }
      setUser(profile);
      return profile;
    } else {
      // Mock Google Login
      const cleanEmail = "googleuser@example.com";
      const users = JSON.parse(localStorage.getItem("mediguide4u_users") || "[]") as UserProfile[];
      let found = users.find((u) => u.email === cleanEmail);
      if (!found) {
        found = {
          uid: `google-${Date.now()}`,
          email: cleanEmail,
          displayName: "Google User Demo",
          role: "user",
          savedPosts: [],
          createdAt: new Date().toISOString(),
        };
        users.push(found);
        localStorage.setItem("mediguide4u_users", JSON.stringify(users));
      }
      localStorage.setItem("mediguide4u_current_user", JSON.stringify(found));
      setUser(found);
      return found;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateAvatar, updateProfile, deleteAccount, forgotPassword, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
