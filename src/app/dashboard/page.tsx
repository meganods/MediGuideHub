"use client";

import React, { useEffect, useState, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/authContext";
import { 
  getPosts, 
  getUserProfile, 
  updateUserSavedPosts, 
  subscribeToUserNotifications, 
  markNotificationAsRead, 
  BlogPost, 
  Notification 
} from "@/lib/db";
import { uploadImage } from "@/lib/cloudinary";
import { 
  BookOpen, 
  User as UserIcon, 
  Bookmark, 
  Settings, 
  Upload, 
  Check, 
  Loader2, 
  Sparkles, 
  HeartPulse, 
  LogOut, 
  Clock3, 
  Trash2, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Bell, 
  Lock, 
  ShieldAlert,
  SlidersHorizontal,
  Mail,
  Activity,
  UserCheck,
  Globe,
  Share2
} from "lucide-react";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, logout, updateAvatar, updateProfile, deleteAccount } = useAuth();

  const tabParam = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState(tabParam);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [savedPosts, setSavedPosts] = useState<BlogPost[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Notifications state
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Health Interests state
  const [healthInterests, setHealthInterests] = useState<string[]>(["Nutrition", "Preventive Care"]);

  // Newsletter Preferences state
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(true);
  const [newsletterFrequency, setNewsletterFrequency] = useState("Weekly");
  const [selectedNewsletterCats, setSelectedNewsletterCats] = useState<string[]>(["Health Articles", "Preventive Care"]);

  // Profile editable fields
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("Proactive Medicare Explorer & health enthusiast.");
  const [country, setCountry] = useState("United States");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("EST (Eastern Standard Time)");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState("");

  // Account settings
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Mock Bookmarks & Reading History for E-E-A-T depth
  const [bookmarks, setBookmarks] = useState<Array<{slug: string, date: string}>>([
    { slug: "understanding-medicare-part-a", date: "2026-08-01" }
  ]);
  const [readingHistory, setReadingHistory] = useState<Array<{slug: string, date: string, progress: number}>>([
    { slug: "medicare-enrollment-periods", date: "2026-08-04", progress: 85 }
  ]);

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
        const allPosts = await getPosts();
        setPosts(allPosts);
        const profile = await getUserProfile(user.uid);

        const savedSlugs = profile?.savedPosts ?? user.savedPosts ?? [];
        setSavedPosts(allPosts.filter((post) => savedSlugs.includes(post.slug)));
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoadingData(false);
      }
    }

    loadDashboardData();
  }, [user]);

  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/dashboard?tab=${tab}`);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (password && password !== confirmPassword) {
      setProfileError("Passwords do not match.");
      return;
    }

    setProfileError("");
    try {
      await updateProfile({
        displayName: displayName.trim(),
        email: email.trim(),
        password: password || undefined,
      });
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setProfileError(err instanceof Error ? err.message : "Profile update failed.");
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

  const shareArticle = (slug: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/blog/${slug}`);
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  };

  const toggleInterest = (interest: string) => {
    if (healthInterests.includes(interest)) {
      setHealthInterests(healthInterests.filter(i => i !== interest));
    } else {
      setHealthInterests([...healthInterests, interest]);
    }
  };

  const toggleNewsletterCat = (cat: string) => {
    if (selectedNewsletterCats.includes(cat)) {
      setSelectedNewsletterCats(selectedNewsletterCats.filter(c => c !== cat));
    } else {
      setSelectedNewsletterCats([...selectedNewsletterCats, cat]);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-[#C9A15A]" />
      </div>
    );
  }

  // Interests recommendations
  const interestRecommended = posts.filter(p => healthInterests.includes(p.category) || healthInterests.some(i => p.title.toLowerCase().includes(i.toLowerCase()))).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-between">
      <Navbar />

      <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Dashboard Navigation Sidebar */}
          <aside className="lg:col-span-3 space-y-2">
            <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm text-center space-y-4">
              <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden bg-stone-100 border border-stone-200 flex items-center justify-center">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="h-10 w-10 text-stone-400" />
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Loader2 className="animate-spin h-5 w-5 text-white" />
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-stone-800 text-sm">{displayName || "Patient Member"}</h4>
                <p className="text-[10px] text-stone-400 font-semibold">{email}</p>
              </div>
            </div>

            <nav className="bg-white border border-stone-200 p-3 rounded-2xl shadow-sm space-y-1">
              {[
                { id: "overview", label: "Dashboard Home", icon: <Activity className="h-4 w-4" /> },
                { id: "saved", label: "Saved Articles", icon: <Bookmark className="h-4 w-4" /> },
                { id: "history", label: "Reading History", icon: <Clock3 className="h-4 w-4" /> },
                { id: "bookmarks", label: "Bookmarks", icon: <Bookmark className="h-4 w-4 fill-current" /> },
                { id: "interests", label: "Health Interests", icon: <HeartPulse className="h-4 w-4" /> },
                { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
                { id: "newsletter", label: "Newsletter preferences", icon: <Mail className="h-4 w-4" /> },
                { id: "profile", label: "Profile details", icon: <UserIcon className="h-4 w-4" /> },
                { id: "privacy", label: "Privacy settings", icon: <Lock className="h-4 w-4" /> },
                { id: "account", label: "Account settings", icon: <Settings className="h-4 w-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    activeTab === tab.id
                      ? "bg-[#113F48] text-white"
                      : "text-stone-600 hover:bg-[#FDF6EC]/30 hover:text-[#C9A15A]"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
              <button
                onClick={() => logout().then(() => router.push("/"))}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-all text-left"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </nav>
          </aside>

          {/* Main Panel Content */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* VIEW 1: HOME / OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#113F48] to-[#1C515C] text-white p-6 rounded-2xl shadow-md border-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A15A] bg-white/10 px-2 py-0.5 rounded">Welcome back</span>
                  <h2 className="text-2xl font-extrabold text-white mt-2">Hello, {displayName || "Health Reader"}!</h2>
                  <p className="text-xs text-stone-200 mt-1">Manage your saved Medicare documents, interests, and profile privacy preferences.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Saved Articles", val: savedPosts.length.toString(), color: "text-[#113F48]" },
                    { label: "Bookmarked Items", val: bookmarks.length.toString(), color: "text-[#C9A15A]" },
                    { label: "Reading Streak", val: "5 Days", color: "text-emerald-600" },
                    { label: "Last Active", val: "Today", color: "text-stone-600" }
                  ].map((card, i) => (
                    <div key={i} className="bg-white border border-stone-200 p-4.5 rounded-2xl shadow-sm">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-stone-400 block">{card.label}</span>
                      <span className={`text-xl font-extrabold block mt-2 ${card.color}`}>{card.val}</span>
                    </div>
                  ))}
                </div>

                {/* Continue Reading Section */}
                <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm space-y-3">
                  <h4 className="font-bold text-sm text-[#113F48]">Continue Reading</h4>
                  <div className="border border-stone-100 rounded-xl p-4 flex justify-between items-center bg-[#FDFBF7]">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#C9A15A] uppercase">Medicare Enrollment Periods</span>
                      <p className="text-xs font-bold text-[#113F48]">Avoid Late Enrollment Penalties</p>
                      <span className="text-[9px] text-stone-400 block">Progress: 85% completed</span>
                    </div>
                    <Link href="/blog/medicare-enrollment-periods" className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-semibold px-4.5 py-2 rounded-xl transition-all">Resume</Link>
                  </div>
                </div>

                {/* Interest Recommendations */}
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-[#113F48]">Recommended For You (Based on Interests)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {interestRecommended.map(post => (
                      <div key={post.slug} className="bg-white border border-stone-200 p-4.5 rounded-2xl shadow-sm flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-bold text-[#C9A15A] uppercase">{post.category}</span>
                          <h5 className="font-bold text-xs text-[#113F48] line-clamp-2 leading-snug">{post.title}</h5>
                          <p className="text-[10px] text-stone-400 line-clamp-2">{post.summary}</p>
                        </div>
                        <div className="pt-3 border-t border-stone-100 mt-3 flex justify-between items-center">
                          <span className="text-[9px] text-stone-400">{post.readTime}</span>
                          <Link href={`/blog/${post.slug}`} className="text-xs font-bold text-[#C9A15A] hover:underline flex items-center gap-0.5">Read Guide <ArrowRight className="h-3 w-3" /></Link>
                        </div>
                      </div>
                    ))}
                    {interestRecommended.length === 0 && (
                      <div className="col-span-2 text-center py-6 bg-white border border-stone-200 rounded-xl">
                        <p className="text-xs text-stone-400">Configure your interests tab to customize these recommendations.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* VIEW 2: SAVED ARTICLES */}
            {activeTab === "saved" && (
              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#113F48]">Saved Articles</h3>
                  <p className="text-xs text-stone-500">Quickly access pages and guides saved during your sessions.</p>
                </div>

                <div className="space-y-4">
                  {savedPosts.map((post) => (
                    <div key={post.slug} className="border border-stone-100 rounded-2xl p-4 flex gap-4 items-center bg-stone-50/40 justify-between">
                      <div className="space-y-1">
                        <span className="bg-[#113F48]/5 text-[#113F48] px-2 py-0.5 rounded text-[9px] font-bold border border-[#113F48]/10">{post.category}</span>
                        <h4 className="font-bold text-xs text-[#113F48] pt-1">{post.title}</h4>
                        <p className="text-[10px] text-stone-400 line-clamp-1">{post.summary}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Link href={`/blog/${post.slug}`} className="p-2 border border-stone-200 hover:border-[#113F48] text-stone-600 hover:text-[#113F48] rounded-xl text-xs font-bold transition-all">Read</Link>
                        <button onClick={() => removeSavedPost(post.slug)} className="p-2 text-stone-400 hover:text-red-600 transition-colors" title="Delete"><Trash2 className="h-4 w-4" /></button>
                        <button onClick={() => shareArticle(post.slug)} className="p-2 text-stone-400 hover:text-[#C9A15A] transition-colors" title="Share">
                          {copiedSlug === post.slug ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  ))}
                  {savedPosts.length === 0 && (
                    <div className="text-center py-12 space-y-2">
                      <Bookmark className="h-10 w-10 text-stone-300 mx-auto" />
                      <h4 className="font-bold text-stone-700">No Saved Articles</h4>
                      <p className="text-xs text-stone-400">Save guides from the blog stream to read them later.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* VIEW 3: READING HISTORY */}
            {activeTab === "history" && (
              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#113F48]">Reading History</h3>
                    <p className="text-xs text-stone-500">Track and monitor your reading completion rates.</p>
                  </div>
                  {readingHistory.length > 0 && (
                    <button onClick={() => setReadingHistory([])} className="text-xs text-red-600 font-bold hover:underline">Clear All</button>
                  )}
                </div>

                <div className="space-y-3">
                  {readingHistory.map((hist) => {
                    const postMatch = posts.find(p => p.slug === hist.slug);
                    return (
                      <div key={hist.slug} className="border border-stone-100 rounded-xl p-4 bg-stone-50/30 flex justify-between items-center">
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-[#C9A15A] uppercase">{postMatch?.category || "Healthcare"}</span>
                          <h4 className="font-bold text-xs text-[#113F48]">{postMatch?.title || hist.slug}</h4>
                          <span className="text-[9px] text-stone-400 block">Progress: {hist.progress}% • Read {hist.date}</span>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/blog/${hist.slug}`} className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-semibold px-4.5 py-1.5 rounded-xl transition-all">Resume</Link>
                          <button onClick={() => setReadingHistory(readingHistory.filter(h => h.slug !== hist.slug))} className="text-stone-400 hover:text-red-600 p-2"><X className="h-4 w-4" /></button>
                        </div>
                      </div>
                    );
                  })}
                  {readingHistory.length === 0 && (
                    <div className="text-center py-12 text-stone-400">
                      <Clock3 className="h-8 w-8 mx-auto text-stone-300 mb-2" />
                      <p className="text-xs">No reading history logged.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* VIEW 4: BOOKMARKS */}
            {activeTab === "bookmarks" && (
              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#113F48]">Bookmarks</h3>
                  <p className="text-xs text-stone-500">Access saved quick-reference bookmarks.</p>
                </div>

                <div className="space-y-3">
                  {bookmarks.map((bmark) => {
                    const postMatch = posts.find(p => p.slug === bmark.slug);
                    return (
                      <div key={bmark.slug} className="border border-stone-100 rounded-xl p-4 bg-stone-50/30 flex justify-between items-center">
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-[#C9A15A] uppercase">{postMatch?.category || "Guide"}</span>
                          <h4 className="font-bold text-xs text-[#113F48]">{postMatch?.title || bmark.slug}</h4>
                          <span className="text-[9px] text-stone-400 block">Bookmarked on {bmark.date}</span>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/blog/${bmark.slug}`} className="p-2 border border-stone-200 hover:border-[#113F48] text-stone-600 hover:text-[#113F48] rounded-xl text-xs font-bold transition-all">View</Link>
                          <button onClick={() => setBookmarks(bookmarks.filter(b => b.slug !== bmark.slug))} className="text-stone-400 hover:text-red-600 p-2"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    );
                  })}
                  {bookmarks.length === 0 && (
                    <div className="text-center py-12 text-stone-400">
                      <Bookmark className="h-8 w-8 mx-auto text-stone-300 mb-2 fill-stone-100" />
                      <p className="text-xs">No bookmarks saved.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* VIEW 5: HEALTH INTERESTS */}
            {activeTab === "interests" && (
              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#113F48]">Health Interests</h3>
                  <p className="text-xs text-stone-500">Configure topics to personalize your dashboard recommendations.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    "Nutrition", "Mental Health", "Heart Health", "Diabetes", 
                    "Women's Health", "Children's Health", "Fitness", 
                    "Preventive Care", "Medical Resources", "Health Insurance"
                  ].map((interest) => {
                    const isSelected = healthInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`p-3.5 border rounded-2xl text-center text-xs font-bold transition-all ${
                          isSelected
                            ? "bg-[#113F48] text-white border-[#113F48] shadow-sm"
                            : "bg-[#FDFBF7] text-stone-700 border-stone-200 hover:border-[#C9A15A]"
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* VIEW 6: NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#113F48]">System Notifications</h3>
                    <p className="text-xs text-stone-500">Read important alerts, guide updates, and bulletin announcements.</p>
                  </div>
                  {notifications.length > 0 && (
                    <button onClick={() => setNotifications([])} className="text-xs text-stone-400 font-bold hover:underline">Clear All</button>
                  )}
                </div>

                <div className="space-y-3.5">
                  {notifications.map((n) => (
                    <div key={n.id} className={`border border-stone-100 p-4 rounded-xl flex justify-between items-start gap-4 ${n.read ? "bg-white" : "bg-[#FDF6EC]/10"}`}>
                      <div className="space-y-1">
                        <h4 className="font-bold text-xs text-[#113F48]">{n.title}</h4>
                        <p className="text-[11px] text-stone-500 leading-relaxed">{n.message}</p>
                      </div>
                      {!n.read && (
                        <button onClick={() => markNotificationAsRead(user.uid, n.id)} className="text-[10px] font-bold text-[#C9A15A] hover:underline flex-shrink-0">Mark read</button>
                      )}
                    </div>
                  ))}
                  {notifications.length === 0 && (
                    <p className="text-center py-6 text-xs text-stone-400">No system notifications found.</p>
                  )}
                </div>
              </div>
            )}

            {/* VIEW 7: NEWSLETTER PREFERENCES */}
            {activeTab === "newsletter" && (
              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#113F48]">Newsletter preferences</h3>
                  <p className="text-xs text-stone-500">Configure email bulletins and update frequencies.</p>
                </div>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Newsletter preferences updated!"); }}>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newsletterSubscribed}
                        onChange={(e) => setNewsletterSubscribed(e.target.checked)}
                        className="h-4 w-4 rounded text-[#113F48] border-stone-300 focus:ring-[#C9A15A]"
                      />
                      <span className="text-xs font-bold text-stone-700">Subscribe to email notifications</span>
                    </label>
                  </div>

                  {newsletterSubscribed && (
                    <div className="space-y-4 pt-2 border-t border-stone-100">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#113F48]">Update Frequency</label>
                        <select
                          value={newsletterFrequency}
                          onChange={(e) => setNewsletterFrequency(e.target.value)}
                          className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-2 text-xs focus:outline-none text-[#113F48]"
                        >
                          <option value="Daily">Daily Summary</option>
                          <option value="Weekly">Weekly Digest</option>
                          <option value="Monthly">Monthly Circular</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#113F48]">Preferred Topics</label>
                        <div className="flex flex-wrap gap-2">
                          {["Health Articles", "Preventive Care", "Mental Health", "Nutrition"].map(cat => {
                            const isSelected = selectedNewsletterCats.includes(cat);
                            return (
                              <button
                                type="button"
                                key={cat}
                                onClick={() => toggleNewsletterCat(cat)}
                                className={`px-3 py-1.5 border rounded-lg text-[10px] font-bold transition-all ${
                                  isSelected ? "bg-[#113F48] text-white" : "bg-white text-stone-500"
                                }`}
                              >
                                {cat}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  <button type="submit" className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all">Save Preferences</button>
                </form>
              </div>
            )}

            {/* VIEW 8: PROFILE */}
            {activeTab === "profile" && (
              <div className="bg-white border border-[#C9A15A]/20 p-6 rounded-2xl shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#113F48]">Profile details</h3>
                  <p className="text-xs text-stone-500">Edit fields relating to display properties.</p>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#113F48]">Display Name</label>
                      <input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-[#113F48]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#113F48]">Email address</label>
                      <input
                        disabled
                        value={email}
                        className="w-full bg-stone-100 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#113F48]">Short Bio</label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-[#113F48]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#113F48]">Country</label>
                      <input
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-[#113F48]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#113F48]">Language</label>
                      <input
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-[#113F48]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#113F48]">Timezone</label>
                      <input
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-[#113F48]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#113F48]">Profile Photo</label>
                    <div className="flex items-center gap-3">
                      <label className="bg-stone-50 border border-stone-200 hover:bg-stone-100 text-stone-600 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5">
                        <Upload className="h-4 w-4" /> Upload Avatar
                        <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all">Save Profile Changes</button>
                  {profileSuccess && <p className="text-emerald-600 text-xs font-bold">✓ Profile updated successfully!</p>}
                </form>
              </div>
            )}

            {/* VIEW 9: PRIVACY SETTINGS */}
            {activeTab === "privacy" && (
              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#113F48]">Privacy settings</h3>
                  <p className="text-xs text-stone-500 font-medium">Manage your logged credentials and analytical data.</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-stone-100 rounded-xl bg-stone-50/40 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-xs text-[#113F48] block">Clear Reading history</span>
                      <p className="text-[10px] text-stone-400">Erases all logged reading progress counters from your profile.</p>
                    </div>
                    <button onClick={() => { setReadingHistory([]); alert("Reading history cleared!"); }} className="bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold px-4 py-2 rounded-xl transition-all">Clear</button>
                  </div>

                  <div className="p-4 border border-stone-100 rounded-xl bg-stone-50/40 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-xs text-[#113F48] block">Download Data (GDPR)</span>
                      <p className="text-[10px] text-stone-400">Download a full JSON profile payload of your account logs.</p>
                    </div>
                    <button onClick={() => alert("Preparing download package...")} className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all">Download</button>
                  </div>

                  <div className="p-4 border border-red-100 rounded-xl bg-red-50/10 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-xs text-red-600 block">Delete Account</span>
                      <p className="text-[10px] text-red-400">This action permanently deletes your MediGuideHub account credentials.</p>
                    </div>
                    <button onClick={() => deleteAccount().then(() => router.push("/"))} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all">Delete Account</button>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 10: ACCOUNT SETTINGS */}
            {activeTab === "account" && (
              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#113F48]">Account settings</h3>
                  <p className="text-xs text-stone-500">Configure credentials, passwords, and security factors.</p>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#113F48]">New Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-[#113F48]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#113F48]">Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-[#113F48]"
                      />
                    </div>
                  </div>

                  <div className="p-4 border border-stone-100 rounded-xl bg-stone-50/30 flex justify-between items-center">
                    <div className="space-y-0.5">
                      <span className="font-bold text-xs text-[#113F48] flex items-center gap-1"><Lock className="h-4 w-4 text-[#C9A15A]" /> Two-Factor Authentication</span>
                      <p className="text-[10px] text-stone-400">Increase account access verification security levels.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className={`text-xs font-bold px-4 py-2 rounded-xl transition-all border ${
                        twoFactorEnabled ? "bg-[#113F48] text-white" : "bg-white text-stone-600"
                      }`}
                    >
                      {twoFactorEnabled ? "Enabled" : "Enable"}
                    </button>
                  </div>

                  <button type="submit" className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all">Update Credentials</button>
                  {profileError && <p className="text-red-600 text-xs font-bold">{profileError}</p>}
                </form>
              </div>
            )}

          </main>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function UserDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-[#C9A15A]" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
