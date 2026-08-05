"use client";

import React, { useEffect, useState, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/authContext";
import { getPosts, getUserProfile, getUserContactMessages, updateUserSavedPosts, deleteContactMessage, subscribeToUserNotifications, markNotificationAsRead, BlogPost, ContactMessage, Notification } from "@/lib/db";
import { uploadImage } from "@/lib/cloudinary";
import { BookOpen, User as UserIcon, Bookmark, CheckSquare, Settings, Upload, Check, Loader2, Sparkles, HeartPulse, LogOut, MessageSquareText, Clock3, Trash2, ArrowRight, CheckCircle2, X, Bell, Eye, EyeOff } from "lucide-react";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, logout, updateAvatar, updateProfile, deleteAccount, forgotPassword } = useAuth();

  const tabParam = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState(tabParam);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [savedPosts, setSavedPosts] = useState<BlogPost[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({});
  const [loadingData, setLoadingData] = useState(true);

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
    if (loading) return;

    if (!user) {
      router.push("/auth?redirect=" + encodeURIComponent("/dashboard"));
    } else {
      if (user.role === "admin") {
        router.push("/admin");
        return;
      }
      setDisplayName(user.displayName || "");
      setEmail(user.email || "");
      setAvatarPreview(user.avatarUrl || "");

      const savedCheck = localStorage.getItem(`checklist_${user.uid}`);
      if (savedCheck) {
        setChecklist(JSON.parse(savedCheck));
      }

      // Subscribe to real-time notifications
      const unsubscribe = subscribeToUserNotifications(user.uid, (newNotifs) => {
        setNotifications(newNotifs);
      });
      return () => unsubscribe();
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function loadDashboardData() {
      if (!user) return;
      setLoadingData(true);
      try {
        const [allPosts, profile, userMessages] = await Promise.all([
          getPosts(),
          getUserProfile(user.uid),
          getUserContactMessages(user.uid, user.email),
        ]);

        const savedSlugs = profile?.savedPosts ?? user.savedPosts ?? [];
        setSavedPosts(allPosts.filter((post) => savedSlugs.includes(post.slug)));
        setMessages(userMessages.slice(0, 6));
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoadingData(false);
      }
    }

    loadDashboardData();
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setActiveTab(tabParam);
    }, 0);
  }, [tabParam]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/dashboard?tab=${tab}`);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (password && password !== confirmPassword) {
      setProfileError("New passwords do not match.");
      return;
    }
    if (password && !currentPassword) {
      setProfileError("Please enter your current password to change it.");
      return;
    }

    setProfileError("");
    try {
      await updateProfile({
        displayName: displayName.trim(),
        email: email.trim(),
        password: password || undefined,
        currentPassword: currentPassword || undefined,
      });
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setProfileError(err instanceof Error ? err.message : "We could not update your profile right now.");
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      await updateAvatar(url);
      setAvatarPreview(url);
    } catch (err) {
      console.error("Avatar upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const removeSavedPost = async (slug: string) => {
    if (!user) return;
    try {
      await updateUserSavedPosts(user.uid, slug, "unsave");
      setSavedPosts((current) => current.filter((post) => post.slug !== slug));
    } catch (err) {
      console.error("Unable to remove saved guide:", err);
    }
  };

  const handleDeleteMessage = async (id?: string) => {
    if (!user || !id) return;
    const confirmed = window.confirm("Are you sure you want to delete this message? This action cannot be undone.");
    if (!confirmed) return;

    try {
      await deleteContactMessage(id);
      setMessages((current) => current.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  const toggleChecklist = (key: string) => {
    if (!user) return;
    const newChecklist = { ...checklist, [key]: !checklist[key] };
    setChecklist(newChecklist);
    localStorage.setItem(`checklist_${user.uid}`, JSON.stringify(newChecklist));
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    const confirmed = window.confirm("This will permanently remove your account from this dashboard. Continue?");
    if (!confirmed) return;

    try {
      await deleteAccount();
      router.push("/");
    } catch (err) {
      console.error(err);
      setProfileError(err instanceof Error ? err.message : "We could not delete your account right now.");
    }
  };

  const checklistItems = [
    { key: "c1", label: "Create or log into my Social Security account online at ssa.gov" },
    { key: "c2", label: "Check my annual statement to verify 40 quarters of Medicare-taxed employment" },
    { key: "c3", label: "Confirm my Initial Enrollment Period (IEP) window (3 months before to 3 months after 65th birthday)" },
    { key: "c4", label: "Decide whether to delay Part B if actively covered by a large group employer plan" },
    { key: "c5", label: "Compare Original Medicare + Medigap Plan G vs. private Medicare Advantage (Part C) networks" },
    { key: "c6", label: "Select a Medicare Part D plan based on my current prescription formulary" },
    { key: "c7", label: "Stop all HSA contributions at least 6 months before applying for Medicare Part A/B" },
  ];

  const completedChecklistCount = Object.values(checklist).filter(Boolean).length;

  if (loading || !user) {
    return (
      <div className="flex-grow flex items-center justify-center py-24">
        <Loader2 className="animate-spin h-8 w-8 text-[#C9A15A]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b border-stone-200 py-4 pl-4 sm:pl-6 pr-6 lg:pr-10 shadow-sm">
        <div className="w-full mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[#113F48] p-2 rounded border border-[#113F48] hidden sm:flex">
              <HeartPulse className="h-5 w-5 text-[#C9A15A]" />
            </div>
            <span className="font-heading font-bold text-lg tracking-tight text-[#113F48]">
              MediGuide<span className="text-[#C9A15A]">Hub</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4 relative">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-stone-600 hover:text-[#113F48] bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors border border-stone-200"
              aria-label="Open sidebar"
            >
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            
            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-stone-600 hover:text-[#113F48] bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors border border-stone-200 relative"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
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

            <div className="hidden sm:flex h-9 w-9 rounded-full bg-[#113F48] text-white items-center justify-center font-bold text-sm">
              {user.email?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex w-full">
        {/* Mobile Overlay */}
        <div className={`fixed inset-0 z-40 bg-black/30 lg:hidden ${isSidebarOpen ? "block" : "hidden"}`} onClick={() => setIsSidebarOpen(false)} />

        <aside className={`fixed inset-y-0 left-0 z-50 w-64 lg:w-72 bg-[#F9FAFB] lg:bg-transparent border-r border-stone-200 py-8 px-4 sm:px-6 flex flex-col gap-1.5 flex-shrink-0 min-h-screen lg:min-h-[calc(100vh-73px)] lg:static transform transition-transform duration-300 ease-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          {/* Close button for mobile */}
          <div className="flex items-center justify-between lg:hidden mb-6">
            <span className="font-heading font-bold text-lg text-[#113F48]">Menu</span>
            <button onClick={() => setIsSidebarOpen(false)} className="text-stone-500 hover:text-[#113F48]">
              <X className="h-5 w-5" />
            </button>
          </div>
          <button onClick={() => handleTabChange("overview")} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${activeTab === "overview" ? "bg-[#FAEEDA] text-[#854F0B]" : "text-stone-600 hover:bg-stone-50 hover:text-[#113F48]"}`}>
            <BookOpen className="h-4 w-4" />
            Dashboard
          </button>
          <button onClick={() => handleTabChange("saved")} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${activeTab === "saved" ? "bg-[#FAEEDA] text-[#854F0B]" : "text-stone-600 hover:bg-stone-50 hover:text-[#113F48]"}`}>
            <Bookmark className="h-4 w-4" />
            Saved Guides
          </button>
          <button onClick={() => handleTabChange("messages")} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${activeTab === "messages" ? "bg-[#FAEEDA] text-[#854F0B]" : "text-stone-600 hover:bg-stone-50 hover:text-[#113F48]"}`}>
            <div className="flex-1 flex items-center gap-3">
              <MessageSquareText className="h-4 w-4" />
              Messages
            </div>
            {messages.length > 0 && (
              <span className="bg-[#FAEEDA] text-[#854F0B] px-2 py-0.5 rounded-full text-[10px]">
                {messages.length}
              </span>
            )}
          </button>
          <button onClick={() => handleTabChange("profile")} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${activeTab === "profile" ? "bg-[#FAEEDA] text-[#854F0B]" : "text-stone-600 hover:bg-stone-50 hover:text-[#113F48]"}`}>
            <Settings className="h-4 w-4" />
            Profile
          </button>
        </aside>

        <main className="flex-1 p-6 lg:p-10 space-y-8 min-w-0">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm relative overflow-hidden group hover:-translate-y-0.5 hover:border-[#C9A15A] transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4">
                      <div className="p-1.5 bg-stone-50 rounded text-stone-400 group-hover:text-[#C9A15A] transition-colors"><Bookmark className="h-4 w-4" /></div>
                    </div>
                    <div className="text-sm font-semibold text-stone-600">Saved guides</div>
                    <div className="mt-2 text-3xl font-bold text-[#113F48]">{savedPosts.length}</div>
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#113F48] to-[#C9A15A] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm relative overflow-hidden group hover:-translate-y-0.5 hover:border-[#C9A15A] transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4">
                      <div className="p-1.5 bg-stone-50 rounded text-stone-400 group-hover:text-[#C9A15A] transition-colors"><MessageSquareText className="h-4 w-4" /></div>
                    </div>
                    <div className="text-sm font-semibold text-stone-600">Messages</div>
                    <div className="mt-2 text-3xl font-bold text-[#113F48]">{messages.length}</div>
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#113F48] to-[#C9A15A] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm relative overflow-hidden group hover:-translate-y-0.5 hover:border-[#C9A15A] transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4">
                      <div className="p-1.5 bg-stone-50 rounded text-stone-400 group-hover:text-[#C9A15A] transition-colors"><CheckCircle2 className="h-4 w-4" /></div>
                    </div>
                    <div className="text-sm font-semibold text-stone-600">Checklist</div>
                    <div className="mt-2 text-3xl font-bold text-[#113F48]">{completedChecklistCount}/7</div>
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#113F48] to-[#C9A15A] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <div className="bg-white border border-[#C9A15A]/20 p-6 rounded-2xl shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-[#113F48] flex items-center gap-2"><Bookmark className="h-5 w-5 text-[#C9A15A]" />Saved guides</h3>
                      <button onClick={() => handleTabChange("saved")} className="text-sm font-semibold text-[#C9A15A]">View all</button>
                    </div>
                    {savedPosts.length > 0 ? (
                      <div className="space-y-3">
                        {savedPosts.slice(0, 3).map((post) => (
                          <div key={post.slug} className="flex items-center justify-between rounded-xl border border-stone-200 p-3">
                            <div>
                              <div className="font-semibold text-[#113F48]">{post.title}</div>
                              <div className="text-xs text-stone-500">{post.category}</div>
                            </div>
                            <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-[#C9A15A]">
                              Open <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-stone-200 p-6 text-center text-sm text-stone-500">No saved guides yet. Visit the blog to bookmark helpful resources.</div>
                    )}
                  </div>

                  <div className="bg-white border border-[#C9A15A]/20 p-6 rounded-2xl shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-[#113F48] flex items-center gap-2"><MessageSquareText className="h-5 w-5 text-[#C9A15A]" />Your latest support messages</h3>
                      <button onClick={() => handleTabChange("messages")} className="text-sm font-semibold text-[#C9A15A]">View all</button>
                    </div>
                    {messages.length > 0 ? (
                      <div className="space-y-3">
                        {messages.map((message) => (
                          <div key={message.id} className="rounded-xl border border-stone-200 p-3">
                            <div className="flex items-center justify-between gap-3">
                              <div className="font-semibold text-[#113F48]">{message.subject}</div>
                              <div className="flex items-center gap-2">
                                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${message.replied ? "bg-[#E1F5EE] text-[#0F6E56]" : "bg-amber-50 text-amber-700"}`}>
                                  {message.replied ? "Replied" : "Awaiting reply"}
                                </span>
                                <button
                                  onClick={() => handleDeleteMessage(message.id)}
                                  className="text-stone-400 hover:text-red-600 transition-colors p-1 hover:bg-stone-50 rounded"
                                  title="Delete Message"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                            <p className="mt-2 text-sm text-stone-600 line-clamp-2">{message.message}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-stone-200 p-6 text-center text-sm text-stone-500">You have not sent any messages yet. Use the contact page if you need support.</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "saved" && (
              <div className="bg-white border border-[#C9A15A]/20 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-bold text-[#113F48] flex items-center gap-2"><Bookmark className="h-5 w-5 text-[#C9A15A]" />Saved guides</h2>
                  <div className="text-sm text-stone-500">{savedPosts.length} saved</div>
                </div>

                {loadingData ? (
                  <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-[#C9A15A]" /></div>
                ) : savedPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedPosts.map((post) => (
                      <div key={post.slug} className="border border-stone-100 rounded-xl overflow-hidden bg-white flex flex-col">
                        <img src={post.featuredImage} alt={post.title} className="h-36 w-full object-cover border-b border-stone-100" />
                        <div className="p-4 flex-grow flex flex-col justify-between gap-3">
                          <div>
                            <div className="text-xs uppercase tracking-wider font-semibold text-[#C9A15A]">{post.category}</div>
                            <h3 className="mt-2 font-bold text-[#113F48] leading-snug">{post.title}</h3>
                          </div>
                          <div className="flex items-center justify-between gap-3 mt-auto pt-2">
                            <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-[#113F48] hover:text-[#C9A15A]">Read guide</Link>
                            <button onClick={() => removeSavedPost(post.slug)} className="inline-flex items-center gap-1 rounded-lg border border-stone-200 px-3 py-2 text-xs font-semibold text-stone-600 hover:border-red-300 hover:text-red-600">
                              <Trash2 className="h-3.5 w-3.5" />Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-stone-200 p-10 text-center text-sm text-stone-500">You have not saved any guides yet.</div>
                )}
              </div>
            )}

            {activeTab === "messages" && (
              <div className="bg-white border border-[#C9A15A]/20 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-bold text-[#113F48] flex items-center gap-2"><MessageSquareText className="h-5 w-5 text-[#C9A15A]" />Your messages</h2>
                  <div className="text-sm text-stone-500">{messages.length} sent</div>
                </div>

                {messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="rounded-2xl border border-stone-200 p-5 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <div className="font-semibold text-[#113F48]">{message.subject}</div>
                            <div className="mt-1 flex items-center gap-2 text-xs text-stone-500"><Clock3 className="h-3.5 w-3.5" />{new Date(message.createdAt).toLocaleString()}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${message.replied ? "bg-[#E1F5EE] text-[#0F6E56]" : "bg-amber-50 text-amber-700"}`}>
                              {message.replied ? "Replied" : "Awaiting reply"}
                            </span>
                            <button
                              onClick={() => handleDeleteMessage(message.id)}
                              className="text-stone-400 hover:text-red-600 transition-colors p-1.5 hover:bg-stone-50 rounded-lg"
                              title="Delete Message"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-stone-600">{message.message}</p>
                        {message.replyText ? (
                          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                            <div className="font-semibold">Support reply</div>
                            <p className="mt-1">{message.replyText}</p>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-stone-200 p-10 text-center text-sm text-stone-500">You have not sent any messages yet.</div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-white border border-[#C9A15A]/20 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-[#113F48] flex items-center gap-2"><Settings className="h-5 w-5 text-[#C9A15A]" />Profile settings</h2>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-full md:w-1/3 flex flex-col items-center gap-4 text-center border-b md:border-b-0 md:border-r border-stone-100 pb-6 md:pb-0 md:pr-8">
                    <div className="relative h-24 w-24 rounded-2xl border-2 border-[#C9A15A]/30 overflow-hidden flex items-center justify-center bg-[#FDF6EC]">
                      {avatarPreview ? <img src={avatarPreview} alt="Preview" className="h-full w-full object-cover" /> : <UserIcon className="h-12 w-12 text-[#C9A15A]" />}
                      {uploading && <div className="absolute inset-0 bg-white/70 flex items-center justify-center"><Loader2 className="animate-spin h-6 w-6 text-[#C9A15A]" /></div>}
                    </div>
                    <label className="cursor-pointer px-4 py-2 border border-[#C9A15A]/30 hover:border-[#C9A15A] bg-[#FDF6EC]/40 text-[#113F48] hover:text-[#C9A15A] text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 select-none">
                      <Upload className="h-3.5 w-3.5" />Upload Photo
                      <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} disabled={uploading} />
                    </label>
                    <p className="text-[10px] text-stone-400">Cloudinary API enabled. Supports PNG and JPG files.</p>
                  </div>

                  <form onSubmit={handleUpdateProfile} className="w-full md:w-2/3 space-y-5">
                    {profileSuccess && <div className="bg-[#E1F5EE] border border-[#0F6E56]/20 text-[#0F6E56] p-4 rounded-xl text-xs font-semibold flex items-center gap-2"><Check className="h-4 w-4" />Profile saved successfully.</div>}
                    {profileError && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs font-semibold">{profileError}</div>}

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#113F48]">Display name</label>
                      <input type="text" required value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full bg-[#FDF6EC]/25 border border-[#C9A15A]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48]" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#113F48]">Email address</label>
                      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#FDF6EC]/25 border border-[#C9A15A]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48]" />
                    </div>

                    <div className="pt-4 border-t border-stone-100">
                      <h3 className="text-sm font-bold text-[#113F48] mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <div className="flex justify-between">
                            <label className="text-xs font-semibold text-[#113F48]">Current password</label>
                            <button type="button" onClick={() => {
                              forgotPassword(email).then(() => {
                                setProfileSuccess(true);
                                setTimeout(() => setProfileSuccess(false), 3000);
                              }).catch(err => setProfileError(err instanceof Error ? err.message : "Error sending reset email"));
                            }} className="text-[10px] text-[#C9A15A] hover:underline font-semibold">Forgot password?</button>
                          </div>
                          <div className="relative">
                            <input type={showCurrentPassword ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter current password" className="w-full bg-[#FDF6EC]/25 border border-[#C9A15A]/20 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48]" />
                            <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-4 top-3.5 text-stone-400 hover:text-[#113F48]">
                              {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#113F48]">New password</label>
                          <div className="relative">
                            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" className="w-full bg-[#FDF6EC]/25 border border-[#C9A15A]/20 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48]" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-stone-400 hover:text-[#113F48]">
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#113F48]">Confirm new password</label>
                          <div className="relative">
                            <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="w-full bg-[#FDF6EC]/25 border border-[#C9A15A]/20 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48]" />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-3.5 text-stone-400 hover:text-[#113F48]">
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-stone-100 pt-6">
                      <button type="submit" className="px-6 py-3 bg-[#113F48] hover:bg-[#C9A15A] text-white font-semibold rounded-xl text-sm transition-all shadow-sm shadow-[#113F48]/10">Save Changes</button>
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => logout().then(() => router.push("/"))} className="flex items-center gap-1.5 px-4 py-2.5 border border-stone-200 hover:border-red-300 text-stone-600 hover:text-red-600 rounded-xl transition-all text-xs font-semibold uppercase tracking-wider">
                          <LogOut className="h-3.5 w-3.5" />Log out
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </main>
      </div>
    </div>
  );
}

export default function UserDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <main className="flex-grow">
        <Suspense fallback={<div className="flex justify-center items-center py-20"><Loader2 className="animate-spin h-8 w-8 text-[#C9A15A]" /></div>}>
          <DashboardContent />
        </Suspense>
      </main>
    </div>
  );
}
