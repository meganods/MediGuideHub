import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if Firebase configs are provided
export const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId
);

let app;
let adminApp;
let auth: Auth | null = null;
let adminAuth: Auth | null = null;
let firestore: Firestore | null = null;
let adminFirestore: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    firestore = getFirestore(app);

    const apps = getApps();
    adminApp = apps.find(a => a.name === "adminApp") || initializeApp(firebaseConfig, "adminApp");
    adminAuth = getAuth(adminApp);
    adminFirestore = getFirestore(adminApp);
  } catch (error) {
    console.error("Firebase failed to initialize:", error);
  }
} else {
  if (typeof window !== "undefined") {
    console.warn(
      "Firebase environment variables are missing. MediGuide Hub will fall back to using LocalStorage for simulation."
    );
  }
}

export { app, auth, firestore, adminAuth, adminFirestore };
export default app;
