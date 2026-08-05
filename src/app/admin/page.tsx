"use client";

import React, { useEffect, useState, Suspense, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getPosts,
  savePost,
  deletePost,
  getUsers,
  banUserProfile,
  saveUserProfile,
  getContactMessages,
  replyContactMessage,
  deleteContactMessage,
  getSubscribers,
  getSiteSettings,
  saveSiteSettings,
  getFAQs,
  saveFAQ,
  deleteFAQ,
  ContactMessage,
  NewsletterSubscriber,
  UserProfile,
  SiteSettings,
  FAQItem,
  Notification,
  subscribeToUserNotifications,
  markNotificationAsRead,
} from "@/lib/db";
import { uploadImage } from "@/lib/cloudinary";
import { BlogPost } from "@/lib/mockData";
import { firestore, isFirebaseConfigured } from "@/lib/firebase";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import {
  Users,
  FileText,
  MessageSquare,
  Mail,
  Shield,
  Trash2,
  Edit,
  Plus,
  Ban,
  Unlock,
  CheckCircle,
  Clock,
  Download,
  Loader2,
  Upload,
  LayoutDashboard,
  Settings,
  Menu,
  X,
  Bell,
  Globe,
  HelpCircle,
} from "lucide-react";

function AdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, logout } = useAuth();

  const tabParam = searchParams.get("tab") || "dashboard";
  const [activeTab, setActiveTab] = useState(tabParam);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (loading || !user) return;
    
    const unsubscribe = subscribeToUserNotifications(user.uid, (newNotifs) => {
      setNotifications(newNotifs);
    });
    return () => unsubscribe();
  }, [user, loading]);

  // Stats
  const [stats, setStats] = useState({ users: 0, posts: 0, messages: 0, subs: 0, faqs: 0 });

  // Data lists
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    heroTitle: "",
    heroSubtitle: "",
    aboutText: "",
    serviceIntro: "",
  });

  // Post Editor state
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postSlug, setPostSlug] = useState("");
  const [postCategory, setPostCategory] = useState("Overview");
  const [postSummary, setPostSummary] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postAuthor, setPostAuthor] = useState("");
  const [postReadTime, setPostReadTime] = useState("5 min read");
  const [postImage, setPostImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  // FAQ Editor state
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [isAddingFAQ, setIsAddingFAQ] = useState(false);
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [faqCategory, setFaqCategory] = useState("General");

  // Message Reply state
  const [replyTextMap, setReplyTextMap] = useState<{ [key: string]: string }>({});
  const [savingSettings, setSavingSettings] = useState(false);

  const loadAllData = async () => {
    try {
      const allPosts = await getPosts();
      const allUsers = await getUsers();
      const allMsgs = await getContactMessages();
      const allSubs = await getSubscribers();
      const allFaqs = await getFAQs();
      const settings = await getSiteSettings();

      setPosts(allPosts);
      setUsersList(allUsers);
      setMessages(allMsgs);
      setSubscribers(allSubs);
      setFaqs(allFaqs);
      setSiteSettings(settings);

      setStats({
        users: allUsers.length,
        posts: allPosts.length,
        messages: allMsgs.filter((msg) => !msg.replied).length,
        subs: allSubs.length,
        faqs: allFaqs.length,
      });
    } catch (e) {
      console.error("Error loading admin data:", e);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/admin/login?redirect=" + encodeURIComponent("/admin"));
      } else if (user.role !== "admin") {
        router.push("/");
      } else {
        setTimeout(() => {
          loadAllData();
        }, 0);
      }
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (loading || !user || user.role !== "admin") return;

    if (isFirebaseConfigured && firestore) {
      const q = query(collection(firestore, "contactMessages"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ContactMessage));
        setMessages(msgs);
        setStats((prev) => ({ ...prev, messages: msgs.filter((msg) => !msg.replied).length }));
      });
      return () => unsubscribe();
    } else {
      // LocalStorage polling simulation
      const interval = setInterval(() => {
        const localMsgs = JSON.parse(localStorage.getItem("mediguide_contacts") || "[]") as ContactMessage[];
        setMessages(localMsgs);
        setStats((prev) => ({ ...prev, messages: localMsgs.filter((msg) => !msg.replied).length }));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [user, loading]);

  useEffect(() => {
    setTimeout(() => {
      setActiveTab(tabParam);
    }, 0);
  }, [tabParam]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setEditingPost(null);
    setIsAddingPost(false);
    setIsSidebarOpen(false);
    router.push(`/admin?tab=${tab}`);
  };

  // Blog operations
  const handleEditPostClick = (post: BlogPost) => {
    setEditingPost(post);
    setIsAddingPost(false);
    setPostTitle(post.title);
    setPostSlug(post.slug);
    setPostCategory(post.category);
    setPostSummary(post.summary);
    setPostContent(post.content);
    setPostAuthor(post.author);
    setPostReadTime(post.readTime);
    setPostImage(post.featuredImage);
  };

  const handleAddPostClick = (preserveDraft = false) => {
    const hasDraftContent = Boolean(postTitle || postSlug || postSummary || postContent || postAuthor || postReadTime || postImage);

    setEditingPost(null);
    setIsAddingPost(true);

    if (!preserveDraft || !hasDraftContent) {
      setPostTitle("");
      setPostSlug("");
      setPostCategory("Overview");
      setPostSummary("");
      setPostContent("");
      setPostAuthor(user?.displayName || "");
      setPostReadTime("");
      setPostImage("");
    }
  };

  const handlePostImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const url = await uploadImage(file);
      setPostImage(url);
    } catch (err) {
      console.error(err);
    } finally {
      setImageUploading(false);
    }
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postSlug || !postContent) return;

    try {
      const pData: Omit<BlogPost, "id"> & { id?: string } = {
        title: postTitle,
        slug: postSlug,
        category: postCategory || "Overview",
        summary: postSummary,
        content: postContent,
        author: postAuthor || "Admin",
        readTime: postReadTime || "5 min read",
        featuredImage: postImage,
        publishedAt: editingPost ? editingPost.publishedAt : new Date().toISOString().split("T")[0],
      };

      if (editingPost) {
        pData.id = editingPost.id;
      }

      await savePost(pData);
      setIsAddingPost(false);
      setEditingPost(null);
      await loadAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (confirm("Are you sure you want to delete this guide?")) {
      await deletePost(id);
      await loadAllData();
    }
  };

  // FAQ operations
  const handleEditFAQClick = (faq: FAQItem) => {
    setEditingFAQ(faq);
    setIsAddingFAQ(false);
    setFaqQuestion(faq.question);
    setFaqAnswer(faq.answer);
    setFaqCategory(faq.category);
  };

  const handleAddFAQClick = () => {
    setEditingFAQ(null);
    setIsAddingFAQ(true);
    setFaqQuestion("");
    setFaqAnswer("");
    setFaqCategory("General");
  };

  const handleSaveFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion || !faqAnswer) return;

    try {
      const fData: Omit<FAQItem, "id"> & { id?: string } = {
        question: faqQuestion,
        answer: faqAnswer,
        category: faqCategory || "General",
      };

      if (editingFAQ) {
        fData.id = editingFAQ.id;
      }

      await saveFAQ(fData);
      setIsAddingFAQ(false);
      setEditingFAQ(null);
      await loadAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      await deleteFAQ(id);
      await loadAllData();
    }
  };

  // User operations
  const handleToggleBan = async (uid: string, currentState?: boolean) => {
    await banUserProfile(uid, !currentState);
    await loadAllData();
  };

  const handleToggleRole = async (targetUser: UserProfile) => {
    if (targetUser.uid === user?.uid) {
      alert("You cannot revoke your own admin rights!");
      return;
    }
    const newRole = targetUser.role === "admin" ? "user" : "admin";
    await saveUserProfile({ ...targetUser, role: newRole });
    await loadAllData();
  };

  // Contact operations
  const handleReplySubmit = async (msgId: string) => {
    const replyText = replyTextMap[msgId];
    if (!replyText) return;

    await replyContactMessage(msgId, replyText);
    setReplyTextMap({ ...replyTextMap, [msgId]: "" });
    await loadAllData();
  };

  const handleDeleteMessage = async (msgId: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      await deleteContactMessage(msgId);
      await loadAllData();
    }
  };

  const handleSaveSiteSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await saveSiteSettings(siteSettings);
      await loadAllData();
    } finally {
      setSavingSettings(false);
    }
  };

  // Export newsletter subscribers
  const handleExportCSV = () => {
    if (subscribers.length === 0) return;
    
    let csvContent = "data:text/csv;charset=utf-8,Email,Subscribed At\n";
    subscribers.forEach((sub) => {
      csvContent += `${sub.email},${sub.subscribedAt}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mediguide_newsletter_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const recentMessages = messages.slice(0, 5);
  const recentPosts = posts.slice(0, 5);

  if (loading || !user || user.role !== "admin") {
    return (
      <div className="flex-grow flex items-center justify-center py-24">
        <Loader2 className="animate-spin h-8 w-8 text-[#C9A15A]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-white border-b border-stone-200 py-4 px-4 sm:px-6 shadow-sm">
        <div className="w-full mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-stone-200 text-[#113F48] flex-shrink-0"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="bg-[#113F48] p-2 rounded-xl flex-shrink-0">
              <Shield className="h-5 w-5 text-[#C9A15A]" />
            </div>
            <span className="font-bold text-sm sm:text-base md:text-lg text-[#113F48] tracking-tight flex items-center gap-1.5 min-w-0 truncate">
              <span className="hidden sm:inline truncate">MediGuide Hub</span>
              <span className="sm:hidden">MediGuide</span>
              <span className="hidden sm:inline-block text-[#C9A15A] text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider bg-[#C9A15A]/10 border border-[#C9A15A]/20 px-1.5 sm:px-2 py-0.5 rounded whitespace-nowrap">Admin Portal</span>
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-stone-600 hover:text-[#113F48] bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors border border-stone-200 relative flex-shrink-0"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white ring-2 ring-white">
                  </span>
                )}
              </button>
              
              {/* Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden z-50">
                  <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-[#F9FAFB]">
                    <h3 className="font-bold text-[#113F48]">Notifications</h3>
                    <span className="text-xs bg-[#C9A15A]/10 text-[#C9A15A] px-2 py-1 rounded-full font-semibold">{unreadCount} New</span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-sm text-stone-500">
                        No notifications right now.
                      </div>
                    ) : (
                      <div className="divide-y divide-stone-100">
                        {notifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            onClick={() => {
                              if (!notif.read && user) markNotificationAsRead(user.uid, notif.id);
                            }}
                            className={`p-4 hover:bg-stone-50 transition-colors cursor-pointer ${!notif.read ? 'bg-[#C9A15A]/5' : ''}`}
                          >
                            <div className="flex justify-between items-start gap-3">
                              <div>
                                <p className={`text-sm ${!notif.read ? 'font-bold text-[#113F48]' : 'font-medium text-stone-700'}`}>{notif.title}</p>
                                <p className="text-xs text-stone-500 mt-1 line-clamp-2">{notif.message}</p>
                              </div>
                              {!notif.read && <div className="w-2 h-2 rounded-full bg-[#C9A15A] mt-1.5 flex-shrink-0" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={async () => {
                await logout();
                router.push("/admin/login");
              }}
              className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-3 py-2 rounded-xl transition-all whitespace-nowrap flex-shrink-0"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className={`fixed inset-0 z-40 bg-black/30 lg:hidden ${isSidebarOpen ? "block" : "hidden"}`} onClick={() => setIsSidebarOpen(false)} />
          <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#113F48] p-4 shadow-2xl transform transition-transform duration-300 ease-out lg:static lg:translate-x-0 lg:w-auto lg:col-span-3 lg:bg-transparent lg:p-0 lg:shadow-none ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
            <div className="flex items-center justify-between lg:hidden mb-6">
              <div className="flex items-center gap-2">
                <div className="bg-[#C9A15A] p-2 rounded-xl">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-white">MediGuide Hub</span>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#113F48] p-4 shadow-sm space-y-1.5 lg:border-[#C9A15A]/20 lg:bg-white lg:shadow-none">
              <button
                onClick={() => handleTabChange("dashboard")}
                className={`group w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ease-out ${
                  activeTab === "dashboard"
                    ? "bg-[#C9A15A] text-white shadow-sm"
                    : "text-white lg:text-stone-600 lg:hover:bg-[#F9FAFB] lg:hover:text-[#113F48] hover:bg-white/10 hover:text-white hover:translate-x-[3px]"
                }`}
              >
                <LayoutDashboard className={`h-4 w-4 transition-transform duration-200 ease-out ${activeTab === "dashboard" ? "scale-110" : "group-hover:scale-[1.12]"}`} />
                Dashboard
              </button>

              <button
                onClick={() => handleTabChange("posts")}
                className={`group w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ease-out ${
                  activeTab === "posts"
                    ? "bg-[#C9A15A] text-white shadow-sm"
                    : "text-white lg:text-stone-600 lg:hover:bg-[#F9FAFB] lg:hover:text-[#113F48] hover:bg-white/10 hover:text-white hover:translate-x-[3px]"
                }`}
              >
                <FileText className={`h-4 w-4 transition-transform duration-200 ease-out ${activeTab === "posts" ? "scale-110" : "group-hover:scale-[1.12]"}`} />
                Blog Posts
              </button>

              <button
                onClick={() => handleTabChange("users")}
                className={`group w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ease-out ${
                  activeTab === "users"
                    ? "bg-[#C9A15A] text-white shadow-sm"
                    : "text-white lg:text-stone-600 lg:hover:bg-[#F9FAFB] lg:hover:text-[#113F48] hover:bg-white/10 hover:text-white hover:translate-x-[3px]"
                }`}
              >
                <Users className={`h-4 w-4 transition-transform duration-200 ease-out ${activeTab === "users" ? "scale-110" : "group-hover:scale-[1.12]"}`} />
                Users
              </button>

              <button
                onClick={() => handleTabChange("messages")}
                className={`group w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ease-out ${
                  activeTab === "messages"
                    ? "bg-[#C9A15A] text-white shadow-sm"
                    : "text-white lg:text-stone-600 lg:hover:bg-[#F9FAFB] lg:hover:text-[#113F48] hover:bg-white/10 hover:text-white hover:translate-x-[3px]"
                }`}
              >
                <MessageSquare className={`h-4 w-4 transition-transform duration-200 ease-out ${activeTab === "messages" ? "scale-110" : "group-hover:scale-[1.12]"}`} />
                Messages
                {messages.filter((m) => !m.replied).length > 0 && (
                  <span className="ml-auto bg-[#FAEEDA] text-[#854F0B] text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {messages.filter((m) => !m.replied).length}
                  </span>
                )}
              </button>

              <button
                onClick={() => handleTabChange("subscribers")}
                className={`group w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ease-out ${
                  activeTab === "subscribers"
                    ? "bg-[#C9A15A] text-white shadow-sm"
                    : "text-white lg:text-stone-600 lg:hover:bg-[#F9FAFB] lg:hover:text-[#113F48] hover:bg-white/10 hover:text-white hover:translate-x-[3px]"
                }`}
              >
                <Mail className={`h-4 w-4 transition-transform duration-200 ease-out ${activeTab === "subscribers" ? "scale-110" : "group-hover:scale-[1.12]"}`} />
                Subscribers
              </button>

              <button
                onClick={() => handleTabChange("faqs")}
                className={`group w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ease-out ${
                  activeTab === "faqs"
                    ? "bg-[#C9A15A] text-white shadow-sm"
                    : "text-white lg:text-stone-600 lg:hover:bg-[#F9FAFB] lg:hover:text-[#113F48] hover:bg-white/10 hover:text-white hover:translate-x-[3px]"
                }`}
              >
                <HelpCircle className={`h-4 w-4 transition-transform duration-200 ease-out ${activeTab === "faqs" ? "scale-110" : "group-hover:scale-[1.12]"}`} />
                FAQs
              </button>

              <button
                onClick={() => handleTabChange("settings")}
                className={`group w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ease-out ${
                  activeTab === "settings"
                    ? "bg-[#C9A15A] text-white shadow-sm"
                    : "text-white lg:text-stone-600 lg:hover:bg-[#F9FAFB] lg:hover:text-[#113F48] hover:bg-white/10 hover:text-white hover:translate-x-[3px]"
                }`}
              >
                <Settings className={`h-4 w-4 transition-transform duration-200 ease-out ${activeTab === "settings" ? "scale-110" : "group-hover:scale-[1.12]"}`} />
                Settings
              </button>

              <div className="pt-4 mt-4 border-t border-white/10 lg:border-stone-100">
                <Link
                  href="/"
                  className="group w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ease-out text-white lg:text-stone-600 lg:hover:bg-[#F9FAFB] lg:hover:text-[#113F48] hover:bg-white/10 hover:text-white hover:translate-x-[3px]"
                >
                  <Globe className="h-4 w-4 transition-transform duration-200 ease-out group-hover:scale-[1.12]" />
                  Go to Website
                </Link>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-9">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="bg-white border border-[#C9A15A]/20 p-6 rounded-2xl shadow-sm">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A15A]">Dashboard</span>
                  <h2 className="text-2xl font-semibold text-[#113F48]">Overview of your site activity</h2>
                  <p className="text-sm text-stone-500">Monitor users, blog publishing, inquiries, and subscriber growth from one place.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="bg-gradient-to-br from-[#113F48] via-[#1B5A64] to-[#C9A15A] text-white p-5 rounded-2xl shadow-sm transition-all duration-200 ease-out hover:-translate-y-[2px]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white/90">Total users</span>
                    <Users className="h-5 w-5 text-[#FDF6EC]" />
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-white">{stats.users}</p>
                </div>
                <div className="bg-gradient-to-br from-[#C9A15A] via-[#D8B36A] to-[#F8E7C2] text-[#113F48] p-5 rounded-2xl shadow-sm transition-all duration-200 ease-out hover:-translate-y-[2px]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#113F48]/90">Blog posts</span>
                    <FileText className="h-5 w-5 text-[#113F48]" />
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-[#113F48]">{stats.posts}</p>
                </div>
                <div className="bg-gradient-to-br from-[#0F6E56] via-[#1D8D70] to-[#8FE0C2] text-white p-5 rounded-2xl shadow-sm transition-all duration-200 ease-out hover:-translate-y-[2px]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white/90">New messages</span>
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-white">{stats.messages}</p>
                </div>
                <div className="bg-gradient-to-br from-[#1F3A4A] via-[#234C61] to-[#4C7A94] text-white p-5 rounded-2xl shadow-sm transition-all duration-200 ease-out hover:-translate-y-[2px]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white/90">Subscribers</span>
                    <Mail className="h-5 w-5 text-[#FDF6EC]" />
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-white">{stats.subs}</p>
                </div>
                <div className="bg-gradient-to-br from-[#B58F4E] via-[#C9A15A] to-[#D8B36A] text-white p-5 rounded-2xl shadow-sm transition-all duration-200 ease-out hover:-translate-y-[2px]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white/90">FAQs</span>
                    <HelpCircle className="h-5 w-5 text-white" />
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-white">{stats.faqs}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="bg-white border border-[#C9A15A]/20 p-6 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#113F48]">Recent messages</h3>
                    <button onClick={() => handleTabChange("messages")} className="text-sm font-semibold text-[#C9A15A]">View all</button>
                  </div>
                  <div className="space-y-3">
                    {recentMessages.map((msg) => (
                      <button key={msg.id} onClick={() => handleTabChange("messages")} className="w-full text-left border border-stone-100 rounded-xl p-3 hover:border-[#C9A15A]/30 hover:bg-[#FDF6EC]/40 transition-colors">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="font-semibold text-[#113F48]">{msg.subject}</p>
                            <p className="text-sm text-stone-500">{msg.name}</p>
                          </div>
                          <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${msg.replied ? "bg-[#E1F5EE] text-[#0F6E56]" : "bg-[#FAEEDA] text-[#854F0B]"}`}>
                            {msg.replied ? "Replied" : "New"}
                          </span>
                        </div>
                      </button>
                    ))}
                    {recentMessages.length === 0 && <p className="text-sm text-stone-400">No recent messages yet.</p>}
                  </div>
                </div>

                <div className="bg-white border border-[#C9A15A]/20 p-6 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#113F48]">Latest blog posts</h3>
                    <button onClick={() => handleTabChange("posts")} className="text-sm font-semibold text-[#C9A15A]">Manage</button>
                  </div>
                  <div className="space-y-3">
                    {recentPosts.map((post) => (
                      <button key={post.id} onClick={() => handleEditPostClick(post)} className="w-full text-left border border-stone-100 rounded-xl p-3 hover:border-[#C9A15A]/30 hover:bg-[#FDF6EC]/40 transition-colors">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="font-semibold text-[#113F48]">{post.title}</p>
                            <p className="text-sm text-stone-500">{post.author}</p>
                          </div>
                          <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold bg-[#E1F5EE] text-[#0F6E56]">Published</span>
                        </div>
                      </button>
                    ))}
                    {recentPosts.length === 0 && <p className="text-sm text-stone-400">No posts published yet.</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: Manage Posts */}
          {activeTab === "posts" && (
            <div className="space-y-6">
              {/* Form Section */}
              {(isAddingPost || editingPost) ? (
                <div className="bg-white border border-[#C9A15A]/25 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
                  <div className="flex justify-between items-center border-b border-stone-100 pb-4">
                    <h3 className="text-lg font-bold text-[#113F48]">
                      {editingPost ? "Edit Blog Post" : "Create Blog Post"}
                    </h3>
                    <button
                      onClick={() => { setIsAddingPost(false); setEditingPost(null); }}
                      className="text-stone-400 hover:text-[#113F48] text-sm font-semibold"
                    >
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleSavePost} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#113F48]">Guide Title</label>
                        <input
                          type="text"
                          required
                          value={postTitle}
                          onChange={(e) => {
                            setPostTitle(e.target.value);
                            if (!editingPost) {
                              setPostSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
                            }
                          }}
                          className="w-full bg-[#FDF6EC]/20 border border-[#C9A15A]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#113F48]">URL Slug</label>
                        <input
                          type="text"
                          required
                          value={postSlug}
                          onChange={(e) => setPostSlug(e.target.value)}
                          className="w-full bg-[#FDF6EC]/20 border border-[#C9A15A]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#113F48]">Category</label>
                        <select
                          value={postCategory}
                          onChange={(e) => setPostCategory(e.target.value)}
                          className="w-full bg-[#FDF6EC]/20 border border-[#C9A15A]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48]"
                        >
                          <option value="Overview">Overview</option>
                          <option value="Part A">Part A</option>
                          <option value="Part B">Part B</option>
                          <option value="Part C">Part C</option>
                          <option value="Part D">Part D</option>
                          <option value="Comparison">Comparison</option>
                          <option value="Enrollment">Enrollment</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#113F48]">Author Name</label>
                        <input
                          type="text"
                          required
                          value={postAuthor}
                          onChange={(e) => setPostAuthor(e.target.value)}
                          className="w-full bg-[#FDF6EC]/20 border border-[#C9A15A]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#113F48]">Read Time Estimate</label>
                        <input
                          type="text"
                          required
                          value={postReadTime}
                          onChange={(e) => setPostReadTime(e.target.value)}
                          placeholder="8 min read"
                          className="w-full bg-[#FDF6EC]/20 border border-[#C9A15A]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#113F48]">Summary / Meta Description</label>
                      <input
                        type="text"
                        required
                        value={postSummary}
                        onChange={(e) => setPostSummary(e.target.value)}
                        placeholder="Snippet appearing on cards and Google results..."
                        className="w-full bg-[#FDF6EC]/20 border border-[#C9A15A]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48]"
                      />
                    </div>

                    {/* Image Upload Input */}
                    <div className="space-y-2 border border-dashed border-stone-200 p-4 rounded-xl flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-16 w-20 bg-stone-100 rounded-lg overflow-hidden border border-stone-200 flex items-center justify-center text-[10px] text-stone-400">
                          {postImage ? (
                            <img src={postImage} alt="Post preview" className="h-full w-full object-cover" />
                          ) : (
                            <span>No image</span>
                          )}
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-[#113F48]">Featured Image</h5>
                          <p className="text-[10px] text-stone-400">Optional image for the blog post</p>
                        </div>
                      </div>
                      <label className="cursor-pointer border border-[#C9A15A]/30 bg-[#FDF6EC]/30 text-stone-600 hover:text-[#C9A15A] text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1">
                        <Upload className="h-3.5 w-3.5" />
                        Upload
                        <input type="file" accept="image/*" className="hidden" onChange={handlePostImageUpload} disabled={imageUploading} />
                      </label>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#113F48]">Long-Form Article Content (HTML structure allowed)</label>
                      <textarea
                        required
                        rows={12}
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="<h2>Heading</h2><p>Article paragraphs...</p>"
                        className="w-full bg-[#FDF6EC]/20 border border-[#C9A15A]/20 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={imageUploading}
                      className="w-full bg-[#113F48] hover:bg-[#C9A15A] text-white py-3.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-[#113F48]/10"
                    >
                      Publish Blog Post
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-white border border-[#C9A15A]/20 p-6 rounded-2xl shadow-sm space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-[#113F48]">Blog Posts</h3>
                    <button
                      onClick={() => handleAddPostClick(false)}
                      className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Create Blog
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#C9A15A]/15 text-stone-500 text-xs font-bold uppercase tracking-wider bg-[#FDF6EC]/40">
                          <th className="p-3">Title</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Author</th>
                          <th className="p-3">Date</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-sm">
                        {posts.length === 0 && (
                          <tr>
                            <td colSpan={5} className="p-6 text-center text-sm text-stone-400">
                              No blog posts yet. Create one to publish it on the website.
                            </td>
                          </tr>
                        )}
                        {posts.map((post) => (
                          <tr key={post.id} className="hover:bg-stone-50/50 transition-colors">
                            <td className="p-3 font-semibold text-[#113F48]">{post.title}</td>
                            <td className="p-3"><span className="bg-[#FDF6EC] px-2 py-0.5 rounded border border-[#C9A15A]/20 text-xs font-medium">{post.category}</span></td>
                            <td className="p-3 text-stone-600">{post.author}</td>
                            <td className="p-3 text-stone-500 text-xs">{post.publishedAt}</td>
                            <td className="p-3 text-right space-x-2">
                              <button
                                onClick={() => handleEditPostClick(post)}
                                className="p-2 border border-stone-200 text-stone-500 hover:text-[#C9A15A] rounded-lg transition-colors"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                className="p-2 border border-stone-200 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Manage Users */}
          {activeTab === "users" && (
            <div className="bg-white border border-[#C9A15A]/20 p-6 rounded-2xl shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-[#113F48]">Registered User Base</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#C9A15A]/15 text-stone-500 text-xs font-bold uppercase tracking-wider bg-[#FDF6EC]/40">
                      <th className="p-3">Display Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-sm">
                    {usersList.map((target) => (
                      <tr key={target.uid} className="hover:bg-stone-50/50 transition-colors">
                        <td className="p-3 font-semibold text-[#113F48]">{target.displayName || "Beneficiary"}</td>
                        <td className="p-3 text-stone-600">{target.email}</td>
                        <td className="p-3 font-semibold uppercase tracking-wider text-xs">
                          <button
                            onClick={() => handleToggleRole(target)}
                            className={`px-2 py-0.5 rounded border transition-all ${
                              target.role === "admin"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-[#FDF6EC] text-[#113F48] border-[#C9A15A]/20"
                            }`}
                          >
                            {target.role}
                          </button>
                        </td>
                        <td className="p-3">
                          {target.banned ? (
                            <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                              <Ban className="h-3 w-3" />
                              Banned
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-[#E1F5EE] text-[#0F6E56] border border-[#0F6E56]/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                              <CheckCircle className="h-3 w-3" />
                              Active
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleToggleBan(target.uid, target.banned)}
                            disabled={target.uid === user.uid}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                              target.banned
                                ? "border-[#0F6E56]/20 text-[#0F6E56] hover:bg-[#E1F5EE]"
                                : "border-red-200 text-red-600 hover:bg-red-50"
                            } disabled:opacity-50`}
                          >
                            {target.banned ? "Unban" : "Ban"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Contact Messages */}
          {activeTab === "messages" && (
            <div className="bg-white border border-[#C9A15A]/20 p-6 rounded-2xl shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-[#113F48]">Visitor Inquiries</h3>
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className="border border-stone-100 p-5 rounded-xl space-y-4 bg-[#FDF6EC]/10">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <h4 className="font-bold text-[#113F48] text-base">{msg.subject}</h4>
                        <p className="text-xs text-stone-500 mt-0.5">
                          From: <span className="font-semibold text-stone-700">{msg.name}</span> ({msg.email})
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-stone-400 flex items-center gap-0.5">
                          <Clock className="h-3 w-3" />
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => handleDeleteMessage(msg.id || "")}
                          className="p-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete inquiry"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        {msg.replied ? (
                          <span className="bg-[#E1F5EE] text-[#0F6E56] border border-[#0F6E56]/20 text-[10px] px-2 py-0.5 rounded-full font-bold">Replied</span>
                        ) : (
                          <span className="bg-[#FAEEDA] text-[#854F0B] text-[10px] px-2 py-0.5 rounded-full font-bold">Pending</span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-stone-700 leading-relaxed bg-white border border-stone-100 p-3.5 rounded-lg">
                      {msg.message}
                    </p>

                    {msg.replied ? (
                      <div className="bg-stone-50 border border-stone-200/80 p-3 rounded-lg text-sm text-stone-600">
                        <strong className="text-stone-700 text-xs block mb-1">Reply:</strong>
                        {msg.replyText}
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Type answer here to simulate reply email..."
                          value={replyTextMap[msg.id || ""] || ""}
                          onChange={(e) => setReplyTextMap({ ...replyTextMap, [msg.id || ""]: e.target.value })}
                          className="flex-1 bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                        />
                        <button
                          onClick={() => handleReplySubmit(msg.id || "")}
                          className="bg-[#113F48] text-white hover:bg-[#C9A15A] text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                        >
                          Send Reply
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {messages.length === 0 && (
                  <p className="text-center py-10 text-stone-400 text-sm">No visitor inquiries logged yet.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white border border-[#C9A15A]/20 p-6 rounded-2xl shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#113F48]">Site settings</h3>
                <p className="text-sm text-stone-500">Update the homepage content that appears across the public site.</p>
              </div>

              <form onSubmit={handleSaveSiteSettings} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#113F48]">Hero title</label>
                  <input
                    value={siteSettings.heroTitle}
                    onChange={(e) => setSiteSettings({ ...siteSettings, heroTitle: e.target.value })}
                    className="w-full bg-[#FDF6EC]/20 border border-[#C9A15A]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#113F48]">Hero subtitle</label>
                  <input
                    value={siteSettings.heroSubtitle}
                    onChange={(e) => setSiteSettings({ ...siteSettings, heroSubtitle: e.target.value })}
                    className="w-full bg-[#FDF6EC]/20 border border-[#C9A15A]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#113F48]">About text</label>
                  <textarea
                    rows={4}
                    value={siteSettings.aboutText}
                    onChange={(e) => setSiteSettings({ ...siteSettings, aboutText: e.target.value })}
                    className="w-full bg-[#FDF6EC]/20 border border-[#C9A15A]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#113F48]">Service intro</label>
                  <textarea
                    rows={4}
                    value={siteSettings.serviceIntro}
                    onChange={(e) => setSiteSettings({ ...siteSettings, serviceIntro: e.target.value })}
                    className="w-full bg-[#FDF6EC]/20 border border-[#C9A15A]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48]"
                  />
                </div>
                <button type="submit" disabled={savingSettings} className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
                  {savingSettings ? "Saving..." : "Save site settings"}
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: Subscribers List */}
          {activeTab === "subscribers" && (
            <div className="bg-white border border-[#C9A15A]/20 p-6 rounded-2xl shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#113F48]">Newsletter Subscriber Database</h3>
                {subscribers.length > 0 && (
                  <button
                    onClick={handleExportCSV}
                    className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <Download className="h-4 w-4" />
                    Export CSV
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#C9A15A]/15 text-stone-500 text-xs font-bold uppercase tracking-wider bg-[#FDF6EC]/40">
                      <th className="p-3">Subscriber Email</th>
                      <th className="p-3">Date Subscribed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-sm">
                    {subscribers.map((sub) => (
                      <tr key={sub.id || sub.email} className="hover:bg-stone-50/50 transition-colors">
                        <td className="p-3 font-semibold text-[#113F48]">{sub.email}</td>
                        <td className="p-3 text-stone-500 text-xs">
                          {new Date(sub.subscribedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    {subscribers.length === 0 && (
                      <tr>
                        <td colSpan={2} className="p-3 text-center py-10 text-stone-400">
                          No subscribers registered yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: FAQs List */}
          {activeTab === "faqs" && (
            isAddingFAQ || editingFAQ ? (
              <div className="bg-white border border-[#C9A15A]/20 p-6 rounded-2xl shadow-sm space-y-6 animate-in slide-in-from-right-8 duration-300">
                <div className="flex justify-between items-center border-b border-stone-100 pb-4">
                  <h3 className="text-xl font-bold text-[#113F48]">
                    {editingFAQ ? "Edit FAQ" : "Add New FAQ"}
                  </h3>
                  <button
                    onClick={() => {
                      setIsAddingFAQ(false);
                      setEditingFAQ(null);
                    }}
                    className="text-stone-400 hover:text-stone-600 p-2 bg-stone-50 hover:bg-stone-100 rounded-xl transition-all"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveFAQ} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#113F48]">Category</label>
                    <select
                      value={faqCategory}
                      onChange={(e) => setFaqCategory(e.target.value)}
                      className="w-full bg-[#FDF6EC]/20 border border-[#C9A15A]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48]"
                    >
                      <option value="General">General</option>
                      <option value="Medicare Parts">Medicare Parts</option>
                      <option value="Enrollment">Enrollment</option>
                      <option value="Costs">Costs</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#113F48]">Question</label>
                    <input
                      type="text"
                      required
                      value={faqQuestion}
                      onChange={(e) => setFaqQuestion(e.target.value)}
                      placeholder="What is Medicare Part A?"
                      className="w-full bg-[#FDF6EC]/20 border border-[#C9A15A]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#113F48]">Answer</label>
                    <textarea
                      required
                      rows={6}
                      value={faqAnswer}
                      onChange={(e) => setFaqAnswer(e.target.value)}
                      placeholder="Medicare Part A covers inpatient hospital stays..."
                      className="w-full bg-[#FDF6EC]/20 border border-[#C9A15A]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#113F48] hover:bg-[#C9A15A] text-white py-3.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-[#113F48]/10"
                  >
                    {editingFAQ ? "Update FAQ" : "Save FAQ"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white border border-[#C9A15A]/20 p-6 rounded-2xl shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-[#113F48]">Frequently Asked Questions</h3>
                  <button
                    onClick={handleAddFAQClick}
                    className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add FAQ
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#C9A15A]/15 text-stone-500 text-xs font-bold uppercase tracking-wider bg-[#FDF6EC]/40">
                        <th className="p-3">Question</th>
                        <th className="p-3">Category</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-sm">
                      {faqs.length === 0 && (
                        <tr>
                          <td colSpan={3} className="p-6 text-center text-sm text-stone-400">
                            No FAQs yet. Add one to show it on the public FAQ page.
                          </td>
                        </tr>
                      )}
                      {faqs.map((faq) => (
                        <tr key={faq.id} className="hover:bg-stone-50/50 transition-colors">
                          <td className="p-3 font-semibold text-[#113F48]">{faq.question}</td>
                          <td className="p-3"><span className="bg-[#FDF6EC] px-2 py-0.5 rounded border border-[#C9A15A]/20 text-xs font-medium">{faq.category}</span></td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => handleEditFAQClick(faq)}
                              className="p-2 border border-stone-200 text-stone-500 hover:text-[#C9A15A] rounded-lg transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteFAQ(faq.id)}
                              className="p-2 border border-stone-200 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          )}

        </main>
      </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <main className="flex-grow">
        <Suspense fallback={
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin h-8 w-8 text-[#C9A15A]" />
          </div>
        }>
          <AdminContent />
        </Suspense>
      </main>
    </div>
  );
}
