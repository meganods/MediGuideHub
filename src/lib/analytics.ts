import { collection, doc, setDoc, updateDoc, onSnapshot, query, increment } from "firebase/firestore";
import { firestore, adminFirestore } from "./firebase"; 

const isBrowser = typeof window !== "undefined";

export interface AnalyticsSession {
  id: string;
  startTime: number;
  lastActive: number;
  pageViews: number;
  isReturningUser: boolean;
  referrer: string;
}

const generateSessionId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const initAnalyticsSession = async () => {
  if (!isBrowser) return;
  if (!firestore) return;
  
  if (sessionStorage.getItem("mediguide4u_analytics_disabled")) {
    return;
  }

  const existingSessionId = sessionStorage.getItem("mediguide4u_session_id");
  if (existingSessionId) {
    return; // Already initialized for this tab/session
  }

  const sessionId = generateSessionId();
  sessionStorage.setItem("mediguide4u_session_id", sessionId);

  let isReturningUser = false;
  if (localStorage.getItem("mediguide4u_returning_user")) {
    isReturningUser = true;
  } else {
    localStorage.setItem("mediguide4u_returning_user", "true");
  }

  const sessionData: AnalyticsSession = {
    id: sessionId,
    startTime: Date.now(),
    lastActive: Date.now(),
    pageViews: 1,
    isReturningUser,
    referrer: document.referrer || "direct"
  };

  try {
    const sessionRef = doc(firestore, "analytics_sessions", sessionId);
    await setDoc(sessionRef, sessionData);
  } catch (error: any) {
    console.error("Failed to initialize analytics session:", error);
    if (error?.code === "permission-denied") {
      sessionStorage.setItem("mediguide4u_analytics_disabled", "true");
    }
  }
};

export const updateAnalyticsSession = async () => {
  if (!isBrowser) return;
  if (!firestore) return;
  
  if (sessionStorage.getItem("mediguide4u_analytics_disabled")) {
    return;
  }

  const sessionId = sessionStorage.getItem("mediguide4u_session_id");
  if (!sessionId) {
    await initAnalyticsSession();
    return;
  }

  try {
    const sessionRef = doc(firestore, "analytics_sessions", sessionId);
    await setDoc(sessionRef, {
      lastActive: Date.now(),
      pageViews: increment(1)
    }, { merge: true });
  } catch (error: any) {
    console.error("Failed to update analytics session:", error);
    if (error?.code === "permission-denied") {
      sessionStorage.setItem("mediguide4u_analytics_disabled", "true");
    } else if (error?.code === "not-found" || error?.message?.includes("No document to update")) {
      sessionStorage.removeItem("mediguide4u_session_id");
      await initAnalyticsSession();
    }
  }
};

export const subscribeToAnalytics = (callback: (sessions: AnalyticsSession[]) => void): (() => void) => {
  const db = adminFirestore || firestore;
  if (!db) return () => {};

  try {
    const q = query(collection(db, "analytics_sessions"));
    return onSnapshot(q, (snapshot) => {
      const sessions = snapshot.docs.map((d) => d.data() as AnalyticsSession);
      callback(sessions);
    }, (error) => {
      console.error("Error subscribing to analytics:", error);
    });
  } catch (error) {
    console.error("Failed to subscribe to analytics:", error);
    return () => {};
  }
};
