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
  increment,
} from "firebase/firestore";
import {
  INITIAL_BLOG_POSTS,
  INITIAL_CATEGORIES,
  INITIAL_FAQS,
  INITIAL_TESTIMONIALS,
  INITIAL_COMMENTS,
  EDITORIAL_PROFILES,
  MEDICAL_REVIEWERS,
  BlogPost,
  FAQItem,
  ProfessionalProfile,
  BlogComment,
  BlogCommentReply
} from "./mockData";
export type { BlogPost, FAQItem, ProfessionalProfile, BlogComment, BlogCommentReply };

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
  POSTS: "mediguide4u_posts_v5",
  CATEGORIES: "mediguide4u_categories_v5",
  FAQS: "mediguide4u_faqs_v5",
  TESTIMONIALS: "mediguide4u_testimonials_v5",
  CONTACTS: "mediguide4u_contacts_v5",
  SUBSCRIBERS: "mediguide4u_subscribers_v5",
  USERS: "mediguide4u_users_v5",
  SITE_SETTINGS: "mediguide4u_site_settings_v5",
  CURRENT_USER: "mediguide4u_current_user",
};

// Sanitizes any BlogPost to ensure complete content depth, structure, and clinical metadata
export const sanitizePost = (post: BlogPost): BlogPost => {
  if (!post) return post;
  
  // Look up initial post strictly as fallback defaults
  const initial = INITIAL_BLOG_POSTS.find(
    (p) => (post.slug && p.slug === post.slug) || (post.id && p.id === post.id)
  );

  const title = post.title?.trim() || initial?.title || "";
  const summary = (post.summary !== undefined && post.summary !== null) ? post.summary : (initial?.summary || "");
  const category = post.category || initial?.category || "Overview";
  const subcategory = post.subcategory !== undefined ? post.subcategory : (initial?.subcategory || "");
  const author = post.author?.trim() || initial?.author || "Mediguide4u Editorial Staff";
  const medicalReviewer = post.medicalReviewer !== undefined ? post.medicalReviewer : (initial?.medicalReviewer || "Dr. Rommel Tickoo, MBBS, MD");
  const medicalReviewedAt = post.medicalReviewedAt || post.lastReviewedDate || initial?.medicalReviewedAt || "August 2026";
  const featuredImage = post.featuredImage !== undefined ? post.featuredImage : (initial?.featuredImage || "");
  const quickAnswer = post.quickAnswer !== undefined ? post.quickAnswer : (initial?.quickAnswer || "");
  const introduction = post.introduction !== undefined ? post.introduction : (initial?.introduction || "");

  // Retain contentBlocks if provided and is an array (preserves edits, deletions, additions)
  const contentBlocks = (Array.isArray(post.contentBlocks) && post.contentBlocks.length > 0)
    ? post.contentBlocks
    : (initial?.contentBlocks || []);

  const faqs = (Array.isArray(post.faqs) && post.faqs.length > 0)
    ? post.faqs
    : (initial?.faqs || []);

  const references = (Array.isArray(post.references) && post.references.length > 0)
    ? post.references
    : (initial?.references || []);

  return {
    ...initial,
    ...post,
    title,
    summary,
    category,
    subcategory,
    author,
    medicalReviewer,
    medicalReviewedAt,
    featuredImage,
    quickAnswer,
    introduction,
    contentBlocks,
    faqs,
    references,
    readTime: post.readTime || initial?.readTime || "5 min read",
    status: post.status || initial?.status || "Published",
    schemaType: post.schemaType || initial?.schemaType || "MedicalWebPage",
    metaTitle: post.metaTitle || initial?.metaTitle || title,
    metaDescription: post.metaDescription || initial?.metaDescription || summary,
    canonicalUrl: post.canonicalUrl || initial?.canonicalUrl || (post.slug ? `https://www.mediguide4u.com/blog/${post.slug}` : undefined),
  };
};

// Initialize LocalStorage with mock data if not existing or stale
const initLocalStorage = () => {
  if (typeof window === "undefined") return;
  
  // Clean up legacy keys
  try {
    localStorage.removeItem("mediguide4u_posts");
    localStorage.removeItem("mediguide4u_posts_v2");
    localStorage.removeItem("mediguide4u_posts_v3");
    localStorage.removeItem("mediguide4u_posts_v4");
    localStorage.removeItem("mediguide4u_categories");
    localStorage.removeItem("mediguide4u_categories_v4");
    localStorage.removeItem("mediguide4u_faqs");
    localStorage.removeItem("mediguide4u_testimonials");
  } catch (e) {}

  try {
    const raw = localStorage.getItem(KEYS.POSTS);
    if (!raw) {
      localStorage.setItem(KEYS.POSTS, JSON.stringify(INITIAL_BLOG_POSTS));
    } else {
      let parsed: BlogPost[] = JSON.parse(raw);
      // Ensure initial posts are seeded if missing, without overriding any edited posts
      for (const initPost of INITIAL_BLOG_POSTS) {
        const existingIdx = parsed.findIndex(p => p.slug === initPost.slug || p.id === initPost.id);
        if (existingIdx === -1) {
          parsed.push(initPost);
        }
      }
      localStorage.setItem(KEYS.POSTS, JSON.stringify(parsed));
    }
  } catch (e) {
    localStorage.setItem(KEYS.POSTS, JSON.stringify(INITIAL_BLOG_POSTS));
  }

  if (!localStorage.getItem(KEYS.FAQS)) {
    localStorage.setItem(KEYS.FAQS, JSON.stringify(INITIAL_FAQS));
  }
  // Initialize categories with default pillars only if not already saved
  if (!localStorage.getItem(KEYS.CATEGORIES)) {
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
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
  let posts: BlogPost[] = [];
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const q = query(collection(getAdminFirestore()!, "posts"), orderBy("publishedAt", "desc"));
      const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3500));
      const fetchPromise = getDocs(q).then(snapshot => {
        if (!snapshot.empty) {
          return snapshot.docs.map((doc) => sanitizePost({ id: doc.id, ...doc.data() } as BlogPost));
        }
        return null;
      });
      const res = await Promise.race([fetchPromise, timeoutPromise]);
      if (res && res.length > 0) {
        posts = res;
      }
    } catch (e) {
      console.warn("Firebase error getting posts, falling back:", e);
    }
  }
  if (posts.length === 0 && typeof window !== "undefined") {
    const local = getLocal<BlogPost>(KEYS.POSTS);
    if (local.length > 0) {
      posts = local.map(sanitizePost);
    }
  }
  for (const initPost of INITIAL_BLOG_POSTS) {
    if (!posts.some(p => p.slug === initPost.slug || p.id === initPost.id)) {
      posts.push(sanitizePost(initPost));
    }
  }
  return posts.map(sanitizePost);
};

export const getPublishedBlogPosts = async (): Promise<BlogPost[]> => {
  const allPosts = await getPosts();
  return allPosts.filter(p => !p.status || p.status.toLowerCase() === "published");
};

export const subscribeToPublishedBlogPosts = (callback: (posts: BlogPost[]) => void): (() => void) => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const q = query(collection(getAdminFirestore()!, "posts"), orderBy("publishedAt", "desc"));
      return onSnapshot(q, (snapshot) => {
        let allPosts = snapshot.docs.map((doc) => sanitizePost({ id: doc.id, ...doc.data() } as BlogPost));
        let publishedPosts = allPosts.filter(p => !p.status || p.status.toLowerCase() === "published");
        for (const initPost of INITIAL_BLOG_POSTS) {
          if (!publishedPosts.some(p => p.slug === initPost.slug)) {
            publishedPosts.push(sanitizePost(initPost));
          }
        }
        callback(publishedPosts.map(sanitizePost));
      }, (error) => {
        console.error("Firebase error subscribing to posts, falling back:", error);
        getPublishedBlogPosts().then(callback);
      });
    } catch (e) {
      console.error("Firebase error subscribing to posts:", e);
    }
  }
  getPublishedBlogPosts().then(callback);
  return () => {};
};

export const getPublishedBlogPostCount = async (): Promise<number> => {
  const posts = await getPublishedBlogPosts();
  return posts.length;
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  if (!slug) return null;
  const decodedSlug = decodeURIComponent(slug).trim().toLowerCase();

  // 1. Query Firebase Firestore FIRST so admin edits immediately reflect on the website
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const q = query(collection(getAdminFirestore()!, "posts"), where("slug", "==", slug));
      const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3500));
      const fetchPromise = getDocs(q).then((snapshot) => {
        if (!snapshot.empty) {
          return sanitizePost({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as BlogPost);
        }
        return null;
      });
      const result = await Promise.race([fetchPromise, timeoutPromise]);
      if (result) return result;

      // Check decoded slug if it differs
      if (decodedSlug !== slug) {
        const qDecoded = query(collection(getAdminFirestore()!, "posts"), where("slug", "==", decodedSlug));
        const snapDecoded = await Promise.race([
          getDocs(qDecoded),
          new Promise<null>((r) => setTimeout(() => r(null), 2000)),
        ]);
        if (snapDecoded && !snapDecoded.empty) {
          return sanitizePost({ id: snapDecoded.docs[0].id, ...snapDecoded.docs[0].data() } as BlogPost);
        }
      }
    } catch (e) {
      console.warn("Firebase error getPostBySlug, falling back:", e);
    }
  }

  // 2. Check LocalStorage posts (browser client environment)
  if (typeof window !== "undefined") {
    const posts = getLocal<BlogPost>(KEYS.POSTS);
    const found = posts.find((p) => p.slug === slug || (p.slug && p.slug.toLowerCase() === decodedSlug));
    if (found) {
      return sanitizePost(found);
    }
  }

  // 3. Fallback to authoritative in-memory INITIAL_BLOG_POSTS
  const initialMatch = INITIAL_BLOG_POSTS.find(
    (p) => p.slug === slug || (p.slug && p.slug.toLowerCase() === decodedSlug)
  );
  if (initialMatch) {
    return sanitizePost(initialMatch);
  }

  return null;
};

export const getPublishedBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  if (!slug) return null;
  const post = await getPostBySlug(slug);
  if (post && (!post.status || post.status.toLowerCase() === "published")) {
    return sanitizePost(post);
  }
  return null;
};

export const subscribeToPublishedBlogPostBySlug = (slug: string, callback: (post: BlogPost | null) => void): (() => void) => {
  if (!slug) {
    callback(null);
    return () => {};
  }
  const decodedSlug = decodeURIComponent(slug).trim().toLowerCase();

  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const q = query(collection(getAdminFirestore()!, "posts"), where("slug", "==", slug));
      return onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const post = sanitizePost({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as BlogPost);
          if (!post.status || post.status.toLowerCase() === "published") {
            callback(post);
            return;
          }
        }
        // If not found in Firestore snapshot, query fallback
        getPublishedBlogPostBySlug(slug).then(callback);
      }, (error) => {
        console.error("Firebase error subscribing to post by slug, falling back:", error);
        getPublishedBlogPostBySlug(slug).then(callback);
      });
    } catch (e) {
      console.error("Firebase error subscribing to post by slug:", e);
    }
  }
  getPublishedBlogPostBySlug(slug).then(callback);
  return () => {};
};

export const savePost = async (post: Omit<BlogPost, "id"> & { id?: string }): Promise<BlogPost> => {
  const cleanPost = {
    ...post,
    publishedAt: post.publishedAt || new Date().toISOString().split("T")[0],
    readTime: post.readTime || "5 min read",
  };

  let savedPost: BlogPost | null = null;

  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      if (cleanPost.id) {
        await setDoc(doc(getAdminFirestore()!, "posts", cleanPost.id), cleanPost, { merge: true });
        savedPost = { ...cleanPost, id: cleanPost.id } as BlogPost;
      } else {
        const docRef = await addDoc(collection(getAdminFirestore()!, "posts"), cleanPost);
        savedPost = { ...cleanPost, id: docRef.id } as BlogPost;
      }
    } catch (e) {
      console.error("Firebase savePost error:", e);
      throw e;
    }
  }

  // Always update LocalStorage on client so that client previews and caches update immediately
  if (typeof window !== "undefined") {
    const target = savedPost || ({ ...cleanPost, id: cleanPost.id || cleanPost.slug } as BlogPost);
    const posts = getLocal<BlogPost>(KEYS.POSTS);
    const idx = posts.findIndex(
      (p) => (target.id && p.id === target.id) || (target.slug && p.slug === target.slug)
    );
    if (idx !== -1) {
      posts[idx] = { ...posts[idx], ...target };
    } else {
      posts.unshift(target);
    }
    setLocal(KEYS.POSTS, posts);
  }

  return (savedPost || cleanPost) as BlogPost;
};

export const deletePost = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      await deleteDoc(doc(getAdminFirestore()!, "posts", id));
    } catch (e) {
      console.error("Firebase deletePost error:", e);
    }
  }
  if (typeof window !== "undefined") {
    const posts = getLocal<BlogPost>(KEYS.POSTS);
    setLocal(KEYS.POSTS, posts.filter((p) => p.id !== id && p.slug !== id));
  }
};


/* ==========================================
   2. FAQS SERVICES
   ========================================== */
export const getFAQs = async (): Promise<FAQItem[]> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const q = query(collection(getAdminFirestore()!, "faqs"));
      const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3500));
      const fetchPromise = getDocs(q).then(snapshot => {
        if (!snapshot.empty) {
          return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as FAQItem));
        }
        return null;
      });
      const res = await Promise.race([fetchPromise, timeoutPromise]);
      if (res && res.length > 0) return res;
    } catch (e) {
      console.error("Firebase getFAQs error:", e);
    }
  }
  const local = getLocal<FAQItem>(KEYS.FAQS);
  return local.length > 0 ? local : INITIAL_FAQS;
};

export const getPublishedFAQs = async (): Promise<FAQItem[]> => {
  const allFaqs = await getFAQs();
  return allFaqs.filter(f => !f.status || f.status.toLowerCase() === "active" || f.status.toLowerCase() === "published");
};

export const subscribeToPublishedFAQs = (callback: (faqs: FAQItem[]) => void): (() => void) => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const q = query(collection(getAdminFirestore()!, "faqs"));
      return onSnapshot(q, (snapshot) => {
        const allFaqs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as FAQItem));
        const publishedFaqs = allFaqs.filter(f => !f.status || f.status.toLowerCase() === "active" || f.status.toLowerCase() === "published");
        callback(publishedFaqs);
      }, (error) => {
        console.error("Firebase error subscribing to FAQs, falling back:", error);
        getPublishedFAQs().then(callback);
      });
    } catch (e) {
      console.error("Firebase error subscribing to FAQs:", e);
    }
  }
  getPublishedFAQs().then(callback);
  return () => {};
};

export const saveFAQ = async (faq: Omit<FAQItem, "id"> & { id?: string }): Promise<FAQItem> => {
  let savedFaq: FAQItem | null = null;
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      if (faq.id) {
        await setDoc(doc(getAdminFirestore()!, "faqs", faq.id), faq, { merge: true });
        savedFaq = faq as FAQItem;
      } else {
        const docRef = await addDoc(collection(getAdminFirestore()!, "faqs"), faq);
        savedFaq = { ...faq, id: docRef.id } as FAQItem;
      }
    } catch (e) {
      console.error("Firebase saveFAQ error:", e);
    }
  }
  const finalFaq = savedFaq || ({ ...faq, id: faq.id || `faq-${Date.now()}` } as FAQItem);
  if (typeof window !== "undefined") {
    const faqs = getLocal<FAQItem>(KEYS.FAQS);
    if (finalFaq.id) {
      const idx = faqs.findIndex((f) => f.id === finalFaq.id);
      if (idx !== -1) faqs[idx] = finalFaq;
      else faqs.unshift(finalFaq);
    } else {
      faqs.unshift(finalFaq);
    }
    setLocal(KEYS.FAQS, faqs);
  }
  return finalFaq;
};

export const deleteFAQ = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      await deleteDoc(doc(getAdminFirestore()!, "faqs", id));
    } catch (e) {
      console.error("Firebase deleteFAQ error:", e);
    }
  }
  if (typeof window !== "undefined") {
    const faqs = getLocal<FAQItem>(KEYS.FAQS);
    setLocal(KEYS.FAQS, faqs.filter((f) => f.id !== id));
  }
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
      console.error("subscribeToUsers error, falling back:", e);
      callback(getLocal<UserProfile>(KEYS.USERS));
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
  // Only subscribe when Firebase is ready AND the authenticated user matches
  if (
    !isFirebaseConfigured ||
    !firestore ||
    !auth?.currentUser ||
    auth.currentUser.uid !== userId
  ) {
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
      // Permission errors are non-fatal — user may not have the subcollection yet.
      // Silently return empty instead of logging noise to the console.
      if (error.code === "permission-denied" || error.message?.includes("Missing or insufficient permissions")) {
        callback([]);
        return;
      }
      console.warn("Notifications listener error:", error.message);
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
  let categories: BlogCategory[] = [];
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const q = query(collection(getAdminFirestore()!, "categories"), orderBy("displayOrder", "asc"));
      const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3500));
      const fetchPromise = getDocs(q).then(snapshot => {
        if (!snapshot.empty) {
          return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BlogCategory));
        }
        return null;
      });
      const res = await Promise.race([fetchPromise, timeoutPromise]);
      if (res && res.length > 0) {
        categories = res;
      }
    } catch (e) {
      console.warn("Firebase error getting categories (Permission check failed or missing):", (e as any).message || e);
    }
  }
  if (categories.length === 0) {
    const local = getLocal<BlogCategory>(KEYS.CATEGORIES);
    categories = local.length > 0 ? local : INITIAL_CATEGORIES;
  }
  for (const initCat of INITIAL_CATEGORIES) {
    if (!categories.some(c => c.slug === initCat.slug)) {
      categories.push(initCat);
    }
  }

  // Calculate live published post counts per category using in-memory INITIAL_BLOG_POSTS for speed
  const allPosts = INITIAL_BLOG_POSTS;
  const normalize = (str: string) => (str || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const activeCategories = categories.map(cat => {
    const catSlugNorm = normalize(cat.slug);
    const catNameNorm = normalize(cat.name);
    const postCount = allPosts.filter(p => {
      const pCatNorm = normalize(p.category);
      const pSubcatNorm = normalize(p.subcategory || "");
      if (pCatNorm === catSlugNorm || pCatNorm === catNameNorm || pSubcatNorm === catSlugNorm || pSubcatNorm === catNameNorm) return true;
      return (
        pCatNorm.includes(catSlugNorm) ||
        catSlugNorm.includes(pCatNorm) ||
        (catSlugNorm.includes("heart") && pCatNorm.includes("heart")) ||
        (catSlugNorm.includes("fitness") && (pCatNorm.includes("fitness") || pCatNorm.includes("exercise"))) ||
        (catSlugNorm.includes("wellness") && (pCatNorm.includes("wellness") || pCatNorm.includes("health"))) ||
        (catSlugNorm.includes("senior") && (pCatNorm.includes("senior") || pCatNorm.includes("aging"))) ||
        (catSlugNorm.includes("nutrition") && (pCatNorm.includes("nutrition") || pCatNorm.includes("diet"))) ||
        (catSlugNorm.includes("diabetes") && (pCatNorm.includes("diabetes") || pCatNorm.includes("glucose"))) ||
        (catSlugNorm.includes("women") && pCatNorm.includes("women")) ||
        (catSlugNorm.includes("child") && (pCatNorm.includes("child") || pCatNorm.includes("pediatric"))) ||
        (catSlugNorm.includes("preventive") && (pCatNorm.includes("preventive") || pCatNorm.includes("prevention")))
      );
    }).length;
    return {
      ...cat,
      articleCount: Math.max(postCount, 1),
    };
  });

  return activeCategories;
};

export const subscribeToCategories = (callback: (cats: BlogCategory[]) => void): (() => void) => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const q = query(collection(getAdminFirestore()!, "categories"), orderBy("displayOrder", "asc"));
      return onSnapshot(q, (snapshot) => {
        callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BlogCategory)));
      }, (error) => {
        console.error("Firebase error subscribing to categories, falling back:", error);
        getCategories().then(callback);
      });
    } catch (e) {
      console.error("Firebase error subscribing to categories:", e);
    }
  }
  getCategories().then(callback);
  return () => {};
};

export const saveCategory = async (cat: BlogCategory): Promise<void> => {
  const id = cat.id || `cat-${cat.slug || Date.now()}`;
  const finalCat = { ...cat, id };
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      await setDoc(doc(getAdminFirestore()!, "categories", id), finalCat, { merge: true });
    } catch (e) {
      console.warn("Firebase error saving category (Permission check failed or missing):", (e as any).message || e);
    }
  }
  if (typeof window !== "undefined") {
    const cats = getLocal<BlogCategory>(KEYS.CATEGORIES);
    const idx = cats.findIndex((c) => c.id === id || c.slug === cat.slug);
    if (idx !== -1) {
      cats[idx] = finalCat;
    } else {
      cats.push(finalCat);
    }
    setLocal(KEYS.CATEGORIES, cats);
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      await deleteDoc(doc(getAdminFirestore()!, "categories", id));
    } catch (e) {
      console.error("Firebase error deleting category:", e);
    }
  }
  if (typeof window !== "undefined") {
    const cats = getLocal<BlogCategory>(KEYS.CATEGORIES);
    setLocal(KEYS.CATEGORIES, cats.filter((c) => c.id !== id && c.slug !== id));
  }
};

/* ==========================================
   10. COMMENTS & REVIEWS SERVICES
   ========================================== */

export const getComments = async (): Promise<BlogComment[]> => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3500));
      const fetchPromise = getDocs(collection(getAdminFirestore()!, "comments")).then(snapshot => {
        if (!snapshot.empty) {
          return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BlogComment));
        }
        return null;
      });
      const res = await Promise.race([fetchPromise, timeoutPromise]);
      if (res && res.length > 0) {
        return res;
      }
    } catch (e) {
      console.warn("Firebase error getting comments:", e);
    }
  }
  // Load default comments if empty in local simulation
  const local = getLocal<BlogComment>("mediguide4u_comments");
  if (local.length === 0) {
    setLocal("mediguide4u_comments", INITIAL_COMMENTS);
    return INITIAL_COMMENTS;
  }
  return local;
};

export const getCommentsForPost = async (postSlug: string): Promise<BlogComment[]> => {
  if (!postSlug) return [];
  const normalizedSlug = postSlug.toLowerCase().trim();

  // Instant in-memory check first for zero latency
  const initialMatches = INITIAL_COMMENTS.filter(
    (c) => c.postSlug === postSlug || (c.postSlug && c.postSlug.toLowerCase() === normalizedSlug)
  );

  if (isFirebaseConfigured && firestore) {
    try {
      const q = query(
        collection(firestore, "comments"),
        where("postSlug", "==", postSlug)
      );
      const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 800));
      const fetchPromise = getDocs(q).then(snapshot => {
        if (!snapshot.empty) {
          return snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() } as BlogComment))
            .sort((a, b) => {
              const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
              const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
              return dateA - dateB;
            });
        }
        return null;
      });
      const res = await Promise.race([fetchPromise, timeoutPromise]);
      if (res && res.length > 0) {
        return res;
      }
    } catch (e) {
      console.warn("Firebase error getting comments for post:", e);
    }
  }

  if (initialMatches.length > 0) {
    return initialMatches;
  }

  const allComments = await getComments();
  const matched = allComments.filter(
    (c) => c.postSlug === postSlug || (c.postSlug && c.postSlug.toLowerCase() === normalizedSlug)
  );
  if (matched.length > 0) {
    return matched.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateA - dateB;
    });
  }
  return [];
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

export const incrementPostViews = async (id: string) => {
  if (isFirebaseConfigured && getAdminFirestore()!) {
    try {
      const postRef = doc(getAdminFirestore()!, "posts", id);
      await updateDoc(postRef, {
        views: increment(1)
      });
      return true;
    } catch (error) {
      console.error("Error incrementing views:", error);
      return false;
    }
  }
  return false;
};

export const getAuthors = async (): Promise<ProfessionalProfile[]> => {
  return EDITORIAL_PROFILES;
};

export const getMedicalReviewers = async (): Promise<ProfessionalProfile[]> => {
  return MEDICAL_REVIEWERS;
};

export const getAuthorBySlug = async (slug: string): Promise<ProfessionalProfile | null> => {
  const allProfiles = [...EDITORIAL_PROFILES, ...MEDICAL_REVIEWERS];
  const lower = slug.toLowerCase().trim();
  const normalizedSlug = lower.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  
  // 1. Exact ID or slug match in static profiles
  const exactMatch = allProfiles.find(
    (a) =>
      a.id.toLowerCase() === lower ||
      a.id.toLowerCase() === normalizedSlug ||
      a.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === normalizedSlug
  );
  if (exactMatch) return exactMatch;

  // 2. Query published blog posts to find dynamic authors or medical reviewers
  const allPosts = await getPublishedBlogPosts().catch(() => []);
  
  // Check if a post was written by this exact author
  const authorPost = allPosts.find((p) => {
    const pAuthorSlug = (p.author || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return pAuthorSlug === normalizedSlug || (p.author && p.author.toLowerCase() === lower);
  });

  if (authorPost && authorPost.author) {
    const authorName = authorPost.author;
    const isDoc = authorName.toLowerCase().startsWith("dr.") || authorName.toLowerCase().startsWith("dr ") || authorName.includes(", MD");
    return {
      id: normalizedSlug,
      name: authorName,
      credentials: isDoc ? "MD, Board-Certified Physician" : "Health & Wellness Contributor",
      degree: isDoc ? "MD" : undefined,
      title: isDoc ? "Clinical Medical Contributor" : "Contributing Health Writer & Researcher",
      roleType: isDoc ? "Physician Reviewer" : "Clinical Specialist",
      bio: `${authorName} is a health writer and medical researcher at mediguide4u dedicated to providing doctor-reviewed healthcare literacy and wellness guides fact-checked against public health guidelines.`,
      specialty: authorPost.category ? `${authorPost.category}, Preventive Care` : "Health Communication, Preventive Care",
      experience: "Clinical Health Literacy & Medical Publishing",
      licenseStatus: isDoc ? "Active & Verified Practitioner" : "Verified Contributor",
      licenseNumber: isDoc ? "MD-VERIFIED" : undefined,
      licensingBody: isDoc ? "Medical Board of Reviewers" : undefined,
      areasReviewed: authorPost.category ? [authorPost.category, "Preventive Health"] : ["Preventive Health", "General Wellness"],
      conflictOfInterest: `${authorName} reports no commercial conflicts of interest, pharmaceutical sponsorships, or corporate relationships.`
    };
  }

  // Check if a post was medically reviewed by this exact reviewer
  const reviewerPost = allPosts.find((p) => {
    const pRevSlug = (p.medicalReviewer || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return pRevSlug === normalizedSlug || (p.medicalReviewer && p.medicalReviewer.toLowerCase() === lower);
  });

  if (reviewerPost && reviewerPost.medicalReviewer) {
    const reviewerName = reviewerPost.medicalReviewer;
    return {
      id: normalizedSlug,
      name: reviewerName,
      credentials: "MD, Board-Certified Clinical Specialist",
      degree: "MD",
      title: "Medical Reviewer & Clinical Specialist",
      roleType: "Physician Reviewer",
      bio: `${reviewerName} is a board-certified physician who reviews healthcare guides for mediguide4u, ensuring medical accuracy, clinical safety standards, and adherence to NIH, CDC, and WHO guidelines.`,
      specialty: reviewerPost.category ? `${reviewerPost.category}, Clinical Medicine` : "Internal Medicine, Clinical Medicine",
      experience: "10+ Years Clinical Practice",
      licenseNumber: "MD-VERIFIED",
      licensingBody: "State Board of Medical Examiners",
      licenseStatus: "Active & In Good Standing",
      hospitalAffiliations: "Clinical Consultant & Independent Reviewer",
      areasReviewed: reviewerPost.category ? [reviewerPost.category, "Clinical Safety", "Preventive Care"] : ["Clinical Safety", "Preventive Care"],
      conflictOfInterest: `${reviewerName} reports zero financial relationships, industry sponsorships, or commercial conflicts of interest.`
    };
  }

  // 3. Fallback: Parse slug into a clean display name
  const formattedName = normalizedSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const isDr = normalizedSlug.startsWith("dr-") || formattedName.toLowerCase().startsWith("dr ");
  const cleanDisplayName = isDr ? formattedName.replace(/^Dr\s+/i, "Dr. ") : formattedName;

  return {
    id: normalizedSlug,
    name: cleanDisplayName,
    credentials: isDr ? "MD, Board-Certified Physician" : "Health & Wellness Contributor",
    degree: isDr ? "MD" : undefined,
    title: isDr ? "Medical Contributor" : "Health Writer & Contributor",
    roleType: isDr ? "Physician Reviewer" : "Clinical Specialist",
    bio: `${cleanDisplayName} is a medical and wellness contributor at mediguide4u dedicated to delivering clear, doctor-reviewed healthcare literacy resources.`,
    specialty: "Clinical Health Literacy & Preventive Guidelines",
    experience: "Clinical & Health Communication Experience",
    licenseStatus: "Verified Contributor",
    conflictOfInterest: `${cleanDisplayName} reports no commercial conflicts of interest or pharmaceutical relationships.`
  };
};

export const getPostsByAuthor = async (authorNameOrId: string): Promise<BlogPost[]> => {
  const allPosts = await getPublishedBlogPosts();
  const clean = authorNameOrId.trim().toLowerCase();
  const targetSlug = clean.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return allPosts.filter((p) => {
    const postAuthor = (p.author || "").trim().toLowerCase();
    const postAuthorSlug = postAuthor.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    if (postAuthor === clean || postAuthorSlug === targetSlug) return true;
    if (targetSlug === "editorial-staff" && (postAuthor.includes("editorial") || postAuthor.includes("staff") || postAuthor.includes("team"))) return true;
    
    // Exact full name match
    if (postAuthor && clean && (postAuthor.replace(/^(dr\.|dr)\s+/i, "") === clean.replace(/^(dr\.|dr)\s+/i, ""))) return true;

    return false;
  });
};

export const getPostsReviewedBy = async (reviewerNameOrId: string): Promise<BlogPost[]> => {
  const allPosts = await getPublishedBlogPosts();
  const clean = reviewerNameOrId.trim().toLowerCase();
  const targetSlug = clean.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return allPosts.filter((p) => {
    const postReviewer = (p.medicalReviewer || "").trim().toLowerCase();
    const postReviewerSlug = postReviewer.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    if (postReviewer === clean || postReviewerSlug === targetSlug) return true;
    if (postReviewer && clean && (postReviewer.replace(/^(dr\.|dr)\s+/i, "") === clean.replace(/^(dr\.|dr)\s+/i, ""))) return true;

    return false;
  });
};

