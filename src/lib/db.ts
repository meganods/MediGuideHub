import { firestore, adminFirestore, auth, isFirebaseConfigured } from "./firebase";

const getAdminFirestore = () => {
  return adminFirestore || firestore;
};
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import {
  INITIAL_BLOG_POSTS,
  INITIAL_FAQS,
  INITIAL_TESTIMONIALS,
  BlogPost,
  FAQItem,
} from "./mockData";
export type { BlogPost, FAQItem };

// Interfaces
export interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  actionUrl?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  replied: boolean;
  read?: boolean;
  replyText?: string;
  userId?: string;
  userEmail?: string;
  resolved?: boolean;
  archived?: boolean;
  inquiryType?: string;
}

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  subscribedAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: "user" | "admin";
  savedPosts: string[];
  avatarUrl?: string;
  createdAt: string;
  banned?: boolean;
  streak?: number;
  lastActiveDate?: string;
  lastActive?: string;
  bookmarks?: Array<{ slug: string; date: string }>;
  readingHistory?: Array<{ slug: string; date: string; progress: number }>;
  healthInterests?: string[];
  newsletterSubscribed?: boolean;
  newsletterFrequency?: string;
  selectedNewsletterCats?: string[];
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  serviceIntro: string;
}

// LocalStorage Helper Keys
const KEYS = {
  POSTS: "mediguide4u_posts",
  FAQS: "mediguide4u_faqs",
  TESTIMONIALS: "mediguide4u_testimonials",
  CONTACTS: "mediguide4u_contacts",
  SUBSCRIBERS: "mediguide4u_subscribers",
  USERS: "mediguide4u_users",
  SITE_SETTINGS: "mediguide4u_site_settings",
  CURRENT_USER: "mediguide4u_current_user",
};

// Initialize LocalStorage with mock data if not existing
const initLocalStorage = () => {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(KEYS.POSTS)) {
    localStorage.setItem(KEYS.POSTS, JSON.stringify(INITIAL_BLOG_POSTS));
  }
  if (!localStorage.getItem(KEYS.FAQS)) {
    localStorage.setItem(KEYS.FAQS, JSON.stringify(INITIAL_FAQS));
  }
  if (!localStorage.getItem(KEYS.TESTIMONIALS)) {
    localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(INITIAL_TESTIMONIALS));
  }
  if (!localStorage.getItem(KEYS.CONTACTS)) {
    localStorage.setItem(KEYS.CONTACTS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.SUBSCRIBERS)) {
    localStorage.setItem(KEYS.SUBSCRIBERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.USERS)) {
    // Default admin and user profile simulation
    const defaultUsers: UserProfile[] = [
      {
        uid: "mock-admin-id",
        email: "admin@mediguide4u.com",
        displayName: "Administrator",
        role: "admin",
        savedPosts: [],
        avatarUrl: "",
        createdAt: new Date().toISOString(),
      },
      {
        uid: "mock-user-id",
        email: "user@mediguide4u.com",
        displayName: "John Doe",
        role: "user",
        savedPosts: ["preventive-care-guide"],
        avatarUrl: "",
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(KEYS.USERS, JSON.stringify(defaultUsers));
  }

  if (!localStorage.getItem(KEYS.SITE_SETTINGS)) {
    const defaultSettings: SiteSettings = {
      heroTitle: "Your trusted healthcare guide",
      heroSubtitle: "Helping you navigate wellness, nutrition, and mental health with confidence.",
      aboutText: "mediguide4u provides clear guidance for everyday health questions, nutrition, and wellness decisions.",
      serviceIntro: "We help you understand your health options with practical advice and step-by-step support.",
    };
    localStorage.setItem(KEYS.SITE_SETTINGS, JSON.stringify(defaultSettings));
  }
};

// Auto-run initialization
initLocalStorage();

// Standard Getter/Setter helpers for LocalStorage
const getLocal = <T>(key: string): T[] => {
  if (typeof window === "undefined") return [];
  initLocalStorage();
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : [];
};

const setLocal = <T>(key: string, data: T[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
};

/* ==========================================
   1. BLOG POSTS SERVICES
   ========================================== */
export const getPosts = async (): Promise<BlogPost[]> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const q = query(collection(getAdminFirestore()!, "posts"), orderBy("publishedAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BlogPost));
    } catch (e) {
      console.error("Firebase error getting posts, falling back:", e);
    }
  }
  return getLocal<BlogPost>(KEYS.POSTS);
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const q = query(collection(getAdminFirestore()!, "posts"), where("slug", "==", slug));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as BlogPost;
      }
    } catch (e) {
      console.error("Firebase error getPostBySlug, falling back:", e);
    }
  }
  const posts = getLocal<BlogPost>(KEYS.POSTS);
  return posts.find((p) => p.slug === slug) || null;
};

export const savePost = async (post: Omit<BlogPost, "id"> & { id?: string }): Promise<BlogPost> => {
  const cleanPost = {
    ...post,
    publishedAt: post.publishedAt || new Date().toISOString().split("T")[0],
    readTime: post.readTime || "5 min read",
  };

  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      if (cleanPost.id) {
        await setDoc(doc(getAdminFirestore()!, "posts", cleanPost.id), cleanPost, { merge: true });
        return { ...cleanPost, id: cleanPost.id } as BlogPost;
      } else {
        const docRef = await addDoc(collection(getAdminFirestore()!, "posts"), cleanPost);
        return { ...cleanPost, id: docRef.id } as BlogPost;
      }
    } catch (e) {
      console.error("Firebase savePost error:", e);
    }
  }

  // LocalStorage Fallback
  const posts = getLocal<BlogPost>(KEYS.POSTS);
  if (cleanPost.id) {
    const idx = posts.findIndex((p) => p.id === cleanPost.id);
    if (idx !== -1) {
      posts[idx] = { ...posts[idx], ...cleanPost } as BlogPost;
    }
  } else {
    const newId = cleanPost.slug;
    const newPost = { ...cleanPost, id: newId } as BlogPost;
    posts.unshift(newPost);
  }
  setLocal(KEYS.POSTS, posts);
  return cleanPost as BlogPost;
};

export const deletePost = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      await deleteDoc(doc(getAdminFirestore()!, "posts", id));
      return;
    } catch (e) {
      console.error("Firebase deletePost error:", e);
    }
  }
  const posts = getLocal<BlogPost>(KEYS.POSTS);
  setLocal(KEYS.POSTS, posts.filter((p) => p.id !== id));
};


/* ==========================================
   2. FAQS SERVICES
   ========================================== */
export const getFAQs = async (): Promise<FAQItem[]> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const snapshot = await getDocs(collection(getAdminFirestore()!, "faqs"));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as FAQItem));
    } catch (e) {
      console.error("Firebase error getting FAQs:", e);
    }
  }
  return getLocal<FAQItem>(KEYS.FAQS);
};

export const saveFAQ = async (faq: Omit<FAQItem, "id"> & { id?: string }): Promise<FAQItem> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      if (faq.id) {
        await setDoc(doc(getAdminFirestore()!, "faqs", faq.id), faq, { merge: true });
        return faq as FAQItem;
      } else {
        const docRef = await addDoc(collection(getAdminFirestore()!, "faqs"), faq);
        return { ...faq, id: docRef.id } as FAQItem;
      }
    } catch (e) {
      console.error("Firebase saveFAQ error:", e);
    }
  }
  const faqs = getLocal<FAQItem>(KEYS.FAQS);
  const finalFaq = { ...faq, id: faq.id || `faq-${Date.now()}` } as FAQItem;
  if (faq.id) {
    const idx = faqs.findIndex((f) => f.id === faq.id);
    if (idx !== -1) faqs[idx] = finalFaq;
  } else {
    faqs.push(finalFaq);
  }
  setLocal(KEYS.FAQS, faqs);
  return finalFaq;
};

export const deleteFAQ = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      await deleteDoc(doc(getAdminFirestore()!, "faqs", id));
      return;
    } catch (e) {
      console.error("Firebase deleteFAQ error:", e);
    }
  }
  const faqs = getLocal<FAQItem>(KEYS.FAQS);
  setLocal(KEYS.FAQS, faqs.filter((f) => f.id !== id));
};


/* ==========================================
   3. CONTACT MESSAGES SERVICES
   ========================================== */
export const getContactMessages = async (): Promise<ContactMessage[]> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const snapshot = await getDocs(query(collection(getAdminFirestore()!, "contactMessages"), orderBy("createdAt", "desc")));
      return snapshot.docs.map((doc) => ({ id: doc.id, read: doc.data().read ?? false, ...doc.data() } as ContactMessage));
    } catch (e) {
      console.warn("Firebase error getting contact messages (Permission check failed or missing):", (e as any).message || e);
    }
  }
  return getLocal<ContactMessage>(KEYS.CONTACTS);
};

export const getUserContactMessages = async (uid: string, email?: string): Promise<ContactMessage[]> => {
  const allMessages = await getContactMessages();
  const normalizedEmail = email?.trim().toLowerCase();

  return allMessages.filter((message) => {
    if (message.userId && message.userId === uid) return true;
    if (message.userEmail && normalizedEmail && message.userEmail.toLowerCase() === normalizedEmail) return true;
    if (!message.userId && !message.userEmail && normalizedEmail && message.email.toLowerCase() === normalizedEmail) return true;
    return false;
  });
};

export const sendContactMessage = async (msg: Omit<ContactMessage, "createdAt" | "replied">): Promise<ContactMessage> => {
  const fullMsg: ContactMessage = {
    ...msg,
    createdAt: new Date().toISOString(),
    replied: false,
    read: false,
  };

  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const docRef = await addDoc(collection(getAdminFirestore()!, "contactMessages"), fullMsg);
      await addNotificationToAdmins(
        "New Contact Message",
        `From ${fullMsg.name}: "${fullMsg.subject}"`,
        "/admin/dashboard?tab=messages"
      );
      return { ...fullMsg, id: docRef.id };
    } catch (e) {
      console.error("Firebase sendContactMessage error:", e);
    }
  }

  const msgs = getLocal<ContactMessage>(KEYS.CONTACTS);
  const finalMsg = { ...fullMsg, id: `msg-${Date.now()}` };
  msgs.unshift(finalMsg);
  setLocal(KEYS.CONTACTS, msgs);
  return finalMsg;
};

export const replyContactMessage = async (id: string, replyText: string): Promise<void> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const msgRef = doc(getAdminFirestore()!, "contactMessages", id);
      const snapshot = await getDoc(msgRef);
      const msgData = snapshot.data();
      
      await updateDoc(msgRef, {
        replied: true,
        read: true,
        replyText,
      });

      if (msgData?.userId) {
        await addNotificationToUser(
          msgData.userId,
          "Message Replied By Admin",
          `Subject: ${msgData.subject}`,
          "/dashboard"
        );
      }
      return;
    } catch (e) {
      console.error("Firebase replyContactMessage error:", e);
    }
  }
  const msgs = getLocal<ContactMessage>(KEYS.CONTACTS);
  const idx = msgs.findIndex((m) => m.id === id);
  if (idx !== -1) {
    msgs[idx].replied = true;
    msgs[idx].read = true;
    msgs[idx].replyText = replyText;
    setLocal(KEYS.CONTACTS, msgs);
  }
};

export const deleteContactMessage = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      await deleteDoc(doc(getAdminFirestore()!, "contactMessages", id));
      return;
    } catch (e) {
      console.error("Firebase deleteContactMessage error:", e);
    }
  }
  const msgs = getLocal<ContactMessage>(KEYS.CONTACTS);
  setLocal(KEYS.CONTACTS, msgs.filter((m) => m.id !== id));
};


/* ==========================================
   4. NEWSLETTER SERVICES
   ========================================== */
export const getSubscribers = async (): Promise<NewsletterSubscriber[]> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const snapshot = await getDocs(collection(getAdminFirestore()!, "newsletterSubscribers"));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as NewsletterSubscriber));
    } catch (e) {
      console.warn("Firebase error getting subscribers (Permission check failed or missing):", (e as any).message || e);
    }
  }
  return getLocal<NewsletterSubscriber>(KEYS.SUBSCRIBERS);
};

export const subscribeNewsletter = async (email: string): Promise<boolean> => {
  const cleanEmail = email.trim().toLowerCase();
  const sub: NewsletterSubscriber = {
    email: cleanEmail,
    subscribedAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      // Check duplicate
      const q = query(collection(getAdminFirestore()!, "newsletterSubscribers"), where("email", "==", cleanEmail));
      const snap = await getDocs(q);
      if (!snap.empty) return false; // Already subscribed

      await addDoc(collection(getAdminFirestore()!, "newsletterSubscribers"), sub);
      
      // Trigger notification for admin users
      await addNotificationToAdmins(
        "New Subscriber",
        `A new reader has subscribed to the newsletter: ${cleanEmail}`,
        "/admin/dashboard?tab=subscribers"
      );
      
      return true;
    } catch (e) {
      console.error("Firebase subscribeNewsletter error:", e);
    }
  }

  const subs = getLocal<NewsletterSubscriber>(KEYS.SUBSCRIBERS);
  if (subs.some((s) => s.email === cleanEmail)) return false;

  subs.push({ ...sub, id: `sub-${Date.now()}` });
  setLocal(KEYS.SUBSCRIBERS, subs);

  // Local storage fallback: notify local admin users
  const localUsers = getLocal<UserProfile>(KEYS.USERS);
  const localAdmins = localUsers.filter((u) => u.role === "admin" || u.email === "admin@mediguide4u.com");
  for (const admin of localAdmins) {
    await addNotificationToUser(
      admin.uid,
      "New Subscriber",
      `A new reader has subscribed to the newsletter: ${cleanEmail}`,
      "/admin/dashboard?tab=subscribers"
    );
  }

  return true;
};


/* ==========================================
   5. USERS & PROFILES SERVICES
   ========================================== */
export const getUsers = async (): Promise<UserProfile[]> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const snapshot = await getDocs(collection(getAdminFirestore()!, "users"));
      return snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() } as UserProfile));
    } catch (e) {
      console.warn("Firebase error getting users (Permission check failed or missing):", (e as any).message || e);
    }
  }
  return getLocal<UserProfile>(KEYS.USERS);
};

export const subscribeToUsers = (callback: (users: UserProfile[]) => void) => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    const q = collection(getAdminFirestore()!, "users");
    return onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() } as UserProfile));
      callback(list);
    }, (e) => {
      console.error("subscribeToUsers error:", e);
    });
  }
  callback(getLocal<UserProfile>(KEYS.USERS));
  return () => {};
};

export async function updateUserRole(userId: string, newRole: string) {
  if (!isFirebaseConfigured || !getAdminFirestore()!) return;
  const userRef = doc(getAdminFirestore()!, "users", userId);
  await updateDoc(userRef, { role: newRole });
}

// ==========================================
// Notifications
// ==========================================

export function subscribeToUserNotifications(
  userId: string,
  callback: (notifications: Notification[]) => void
) {
  if (!isFirebaseConfigured || !firestore || !auth?.currentUser) {
    callback([]);
    return () => {}; // empty unsubscribe
  }
  
  const notificationsRef = collection(firestore, "users", userId, "notifications");
  const q = query(notificationsRef, orderBy("createdAt", "desc"));
  
  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const notifs: Notification[] = [];
      snapshot.forEach((doc) => {
        notifs.push({ id: doc.id, ...doc.data() } as Notification);
      });
      callback(notifs);
    },
    (error) => {
      console.warn("Notifications listener status:", error.message);
      callback([]);
    }
  );
  
  return unsubscribe;
}

export async function markNotificationAsRead(userId: string, notificationId: string) {
  if (!isFirebaseConfigured || !firestore) return;
  const notificationRef = doc(firestore, "users", userId, "notifications", notificationId);
  await updateDoc(notificationRef, { read: true });
}

export async function addNotificationToUser(
  userId: string,
  title: string,
  message: string,
  actionUrl?: string
) {
  if (isFirebaseConfigured && firestore) {
    try {
      const notifsRef = collection(firestore, "users", userId, "notifications");
      await addDoc(notifsRef, {
        title,
        message,
        createdAt: new Date().toISOString(),
        read: false,
        actionUrl: actionUrl || "",
      });
    } catch (e) {
      console.error("Error adding notification to Firebase:", e);
    }
  } else {
    const key = `local_notifs_${userId}`;
    const notifs = getLocal<any>(key);
    notifs.unshift({
      id: `notif-${Date.now()}`,
      title,
      message,
      createdAt: new Date().toISOString(),
      read: false,
      actionUrl: actionUrl || "",
    });
    setLocal(key, notifs);
  }
}

export async function addNotificationToAdmins(
  title: string,
  message: string,
  actionUrl?: string
) {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const q = query(collection(getAdminFirestore()!!, "users"), where("role", "==", "admin"));
      const snapshot = await getDocs(q);
      snapshot.forEach(async (docRef) => {
        const notifsRef = collection(getAdminFirestore()!!, "users", docRef.id, "notifications");
        await addDoc(notifsRef, {
          title,
          message,
          createdAt: new Date().toISOString(),
          read: false,
          actionUrl: actionUrl || "",
        });
      });
    } catch (e) {
      console.error("Error adding notification to admins:", e);
    }
  }
}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  if (!uid) return null;
  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, "users", uid);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { uid, ...snapshot.data() } as UserProfile;
      }
    } catch (e) {
      console.warn("Firebase error getting user profile:", e);
    }
  }
  const users = getLocal<UserProfile>(KEYS.USERS);
  return users.find((u) => u.uid === uid) || null;
};

export const saveUserProfile = async (profile: UserProfile): Promise<void> => {
  if (isFirebaseConfigured && firestore) {
    try {
      await setDoc(doc(firestore, "users", profile.uid), profile, { merge: true });
      return;
    } catch (e) {
      console.error("Firebase saveUserProfile error:", e);
    }
  }
  const users = getLocal<UserProfile>(KEYS.USERS);
  const idx = users.findIndex((u) => u.uid === profile.uid);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...profile };
  } else {
    users.push(profile);
  }
  setLocal(KEYS.USERS, users);
};

export const updateUserSavedPosts = async (uid: string, slug: string, action: "save" | "unsave"): Promise<UserProfile | null> => {
  const profile = await getUserProfile(uid);
  if (!profile) return null;

  if (action === "save") {
    if (!profile.savedPosts.includes(slug)) {
      profile.savedPosts.push(slug);
    }
  } else {
    profile.savedPosts = profile.savedPosts.filter((s) => s !== slug);
  }

  await saveUserProfile(profile);
  return profile;
};

export const banUserProfile = async (uid: string, banState: boolean): Promise<void> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      await updateDoc(doc(getAdminFirestore()!, "users", uid), { banned: banState });
      return;
    } catch (e) {
      console.error("Firebase banUserProfile error:", e);
    }
  }
  const users = getLocal<UserProfile>(KEYS.USERS);
  const idx = users.findIndex((u) => u.uid === uid);
  if (idx !== -1) {
    users[idx].banned = banState;
    setLocal(KEYS.USERS, users);
  }
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const snapshot = await getDoc(doc(getAdminFirestore()!, "siteSettings", "app"));
      if (snapshot.exists()) {
        return snapshot.data() as SiteSettings;
      }
    } catch (e) {
      console.error("Firebase error getting site settings:", e);
    }
  }
  const settings = getLocal<SiteSettings>(KEYS.SITE_SETTINGS);
  return settings[0] || {
    heroTitle: "",
    heroSubtitle: "",
    aboutText: "",
    serviceIntro: "",
  };
};

export const saveSiteSettings = async (settings: SiteSettings): Promise<void> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      await setDoc(doc(getAdminFirestore()!, "siteSettings", "app"), settings, { merge: true });
      return;
    } catch (e) {
      console.error("Firebase error saving site settings:", e);
    }
  }
  setLocal(KEYS.SITE_SETTINGS, [settings]);
};

export interface LegalPage {
  slug: string;
  title: string;
  content: string;
  lastUpdated: string;
  published: boolean;
  versionHistory: Array<{
    date: string;
    content: string;
    updatedBy: string;
  }>;
}

export const resolveContactMessage = async (id: string, resolved: boolean): Promise<void> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      await updateDoc(doc(getAdminFirestore()!, "contactMessages", id), { resolved });
      return;
    } catch (e) {
      console.error("Firebase resolveContactMessage error:", e);
    }
  }
  const msgs = getLocal<ContactMessage>(KEYS.CONTACTS);
  const idx = msgs.findIndex((m) => m.id === id);
  if (idx !== -1) {
    msgs[idx].resolved = resolved;
    setLocal(KEYS.CONTACTS, msgs);
  }
};

export const archiveContactMessage = async (id: string, archived: boolean): Promise<void> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      await updateDoc(doc(getAdminFirestore()!, "contactMessages", id), { archived });
      return;
    } catch (e) {
      console.error("Firebase archiveContactMessage error:", e);
    }
  }
  const msgs = getLocal<ContactMessage>(KEYS.CONTACTS);
  const idx = msgs.findIndex((m) => m.id === id);
  if (idx !== -1) {
    msgs[idx].archived = archived;
    setLocal(KEYS.CONTACTS, msgs);
  }
};

export const getLegalPage = async (slug: string): Promise<LegalPage | null> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const snapshot = await getDoc(doc(getAdminFirestore()!, "legalPages", slug));
      if (snapshot.exists()) {
        return snapshot.data() as LegalPage;
      }
    } catch (e) {
      console.error("Firebase error getting legal page:", e);
    }
  }
  const pages = getLocal<LegalPage>("mediguide4u_legal_pages");
  const page = pages.find((p) => p.slug === slug);
  return page || null;
};

export const updateLegalPage = async (slug: string, updates: Partial<LegalPage>): Promise<void> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      await setDoc(doc(getAdminFirestore()!, "legalPages", slug), { slug, ...updates }, { merge: true });
      return;
    } catch (e) {
      console.error("Firebase error updating legal page:", e);
    }
  }
  const pages = getLocal<LegalPage>("mediguide4u_legal_pages");
  const idx = pages.findIndex((p) => p.slug === slug);
  if (idx !== -1) {
    pages[idx] = { ...pages[idx], ...updates } as LegalPage;
  } else {
    pages.push({ slug, ...updates } as LegalPage);
  }
  setLocal("mediguide4u_legal_pages", pages);
};

export interface BlogCategory {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  bannerImage?: string;
  thumbnail?: string;
  displayOrder?: number;
  parentCategory?: string;
  featuredCategory?: boolean;
  status?: "Active" | "Inactive";
  seoTitle?: string;
  seoDesc?: string;
  seoFocusKeyword?: string;
  seoCanonical?: string;
  seoSchemaType?: string;
  seoOgImage?: string;
  articleCount?: number;
  seoScore?: number;
  createdAt?: string;
}

export const getCategories = async (): Promise<BlogCategory[]> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const snapshot = await getDocs(query(collection(getAdminFirestore()!, "categories"), orderBy("displayOrder", "asc")));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BlogCategory));
    } catch (e) {
      console.warn("Firebase error getting categories (Permission check failed or missing):", (e as any).message || e);
    }
  }
  return getLocal<BlogCategory>("mediguide4u_categories");
};

export const saveCategory = async (cat: BlogCategory): Promise<void> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const id = cat.id || doc(collection(getAdminFirestore()!, "categories")).id;
      await setDoc(doc(getAdminFirestore()!, "categories", id), { ...cat, id }, { merge: true });
      return;
    } catch (e) {
      console.warn("Firebase error saving category (Permission check failed or missing):", (e as any).message || e);
    }
  }
  const cats = getLocal<BlogCategory>("mediguide4u_categories");
  if (cat.id) {
    const idx = cats.findIndex((c) => c.id === cat.id);
    if (idx !== -1) {
      cats[idx] = cat;
    }
  } else {
    cat.id = `cat-${Date.now()}`;
    cats.push(cat);
  }
  setLocal("mediguide4u_categories", cats);
};

export const deleteCategory = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      await deleteDoc(doc(getAdminFirestore()!, "categories", id));
      return;
    } catch (e) {
      console.error("Firebase error deleting category:", e);
    }
  }
  const cats = getLocal<BlogCategory>("mediguide4u_categories");
  setLocal("mediguide4u_categories", cats.filter((c) => c.id !== id));
};

/* ==========================================
   10. COMMENTS SERVICES
   ========================================== */
export interface BlogComment {
  id?: string;
  postSlug: string;
  postTitle: string;
  name: string;
  text: string;
  date: string;
  createdAt: string;
}

export const getComments = async (): Promise<BlogComment[]> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const snapshot = await getDocs(collection(getAdminFirestore()!, "comments"));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BlogComment));
    } catch (e) {
      console.warn("Firebase error getting comments:", e);
    }
  }
  // Load default comments if empty in local simulation
  const local = getLocal<BlogComment>("mediguide4u_comments");
  if (local.length === 0) {
    const defaultComments = [
      { id: "c1", postSlug: "medicare-advantage-plans-overview", postTitle: "Medicare Advantage Plans: Overview", name: "Sarah K.", text: "This guide on Preventive Care is extremely detailed. The tips helped me understand what to do.", date: "July 24, 2026", createdAt: "2026-07-24T12:00:00.000Z" },
      { id: "c2", postSlug: "medicare-advantage-plans-overview", postTitle: "Medicare Advantage Plans: Overview", name: "Robert M.", text: "Very helpful overview. I shared this with my parents who are approaching retirement age.", date: "July 28, 2026", createdAt: "2026-07-28T12:00:00.000Z" }
    ];
    setLocal("mediguide4u_comments", defaultComments);
    return defaultComments;
  }
  return local;
};

export const getCommentsForPost = async (postSlug: string): Promise<BlogComment[]> => {
  if (isFirebaseConfigured && firestore) {
    try {
      const q = query(
        collection(firestore, "comments"),
        where("postSlug", "==", postSlug)
      );
      const snapshot = await getDocs(q);
      
      const mapAndSort = (docs: any[]) => {
        return docs
          .map((doc) => ({ id: doc.id, ...doc.data() } as BlogComment))
          .sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateA - dateB;
          });
      };

      // Seed if live db is empty for this post slug to keep standard demo comment list
      if (snapshot.empty && postSlug === "medicare-advantage-plans-overview") {
        const defaultComments = [
          { postSlug: "medicare-advantage-plans-overview", postTitle: "Medicare Advantage Plans: Overview", name: "Sarah K.", text: "This guide on Preventive Care is extremely detailed. The tips helped me understand what to do.", date: "July 24, 2026", createdAt: "2026-07-24T12:00:00.000Z" },
          { postSlug: "medicare-advantage-plans-overview", postTitle: "Medicare Advantage Plans: Overview", name: "Robert M.", text: "Very helpful overview. I shared this with my parents who are approaching retirement age.", date: "July 28, 2026", createdAt: "2026-07-28T12:00:00.000Z" }
        ];
        for (const c of defaultComments) {
          await addDoc(collection(firestore, "comments"), c);
        }
        const refetched = await getDocs(q);
        return mapAndSort(refetched.docs);
      }
      return mapAndSort(snapshot.docs);
    } catch (e) {
      console.warn("Firebase error getting comments for post:", e);
    }
  }
  const allComments = await getComments();
  return allComments
    .filter((c) => c.postSlug === postSlug)
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateA - dateB;
    });
};

export const addComment = async (comment: BlogComment): Promise<void> => {
  if (isFirebaseConfigured && firestore) {
    try {
      await addDoc(collection(firestore, "comments"), comment);
      return;
    } catch (e) {
      console.error("Firebase addComment error:", e);
    }
  }
  const local = getLocal<BlogComment>("mediguide4u_comments");
  comment.id = `comment-${Date.now()}-${Math.random()}`;
  local.push(comment);
  setLocal("mediguide4u_comments", local);
};

export const deleteComment = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      await deleteDoc(doc(getAdminFirestore()!, "comments", id));
      return;
    } catch (e) {
      console.error("Firebase deleteComment error:", e);
    }
  }
  const local = getLocal<BlogComment>("mediguide4u_comments");
  const filtered = local.filter((c) => c.id !== id);
  setLocal("mediguide4u_comments", filtered);
};
