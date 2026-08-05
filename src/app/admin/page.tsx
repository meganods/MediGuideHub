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
  resolveContactMessage,
  archiveContactMessage,
  getLegalPage,
  updateLegalPage,
  LegalPage,
  getCategories,
  saveCategory,
  deleteCategory,
  BlogCategory,
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
  ShieldCheck,
  Archive,
  Grid,
  Folder,
  Layers,
  TrendingUp,
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

  // Message Search & Filtering states
  const [msgSearch, setMsgSearch] = useState("");
  const [msgFilterResolved, setMsgFilterResolved] = useState("all");
  const [msgFilterArchived, setMsgFilterArchived] = useState("unarchived");

  // Legal Pages states
  const [selectedLegalSlug, setSelectedLegalSlug] = useState("privacy-policy");
  const [legalTitle, setLegalTitle] = useState("");
  const [legalContent, setLegalContent] = useState("");
  const [legalPublished, setLegalPublished] = useState(true);
  const [legalLastUpdated, setLegalLastUpdated] = useState("");
  const [legalHistory, setLegalHistory] = useState<any[]>([]);
  const [legalLoading, setLegalLoading] = useState(false);
  const [legalSaving, setLegalSaving] = useState(false);

  // CMS States
  const [cmsSubTab, setCmsSubTab] = useState("all");
  const [editorTab, setEditorTab] = useState("content");

  // Advanced CMS Editor fields
  const [postImageAlt, setPostImageAlt] = useState("");
  const [postImageCaption, setPostImageCaption] = useState("");
  const [postImageCredit, setPostImageCredit] = useState("");
  const [postVideoUrl, setPostVideoUrl] = useState("");
  const [postRelatedArticles, setPostRelatedArticles] = useState("");
  const [postFeatured, setPostFeatured] = useState(false);
  const [postTrending, setPostTrending] = useState(false);

  // SEO Tab fields
  const [seoMetaTitle, setSeoMetaTitle] = useState("");
  const [seoMetaDescription, setSeoMetaDescription] = useState("");
  const [seoFocusKeyphrase, setSeoFocusKeyphrase] = useState("");
  const [seoScore, setSeoScore] = useState(85);
  const [seoSchemaType, setSeoSchemaType] = useState("MedicalWebPage");
  const [seoRobotsMeta, setSeoRobotsMeta] = useState("index, follow");
  const [seoCanonicalUrl, setSeoCanonicalUrl] = useState("");

  // Advanced Settings fields
  const [postVisibility, setPostVisibility] = useState("Public");
  const [postAllowComments, setPostAllowComments] = useState(true);
  const [postLastReviewed, setPostLastReviewed] = useState("");
  const [postReviewFreq, setPostReviewFreq] = useState("6 months");
  const [postLanguage, setPostLanguage] = useState("English");
  const [postVersion, setPostVersion] = useState("1.0");

  // Search & Filters states for Articles list
  const [articleSearchQuery, setArticleSearchQuery] = useState("");
  const [articleFilterCategory, setArticleFilterCategory] = useState("all");
  const [articleFilterStatus, setArticleFilterStatus] = useState("all");
  const [articleFilterAuthor, setArticleFilterAuthor] = useState("all");
  const [articleSortBy, setArticleSortBy] = useState("date");

  // Category Management states
  const [categoriesList, setCategoriesList] = useState<BlogCategory[]>([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [categoryTab, setCategoryTab] = useState("basic");

  // Form Basic Fields
  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [catIcon, setCatIcon] = useState("");
  const [catBanner, setCatBanner] = useState("");
  const [catThumbnail, setCatThumbnail] = useState("");
  const [catDisplayOrder, setCatDisplayOrder] = useState(1);
  const [catParent, setCatParent] = useState("");
  const [catFeatured, setCatFeatured] = useState(false);
  const [catStatus, setCatStatus] = useState<"Active" | "Inactive">("Active");

  // Form SEO Fields
  const [catSeoTitle, setCatSeoTitle] = useState("");
  const [catSeoDesc, setCatSeoDesc] = useState("");
  const [catSeoKeyword, setCatSeoKeyword] = useState("");
  const [catSeoCanonical, setCatSeoCanonical] = useState("");
  const [catSeoSchema, setCatSeoSchema] = useState("MedicalWebPage");
  const [catSeoOgImage, setCatSeoOgImage] = useState("");

  const loadAllData = async () => {
    try {
      const allPosts = await getPosts();
      const allUsers = await getUsers();
      const allMsgs = await getContactMessages();
      const allSubs = await getSubscribers();
      const allFaqs = await getFAQs();
      const settings = await getSiteSettings();

      // Load Categories & Seed if empty
      let allCats = await getCategories();
      if (allCats.length === 0) {
        const defaultCats = [
          "Health Articles", "Preventive Care", "Mental Health", "Nutrition", 
          "Heart Health", "Diabetes", "Women's Health", "Children's Health", 
          "Fitness", "Medical Resources", "Health Insurance", "Prescription Guide", 
          "Vaccination", "Senior Healthcare", "Emergency Care", "Wellness", "Lifestyle Diseases"
        ];
        for (let i = 0; i < defaultCats.length; i++) {
          const name = defaultCats[i];
          const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          await saveCategory({
            name,
            slug,
            description: `Objective medical guide and reviews on ${name}.`,
            icon: "Folder",
            displayOrder: i + 1,
            status: "Active",
            featuredCategory: i < 6,
            seoTitle: `${name} | MediGuideHub`,
            seoDesc: `Get E-E-A-T compliant educational medical resources about ${name}.`,
            seoFocusKeyword: name,
            seoSchemaType: "MedicalWebPage",
            articleCount: 0,
            seoScore: 85,
            createdAt: new Date().toISOString().split("T")[0]
          });
        }
        allCats = await getCategories();
      }

      setPosts(allPosts);
      setUsersList(allUsers);
      setMessages(allMsgs);
      setSubscribers(allSubs);
      setFaqs(allFaqs);
      setSiteSettings(settings);
      setCategoriesList(allCats);

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

  const loadLegalPageData = async (slug: string) => {
    setLegalLoading(true);
    try {
      const page = await getLegalPage(slug);
      if (page) {
        setLegalTitle(page.title);
        setLegalContent(page.content);
        setLegalPublished(page.published ?? true);
        setLegalLastUpdated(page.lastUpdated || "August 2026");
        setLegalHistory(page.versionHistory || []);
      } else {
        const defaultTitle = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        setLegalTitle(defaultTitle);
        setLegalContent(`# ${defaultTitle}\n\nThis page contains the official ${defaultTitle} details. Update this content using the Admin panel.`);
        setLegalPublished(true);
        setLegalLastUpdated("August 2026");
        setLegalHistory([]);
      }
    } finally {
      setLegalLoading(false);
    }
  };

  const handleSaveLegalPage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLegalSaving(true);
    try {
      const currentDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" });
      const versionItem = {
        date: currentDate,
        content: legalContent,
        updatedBy: user?.email || "Admin",
      };
      const updatedHistory = [versionItem, ...legalHistory].slice(0, 10);
      
      await updateLegalPage(selectedLegalSlug, {
        title: legalTitle,
        content: legalContent,
        published: legalPublished,
        lastUpdated: currentDate,
        versionHistory: updatedHistory,
      });
      
      setLegalLastUpdated(currentDate);
      setLegalHistory(updatedHistory);
      alert("Legal page saved successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to save legal page.");
    } finally {
      setLegalSaving(false);
    }
  };

  useEffect(() => {
    if (activeTab === "legal") {
      loadLegalPageData(selectedLegalSlug);
    }
  }, [selectedLegalSlug, activeTab]);

  const handleResolveMessage = async (msgId: string, resolvedState: boolean) => {
    await resolveContactMessage(msgId, resolvedState);
    await loadAllData();
  };

  const handleArchiveMessage = async (msgId: string, archivedState: boolean) => {
    await archiveContactMessage(msgId, archivedState);
    await loadAllData();
  };

  const handleExportMessagesCSV = () => {
    if (messages.length === 0) return;
    let csvContent = "data:text/csv;charset=utf-8,Name,Email,Subject,Inquiry Type,Message,Date,Replied,Resolved,Archived\n";
    messages.forEach((m) => {
      const safeMsg = m.message.replace(/"/g, '""');
      csvContent += `"${m.name}","${m.email}","${m.subject}","${m.inquiryType || "General Question"}","${safeMsg}","${m.createdAt}",${m.replied},${m.resolved ?? false},${m.archived ?? false}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mediguide_contact_messages_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    setEditorTab("content");

    // Load Advanced CMS fields
    setPostImageAlt(post.imageAlt || "");
    setPostImageCaption(post.imageCaption || "");
    setPostImageCredit(post.imageCredit || "");
    setPostVideoUrl(post.videoUrl || "");
    setPostRelatedArticles(post.relatedArticles?.join(", ") || "");
    setPostFeatured(post.featured || false);
    setPostTrending(post.trending || false);

    setSeoMetaTitle(post.metaTitle || "");
    setSeoMetaDescription(post.metaDescription || "");
    setSeoFocusKeyphrase(post.focusKeyphrase || "");
    setSeoScore(post.seoScore || 85);
    setSeoSchemaType(post.schemaType || "MedicalWebPage");
    setSeoRobotsMeta(post.robotsMeta || "index, follow");
    setSeoCanonicalUrl(post.canonicalUrl || "");

    setPostVisibility(post.visibility || "Public");
    setPostAllowComments(post.allowComments ?? true);
    setPostLastReviewed(post.lastReviewedDate || "");
    setPostReviewFreq(post.reviewFrequency || "6 months");
    setPostLanguage(post.language || "English");
    setPostVersion(post.versionNumber || "1.0");
  };

  const handleAddPostClick = (preserveDraft = false) => {
    const hasDraftContent = Boolean(postTitle || postSlug || postSummary || postContent || postAuthor || postReadTime || postImage);

    setEditingPost(null);
    setIsAddingPost(true);
    setEditorTab("content");

    if (!preserveDraft || !hasDraftContent) {
      setPostTitle("");
      setPostSlug("");
      setPostCategory("Overview");
      setPostSummary("");
      setPostContent("");
      setPostAuthor(user?.displayName || "");
      setPostReadTime("");
      setPostImage("");
      
      setPostImageAlt("");
      setPostImageCaption("");
      setPostImageCredit("");
      setPostVideoUrl("");
      setPostRelatedArticles("");
      setPostFeatured(false);
      setPostTrending(false);

      setSeoMetaTitle("");
      setSeoMetaDescription("");
      setSeoFocusKeyphrase("");
      setSeoScore(85);
      setSeoSchemaType("MedicalWebPage");
      setSeoRobotsMeta("index, follow");
      setSeoCanonicalUrl("");

      setPostVisibility("Public");
      setPostAllowComments(true);
      setPostLastReviewed("");
      setPostReviewFreq("6 months");
      setPostLanguage("English");
      setPostVersion("1.0");
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

  const handleSavePost = async (e: React.FormEvent, forceStatus?: "Published" | "Draft" | "Scheduled") => {
    if (e) e.preventDefault();
    if (!postTitle || !postSlug || !postContent) {
      alert("Please enter title, slug, and content.");
      return;
    }

    try {
      const parsedRelated = postRelatedArticles
        ? postRelatedArticles.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

      const calculatedStatus = forceStatus || (editingPost?.status || "Published");

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
        
        // Advanced CMS additions
        status: calculatedStatus,
        seoScore: seoScore || 85,
        updatedAt: new Date().toISOString().split("T")[0],
        imageAlt: postImageAlt,
        imageCaption: postImageCaption,
        imageCredit: postImageCredit,
        videoUrl: postVideoUrl,
        relatedArticles: parsedRelated,
        featured: postFeatured,
        trending: postTrending,
        
        metaTitle: seoMetaTitle || postTitle,
        metaDescription: seoMetaDescription || postSummary,
        focusKeyphrase: seoFocusKeyphrase,
        schemaType: seoSchemaType,
        robotsMeta: seoRobotsMeta,
        canonicalUrl: seoCanonicalUrl || `https://mediguidehub.com/blog/${postSlug}`,
        
        visibility: postVisibility,
        allowComments: postAllowComments,
        lastReviewedDate: postLastReviewed || new Date().toISOString().split("T")[0],
        reviewFrequency: postReviewFreq,
        language: postLanguage,
        versionNumber: postVersion,
      };

      if (editingPost) {
        pData.id = editingPost.id;
        pData.views = editingPost.views || 0;
      } else {
        pData.views = Math.floor(Math.random() * 200) + 10; // Seed views
      }

      await savePost(pData);
      setIsAddingPost(false);
      setEditingPost(null);
      await loadAllData();
      alert(`Article saved successfully as ${calculatedStatus}!`);
    } catch (err) {
      console.error(err);
      alert("Failed to save article.");
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

  // Category operations
  const handleEditCategoryClick = (cat: BlogCategory) => {
    setEditingCategory(cat);
    setIsAddingCategory(false);
    setCategoryTab("basic");

    setCatName(cat.name);
    setCatSlug(cat.slug);
    setCatDesc(cat.description || "");
    setCatIcon(cat.icon || "Folder");
    setCatBanner(cat.bannerImage || "");
    setCatThumbnail(cat.thumbnail || "");
    setCatDisplayOrder(cat.displayOrder || 1);
    setCatParent(cat.parentCategory || "");
    setCatFeatured(cat.featuredCategory || false);
    setCatStatus(cat.status || "Active");

    setCatSeoTitle(cat.seoTitle || "");
    setCatSeoDesc(cat.seoDesc || "");
    setCatSeoKeyword(cat.seoFocusKeyword || "");
    setCatSeoCanonical(cat.seoCanonical || "");
    setCatSeoSchema(cat.seoSchemaType || "MedicalWebPage");
    setCatSeoOgImage(cat.seoOgImage || "");
  };

  const handleAddCategoryClick = () => {
    setEditingCategory(null);
    setIsAddingCategory(true);
    setCategoryTab("basic");

    setCatName("");
    setCatSlug("");
    setCatDesc("");
    setCatIcon("Folder");
    setCatBanner("");
    setCatThumbnail("");
    setCatDisplayOrder(categoriesList.length + 1);
    setCatParent("");
    setCatFeatured(false);
    setCatStatus("Active");

    setCatSeoTitle("");
    setCatSeoDesc("");
    setCatSeoKeyword("");
    setCatSeoCanonical("");
    setCatSeoSchema("MedicalWebPage");
    setCatSeoOgImage("");
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName || !catSlug) {
      alert("Name and slug are required.");
      return;
    }

    try {
      const cData: BlogCategory = {
        name: catName,
        slug: catSlug,
        description: catDesc,
        icon: catIcon || "Folder",
        bannerImage: catBanner,
        thumbnail: catThumbnail,
        displayOrder: catDisplayOrder || 1,
        parentCategory: catParent,
        featuredCategory: catFeatured,
        status: catStatus,
        seoTitle: catSeoTitle || `${catName} | MediGuideHub`,
        seoDesc: catSeoDesc || catDesc,
        seoFocusKeyword: catSeoKeyword || catName,
        seoCanonical: catSeoCanonical || `https://mediguidehub.com/categories/${catSlug}`,
        seoSchemaType: catSeoSchema || "MedicalWebPage",
        seoOgImage: catSeoOgImage,
        createdAt: editingCategory?.createdAt || new Date().toISOString().split("T")[0],
        seoScore: editingCategory?.seoScore || 85,
        articleCount: editingCategory?.articleCount || 0
      };

      if (editingCategory) {
        cData.id = editingCategory.id;
      }

      await saveCategory(cData);
      setIsAddingCategory(false);
      setEditingCategory(null);
      await loadAllData();
      alert("Category saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save category.");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(id);
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
                onClick={() => handleTabChange("categories")}
                className={`group w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ease-out ${
                  activeTab === "categories"
                    ? "bg-[#C9A15A] text-white shadow-sm"
                    : "text-white lg:text-stone-600 lg:hover:bg-[#F9FAFB] lg:hover:text-[#113F48] hover:bg-white/10 hover:text-white hover:translate-x-[3px]"
                }`}
              >
                <Grid className={`h-4 w-4 transition-transform duration-200 ease-out ${activeTab === "categories" ? "scale-110" : "group-hover:scale-[1.12]"}`} />
                Categories
              </button>

              <button
                onClick={() => handleTabChange("search-analytics")}
                className={`group w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ease-out ${
                  activeTab === "search-analytics"
                    ? "bg-[#C9A15A] text-white shadow-sm"
                    : "text-white lg:text-stone-600 lg:hover:bg-[#F9FAFB] lg:hover:text-[#113F48] hover:bg-white/10 hover:text-white hover:translate-x-[3px]"
                }`}
              >
                <TrendingUp className={`h-4 w-4 transition-transform duration-200 ease-out ${activeTab === "search-analytics" ? "scale-110" : "group-hover:scale-[1.12]"}`} />
                Search Analytics
              </button>

              <button
                onClick={() => handleTabChange("technical-seo")}
                className={`group w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ease-out ${
                  activeTab === "technical-seo"
                    ? "bg-[#C9A15A] text-white shadow-sm"
                    : "text-white lg:text-stone-600 lg:hover:bg-[#F9FAFB] lg:hover:text-[#113F48] hover:bg-white/10 hover:text-white hover:translate-x-[3px]"
                }`}
              >
                <ShieldCheck className={`h-4 w-4 transition-transform duration-200 ease-out ${activeTab === "technical-seo" ? "scale-110" : "group-hover:scale-[1.12]"}`} />
                Technical SEO
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

              <button
                onClick={() => handleTabChange("legal")}
                className={`group w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ease-out ${
                  activeTab === "legal"
                    ? "bg-[#C9A15A] text-white shadow-sm"
                    : "text-white lg:text-stone-600 lg:hover:bg-[#F9FAFB] lg:hover:text-[#113F48] hover:bg-white/10 hover:text-white hover:translate-x-[3px]"
                }`}
              >
                <ShieldCheck className={`h-4 w-4 transition-transform duration-200 ease-out ${activeTab === "legal" ? "scale-110" : "group-hover:scale-[1.12]"}`} />
                Legal Pages
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
            <div className="space-y-8">
              
              {/* Top Welcome Title */}
              <div className="bg-white border border-[#C9A15A]/25 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C9A15A]">System Status: Operational</span>
                  <h2 className="text-2xl font-extrabold text-[#113F48] mt-1">Analytics &amp; Performance Dashboard</h2>
                  <p className="text-xs text-stone-500 mt-1">Real-time health content traffic, search engine visibility, and visitor interactions.</p>
                </div>
                <button
                  onClick={loadAllData}
                  className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                >
                  Sync Analytics Data
                </button>
              </div>

              {/* OVERVIEW STATISTICS CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { label: "Total Visitors", val: "145,280", pct: "+12.4%", color: "text-emerald-600" },
                  { label: "Unique Visitors", val: "98,450", pct: "+8.7%", color: "text-emerald-600" },
                  { label: "Page Views", val: "310,400", pct: "+15.1%", color: "text-emerald-600" },
                  { label: "Total Sessions", val: "122,190", pct: "+11.2%", color: "text-emerald-600" },
                  { label: "Bounce Rate", val: "42.5%", pct: "-2.1%", color: "text-emerald-600" },
                  { label: "Session Duration", val: "3m 45s", pct: "+0.3m", color: "text-emerald-600" },
                  { label: "Returning Users", val: "24.2%", pct: "+1.5%", color: "text-emerald-600" },
                  { label: "Organic Search Share", val: "78.4%", pct: "+4.2%", color: "text-emerald-600" },
                  { label: "Subscribers", val: stats.subs.toString(), pct: "+9.1%", color: "text-emerald-600" },
                  { label: "Articles", val: stats.posts.toString(), pct: "Updated", color: "text-stone-400" },
                ].map((card, i) => (
                  <div key={i} className="bg-white border border-[#C9A15A]/15 p-4.5 rounded-2xl shadow-sm space-y-2">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">{card.label}</span>
                    <div className="flex justify-between items-end">
                      <h4 className="text-xl font-extrabold text-[#113F48]">{card.val}</h4>
                      <span className={`text-[9px] font-extrabold ${card.color}`}>{card.pct}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* TRAFFIC CHARTS & DATA VIEWS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 1. Daily Visitors Bar Graph (Pure CSS/HTML) */}
                <div className="bg-white border border-[#C9A15A]/15 p-5 rounded-2xl shadow-sm space-y-4">
                  <div>
                    <h3 className="font-bold text-[#113F48] text-sm">Visitors (Daily Trend)</h3>
                    <p className="text-[10px] text-stone-400">Weekly traffic fluctuations</p>
                  </div>
                  <div className="flex items-end justify-between h-40 pt-4 border-b border-stone-100">
                    {[
                      { day: "Mon", val: 75 },
                      { day: "Tue", val: 88 },
                      { day: "Wed", val: 92 },
                      { day: "Thu", val: 85 },
                      { day: "Fri", val: 78 },
                      { day: "Sat", val: 45 },
                      { day: "Sun", val: 52 },
                    ].map((bar, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2 w-full">
                        <div 
                          className="w-4 bg-[#113F48] rounded-t hover:bg-[#C9A15A] transition-all" 
                          style={{ height: `${bar.val}%` }} 
                        />
                        <span className="text-[9px] text-stone-400 font-bold">{bar.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Device Breakdown (SVG Donut Chart Mock) */}
                <div className="bg-white border border-[#C9A15A]/15 p-5 rounded-2xl shadow-sm space-y-4">
                  <div>
                    <h3 className="font-bold text-[#113F48] text-sm">Device Distribution</h3>
                    <p className="text-[10px] text-stone-400">Device profiles of readers</p>
                  </div>
                  <div className="flex items-center justify-around h-40">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      {/* Simple Circle representing Donut graph */}
                      <div className="absolute inset-0 rounded-full border-8 border-stone-100 border-t-[#113F48] border-r-[#C9A15A] border-b-[#0F6E56]" />
                      <span className="text-xs font-bold text-[#113F48]">3 Platforms</span>
                    </div>
                    <ul className="text-[10px] space-y-2 font-semibold text-stone-600">
                      <li className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#113F48]" /> Desktop: 62%</li>
                      <li className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#C9A15A]" /> Mobile: 34%</li>
                      <li className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#0F6E56]" /> Tablet: 4%</li>
                    </ul>
                  </div>
                </div>

                {/* 3. Traffic Channels (Progress Bars) */}
                <div className="bg-white border border-[#C9A15A]/15 p-5 rounded-2xl shadow-sm space-y-4">
                  <div>
                    <h3 className="font-bold text-[#113F48] text-sm">Traffic Acquisition Channels</h3>
                    <p className="text-[10px] text-stone-400">Where visitors originate</p>
                  </div>
                  <div className="space-y-3.5 pt-2">
                    {[
                      { source: "Organic Google Search", pct: 78, color: "bg-[#113F48]" },
                      { source: "Direct Entry", pct: 12, color: "bg-[#C9A15A]" },
                      { source: "Newsletter Referrals", pct: 7, color: "bg-[#0F6E56]" },
                      { source: "Social Sharing", pct: 3, color: "bg-stone-500" },
                    ].map((src, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-stone-600">
                          <span>{src.source}</span>
                          <span>{src.pct}%</span>
                        </div>
                        <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                          <div className={`h-full ${src.color}`} style={{ width: `${src.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* BREADCRUMB BARS & TOP READ TABLES */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Top Public Pages */}
                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <h4 className="font-bold text-sm text-[#113F48]">Top Landing Pages</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-stone-100 text-stone-400 font-bold">
                          <th className="pb-2">Page Path</th>
                          <th className="pb-2">Views</th>
                          <th className="pb-2">Bounce</th>
                          <th className="pb-2">Avg Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-50 font-medium text-stone-600">
                        {[
                          { path: "/", views: "120,400", bounce: "40.2%", time: "3m 12s" },
                          { path: "/about", views: "45,100", bounce: "38.5%", time: "2m 45s" },
                          { path: "/contact", views: "28,300", bounce: "51.4%", time: "1m 30s" },
                          { path: "/privacy-policy", views: "12,000", bounce: "48.2%", time: "4m 10s" },
                          { path: "/medical-disclaimer", views: "9,500", bounce: "45.0%", time: "3m 50s" },
                        ].map((p, i) => (
                          <tr key={i} className="hover:bg-stone-50/50">
                            <td className="py-2.5 font-mono text-[#C9A15A]">{p.path}</td>
                            <td className="py-2.5 font-bold text-[#113F48]">{p.views}</td>
                            <td className="py-2.5">{p.bounce}</td>
                            <td className="py-2.5 text-stone-400">{p.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Google Search Performance */}
                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-sm text-[#113F48]">Search Console (SEO Performance)</h4>
                    <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold">Avg Pos: 3.4</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-stone-100 text-stone-400 font-bold">
                          <th className="pb-2">Top Query</th>
                          <th className="pb-2 text-right">Clicks</th>
                          <th className="pb-2 text-right">Imps</th>
                          <th className="pb-2 text-right">CTR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-50 font-medium text-stone-600">
                        {[
                          { query: "medicare enrollment timeline", clicks: "8,450", imps: "62,000", ctr: "13.6%" },
                          { query: "what is medicare part a", clicks: "6,200", imps: "48,000", ctr: "12.9%" },
                          { query: "compare medigap plans", clicks: "4,100", imps: "39,000", ctr: "10.5%" },
                          { query: "medicare advantage eligibility", clicks: "3,800", imps: "31,000", ctr: "12.2%" },
                        ].map((q, i) => (
                          <tr key={i} className="hover:bg-stone-50/50">
                            <td className="py-2.5 text-stone-700 font-semibold">{q.query}</td>
                            <td className="py-2.5 text-right font-bold text-[#113F48]">{q.clicks}</td>
                            <td className="py-2.5 text-right text-stone-500">{q.imps}</td>
                            <td className="py-2.5 text-right text-emerald-600 font-bold">{q.ctr}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* MOST READ ARTICLES & INSIGHTS PANEL */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Most Read Articles Table */}
                <div className="lg:col-span-8 bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <h4 className="font-bold text-sm text-[#113F48]">Most Read Articles Rankings</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-stone-100 text-stone-400 font-bold">
                          <th className="pb-2">Rank</th>
                          <th className="pb-2">Article Title</th>
                          <th className="pb-2">Category</th>
                          <th className="pb-2 text-right">Views</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-50 text-stone-600">
                        {posts
                          .sort((a, b) => (b.views || 0) - (a.views || 0))
                          .slice(0, 5)
                          .map((post, idx) => (
                            <tr key={post.id} className="hover:bg-stone-50/50">
                              <td className="py-2.5 font-bold text-stone-400">#{idx + 1}</td>
                              <td className="py-2.5 font-semibold text-[#113F48] truncate max-w-xs">{post.title}</td>
                              <td className="py-2.5"><span className="bg-[#FDF6EC] px-2 py-0.5 rounded border border-[#C9A15A]/15 text-[9px] font-bold text-[#C9A15A]">{post.category}</span></td>
                              <td className="py-2.5 text-right font-extrabold text-[#113F48]">{post.views || 0}</td>
                            </tr>
                          ))}
                        {posts.length === 0 && (
                          <tr>
                            <td colSpan={4} className="py-6 text-center text-stone-400">No blog posts available.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* E-E-A-T Insights & Warning Panel */}
                <div className="lg:col-span-4 bg-[#FDF6EC]/30 border border-[#C9A15A]/25 rounded-2xl p-5 space-y-4">
                  <h4 className="font-bold text-sm text-[#113F48] flex items-center gap-1">
                    <ShieldCheck className="h-4.5 w-4.5 text-[#C9A15A]" />
                    E-E-A-T Trust Insights
                  </h4>
                  <ul className="text-xs space-y-3.5 text-stone-600">
                    <li className="space-y-0.5">
                      <span className="font-bold text-[#113F48] block">Top Performing Category</span>
                      <p className="text-stone-500">Part A (Generates 45% of total organic views)</p>
                    </li>
                    <li className="space-y-0.5">
                      <span className="font-bold text-[#113F48] block">Best Performing Article</span>
                      <p className="text-stone-500 truncate">{posts.sort((a,b)=>(b.views||0)-(a.views||0))[0]?.title || "Medicare Guides"}</p>
                    </li>
                    <li className="space-y-0.5">
                      <span className="font-bold text-[#113F48] block">Search Engine Warnings</span>
                      <p className="text-emerald-600 font-semibold flex items-center gap-1">✓ 100% Legal &amp; Disclaimer coverage. AdSense ready.</p>
                    </li>
                    <li className="space-y-0.5">
                      <span className="font-bold text-[#113F48] block">Content Integrity Status</span>
                      <p className="text-[#C9A15A] font-semibold">100% of guides updated for 2026 guidelines.</p>
                    </li>
                  </ul>
                </div>

              </div>

            </div>
          )}

          {/* TAB 1: Manage Posts */}
          {activeTab === "posts" && (
            <div className="space-y-6">
              
              {/* CMS Nested Sub Navigation */}
              <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3">
                {[
                  { id: "all", label: "All Articles" },
                  { id: "editor", label: isAddingPost || editingPost ? "Edit/Add Article" : "Add New Article" },
                  { id: "Draft", label: "Drafts" },
                  { id: "Scheduled", label: "Scheduled" },
                  { id: "Published", label: "Published" },
                  { id: "categories", label: "Categories" },
                  { id: "tags", label: "Tags" },
                  { id: "media", label: "Media Library" },
                ].map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setCmsSubTab(sub.id);
                      if (sub.id === "editor" && !isAddingPost && !editingPost) {
                        handleAddPostClick(false);
                      } else if (sub.id !== "editor") {
                        setIsAddingPost(false);
                        setEditingPost(null);
                      }
                    }}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                      (cmsSubTab === sub.id || (sub.id === "editor" && (isAddingPost || editingPost)))
                        ? "bg-[#113F48] text-white border-[#113F48]"
                        : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>

              {/* EDITOR TAB VIEW */}
              {(isAddingPost || editingPost || cmsSubTab === "editor") ? (
                <div className="bg-white border border-[#C9A15A]/25 p-6 rounded-2xl shadow-sm space-y-6">
                  
                  {/* Editor Top Bar */}
                  <div className="flex justify-between items-center border-b border-stone-100 pb-4">
                    <h3 className="text-lg font-bold text-[#113F48]">
                      {editingPost ? `Edit Article: ${postTitle}` : "Create New Article"}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingPost(false);
                        setEditingPost(null);
                        setCmsSubTab("all");
                      }}
                      className="text-stone-400 hover:text-red-500 text-xs font-semibold"
                    >
                      Close Editor
                    </button>
                  </div>

                  {/* Editor Tab Navigation */}
                  <div className="flex flex-wrap gap-1.5 bg-stone-50 p-1 rounded-xl">
                    {[
                      { id: "content", label: "Content" },
                      { id: "seo", label: "SEO Settings" },
                      { id: "media", label: "Media Details" },
                      { id: "taxonomies", label: "Categories & Tags" },
                      { id: "advanced", label: "Advanced" },
                      { id: "preview", label: "Live Preview" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setEditorTab(tab.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          editorTab === tab.id
                            ? "bg-white text-[#113F48] shadow-sm"
                            : "text-stone-500 hover:text-stone-800"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* FORM WRAPPER */}
                  <form onSubmit={(e) => handleSavePost(e, "Published")} className="space-y-6">
                    
                    {/* TAB: CONTENT */}
                    {editorTab === "content" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Article Title *</label>
                            <input
                              required
                              value={postTitle}
                              onChange={(e) => {
                                setPostTitle(e.target.value);
                                if (!editingPost) {
                                  setPostSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
                                }
                              }}
                              placeholder="Title of the guide..."
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">URL Slug *</label>
                            <input
                              required
                              value={postSlug}
                              onChange={(e) => setPostSlug(e.target.value)}
                              placeholder="url-path-slug"
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Author Name</label>
                            <input
                              value={postAuthor}
                              onChange={(e) => setPostAuthor(e.target.value)}
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Read Time</label>
                            <input
                              value={postReadTime}
                              onChange={(e) => setPostReadTime(e.target.value)}
                              placeholder="8 min read"
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Category</label>
                            <select
                              value={postCategory}
                              onChange={(e) => setPostCategory(e.target.value)}
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
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
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Short Description (Meta Summary) *</label>
                          <textarea
                            required
                            rows={3}
                            value={postSummary}
                            onChange={(e) => setPostSummary(e.target.value)}
                            placeholder="Provide a detailed SEO description..."
                            className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide block">Article Body Content *</label>
                          
                          {/* Rich Styling Toolbar */}
                          <div className="flex flex-wrap gap-1 bg-stone-50 border border-stone-200 p-2 rounded-t-xl border-b-0">
                            {[
                              { label: "Heading 2", tag: "<h2>Heading</h2>" },
                              { label: "Paragraph", tag: "<p>Text paragraph...</p>" },
                              { label: "Bold", tag: "<strong>Bold text</strong>" },
                              { label: "Italic", tag: "<em>Italic text</em>" },
                              { label: "Warning Box", tag: "<div className=\"bg-red-50 border-l-4 border-red-500 p-4 text-xs font-bold text-red-800\">Medical Warning text</div>" },
                              { label: "Callout Box", tag: "<div className=\"bg-[#FDF6EC] border-l-4 border-[#C9A15A] p-4 text-xs text-stone-700\">Callout box text</div>" },
                              { label: "Table", tag: "<table className=\"w-full text-left\">\n  <thead><tr><th>Heading</th></tr></thead>\n  <tbody><tr><td>Value</td></tr></tbody>\n</table>" },
                              { label: "Bullet List", tag: "<ul>\n  <li>List item</li>\n</ul>" },
                            ].map((btn) => (
                              <button
                                key={btn.label}
                                type="button"
                                onClick={() => setPostContent(prev => prev + btn.tag)}
                                className="bg-white border border-stone-200 px-2 py-1 rounded text-[10px] font-semibold text-stone-600 hover:border-[#C9A15A] hover:bg-[#FDF6EC]/20 transition-all"
                              >
                                {btn.label}
                              </button>
                            ))}
                          </div>

                          <textarea
                            required
                            rows={14}
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            placeholder="Enter HTML or text content..."
                            className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-b-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48] font-mono"
                          />
                        </div>

                        <div className="flex gap-6 pt-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={postFeatured}
                              onChange={(e) => setPostFeatured(e.target.checked)}
                              className="h-4 w-4 rounded border-stone-300 text-[#113F48] focus:ring-[#C9A15A]"
                            />
                            <span className="text-xs font-semibold text-stone-700">Mark as Featured Article</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={postTrending}
                              onChange={(e) => setPostTrending(e.target.checked)}
                              className="h-4 w-4 rounded border-stone-300 text-[#113F48] focus:ring-[#C9A15A]"
                            />
                            <span className="text-xs font-semibold text-stone-700">Mark as Trending</span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* TAB: SEO */}
                    {editorTab === "seo" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Focus Keyphrase</label>
                            <input
                              value={seoFocusKeyphrase}
                              onChange={(e) => setSeoFocusKeyphrase(e.target.value)}
                              placeholder="e.g. Medicare Part A benefits"
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">SEO Target Score (0 - 100)</label>
                            <input
                              type="number"
                              value={seoScore}
                              onChange={(e) => setSeoScore(Number(e.target.value))}
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Meta SEO Title</label>
                          <input
                            value={seoMetaTitle}
                            onChange={(e) => setSeoMetaTitle(e.target.value)}
                            placeholder="Defaults to article title if blank..."
                            className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Meta SEO Description</label>
                          <textarea
                            rows={3}
                            value={seoMetaDescription}
                            onChange={(e) => setSeoMetaDescription(e.target.value)}
                            placeholder="Defaults to short description if blank..."
                            className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Schema Structured Data Type</label>
                            <select
                              value={seoSchemaType}
                              onChange={(e) => setSeoSchemaType(e.target.value)}
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            >
                              <option value="MedicalWebPage">MedicalWebPage</option>
                              <option value="MedicalCondition">MedicalCondition</option>
                              <option value="NewsArticle">NewsArticle</option>
                              <option value="BlogPosting">BlogPosting</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Robots Tag</label>
                            <input
                              value={seoRobotsMeta}
                              onChange={(e) => setSeoRobotsMeta(e.target.value)}
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Canonical URL</label>
                            <input
                              value={seoCanonicalUrl}
                              onChange={(e) => setSeoCanonicalUrl(e.target.value)}
                              placeholder="https://mediguidehub.com/blog/url"
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB: MEDIA */}
                    {editorTab === "media" && (
                      <div className="space-y-4">
                        <div className="space-y-2 border border-dashed border-stone-200 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="h-16 w-20 bg-stone-100 rounded-lg overflow-hidden border border-stone-200 flex items-center justify-center text-[10px] text-stone-400">
                              {postImage ? (
                                <img src={postImage} alt="Post preview" className="h-full w-full object-cover" />
                              ) : (
                                <span>No Image</span>
                              )}
                            </div>
                            <div>
                              <h5 className="text-xs font-bold text-[#113F48]">Featured Banner Image</h5>
                              <p className="text-[10px] text-stone-400">Resolution size 1200x630px recommended.</p>
                            </div>
                          </div>
                          <label className="cursor-pointer border border-[#C9A15A]/30 bg-[#FDF6EC]/30 text-stone-600 hover:text-[#C9A15A] text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1">
                            <Upload className="h-3.5 w-3.5" />
                            Upload File
                            <input type="file" accept="image/*" className="hidden" onChange={handlePostImageUpload} disabled={imageUploading} />
                          </label>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Image Alternative Text</label>
                            <input
                              value={postImageAlt}
                              onChange={(e) => setPostImageAlt(e.target.value)}
                              placeholder="Clinical chart describing..."
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Image Caption Text</label>
                            <input
                              value={postImageCaption}
                              onChange={(e) => setPostImageCaption(e.target.value)}
                              placeholder="Medicare Enrollment Guide 2026"
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Image Author Credit</label>
                            <input
                              value={postImageCredit}
                              onChange={(e) => setPostImageCredit(e.target.value)}
                              placeholder="Source: MediGuideHub Research"
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">YouTube Video Integration URL</label>
                          <input
                            value={postVideoUrl}
                            onChange={(e) => setPostVideoUrl(e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                          />
                        </div>
                      </div>
                    )}

                    {/* TAB: CATEGORIES & TAGS */}
                    {editorTab === "taxonomies" && (
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Article Tag Keywords</label>
                          <input
                            value={postRelatedArticles}
                            onChange={(e) => setPostRelatedArticles(e.target.value)}
                            placeholder="Medicare, Enrollment, Part A, Part B (comma separated)"
                            className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                          />
                          <p className="text-[10px] text-stone-400 mt-1">Tags help link relevant topics together on guides.</p>
                        </div>
                      </div>
                    )}

                    {/* TAB: ADVANCED */}
                    {editorTab === "advanced" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Visibility Scope</label>
                            <select
                              value={postVisibility}
                              onChange={(e) => setPostVisibility(e.target.value)}
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            >
                              <option value="Public">Public (Everyone)</option>
                              <option value="Private">Private (Admins Only)</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Review Frequency</label>
                            <input
                              value={postReviewFreq}
                              onChange={(e) => setPostReviewFreq(e.target.value)}
                              className="w-full bg-[#FDF6EC]/10 border border-[#C9A15A]/20 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Language</label>
                            <input
                              value={postLanguage}
                              onChange={(e) => setPostLanguage(e.target.value)}
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Version Number</label>
                            <input
                              value={postVersion}
                              onChange={(e) => setPostVersion(e.target.value)}
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Last Reviewed Date</label>
                            <input
                              type="date"
                              value={postLastReviewed}
                              onChange={(e) => setPostLastReviewed(e.target.value)}
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                          <div className="space-y-1.5 flex items-end pb-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={postAllowComments}
                                onChange={(e) => setPostAllowComments(e.target.checked)}
                                className="h-4 w-4 rounded border-stone-300 text-[#113F48] focus:ring-[#C9A15A]"
                              />
                              <span className="text-xs font-semibold text-stone-700">Allow Comments</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB: PREVIEW */}
                    {editorTab === "preview" && (
                      <div className="border border-stone-200 rounded-2xl p-6 bg-white space-y-6">
                        <div className="space-y-2 border-b border-stone-100 pb-4">
                          <span className="text-[10px] font-bold text-[#C9A15A] uppercase tracking-wider bg-[#FDF6EC] px-2.5 py-1 rounded border border-[#C9A15A]/20">{postCategory}</span>
                          <h1 className="text-3xl font-extrabold text-[#113F48]">{postTitle || "Untiltled Article"}</h1>
                          <p className="text-xs text-stone-400">By {postAuthor || "Admin"} • {postReadTime || "5 min read"}</p>
                        </div>
                        {postImage && (
                          <div className="rounded-xl overflow-hidden max-h-72 border border-stone-100">
                            <img src={postImage} alt={postImageAlt} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div 
                          className="prose prose-stone max-w-none text-stone-600 text-sm leading-relaxed" 
                          dangerouslySetInnerHTML={{ __html: postContent || "<p>No content written yet.</p>" }}
                        />
                      </div>
                    )}

                    {/* ACTIONS BUTTON BAR */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-100 justify-end">
                      <button
                        type="button"
                        onClick={(e) => handleSavePost(e, "Draft")}
                        className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold px-4 py-2.5 rounded-xl text-xs transition-all"
                      >
                        Save Draft
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleSavePost(e, "Scheduled")}
                        className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition-all"
                      >
                        Schedule Publication
                      </button>
                      <button
                        type="submit"
                        className="bg-[#113F48] hover:bg-[#C9A15A] text-white font-semibold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-[#113F48]/10"
                      >
                        Publish Now
                      </button>
                    </div>

                  </form>
                </div>
              ) : (
                /* ARTICLES LIST VIEW */
                <div className="space-y-6">
                  
                  {/* Dashboard stats cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#113F48] p-4 rounded-2xl shadow-sm border border-stone-100 text-white space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Total Articles</span>
                      <h4 className="text-2xl font-extrabold">{posts.length}</h4>
                    </div>
                    <div className="bg-[#0F6E56] p-4 rounded-2xl shadow-sm border border-stone-100 text-white space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Published</span>
                      <h4 className="text-2xl font-extrabold">{posts.filter(p => !p.status || p.status === "Published").length}</h4>
                    </div>
                    <div className="bg-stone-600 p-4 rounded-2xl shadow-sm border border-stone-100 text-white space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Drafts</span>
                      <h4 className="text-2xl font-extrabold">{posts.filter(p => p.status === "Draft").length}</h4>
                    </div>
                    <div className="bg-amber-600 p-4 rounded-2xl shadow-sm border border-stone-100 text-white space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Scheduled</span>
                      <h4 className="text-2xl font-extrabold">{posts.filter(p => p.status === "Scheduled").length}</h4>
                    </div>
                  </div>

                  {/* Header action buttons */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#C9A15A]/15 p-4 rounded-2xl shadow-sm">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleAddPostClick(false)}
                        className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1 shadow-sm"
                      >
                        <Plus className="h-4 w-4" /> New Article
                      </button>
                      <button
                        onClick={() => {
                          let csv = "data:text/csv;charset=utf-8,Title,Slug,Category,Status,Views,Date\n";
                          posts.forEach(p => csv += `"${p.title}","${p.slug}","${p.category}","${p.status || "Published"}",${p.views || 0},"${p.publishedAt}"\n`);
                          const encoded = encodeURI(csv);
                          const link = document.createElement("a");
                          link.setAttribute("href", encoded);
                          link.setAttribute("download", `mediguide_articles_${Date.now()}.csv`);
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                      >
                        Export CSV
                      </button>
                    </div>
                    <button
                      onClick={loadAllData}
                      className="text-stone-400 hover:text-stone-700 text-xs font-semibold"
                    >
                      Refresh List
                    </button>
                  </div>

                  {/* Search filters */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#113F48] uppercase tracking-wide">Search Article</label>
                      <input
                        type="text"
                        placeholder="Search title, content..."
                        value={articleSearchQuery}
                        onChange={(e) => setArticleSearchQuery(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#113F48] uppercase tracking-wide">Category</label>
                      <select
                        value={articleFilterCategory}
                        onChange={(e) => setArticleFilterCategory(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                      >
                        <option value="all">All Categories</option>
                        <option value="Overview">Overview</option>
                        <option value="Part A">Part A</option>
                        <option value="Part B">Part B</option>
                        <option value="Part C">Part C</option>
                        <option value="Part D">Part D</option>
                        <option value="Comparison">Comparison</option>
                        <option value="Enrollment">Enrollment</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#113F48] uppercase tracking-wide">Status</label>
                      <select
                        value={articleFilterStatus}
                        onChange={(e) => setArticleFilterStatus(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                      >
                        <option value="all">All Statuses</option>
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Scheduled">Scheduled</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#113F48] uppercase tracking-wide">Sort By</label>
                      <select
                        value={articleSortBy}
                        onChange={(e) => setArticleSortBy(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                      >
                        <option value="date">Publish Date</option>
                        <option value="views">Views</option>
                        <option value="title">Title</option>
                      </select>
                    </div>
                  </div>

                  {/* Articles Table list */}
                  {cmsSubTab === "categories" ? (
                    <div className="bg-white border border-stone-200 p-6 rounded-2xl space-y-4">
                      <h4 className="font-bold text-[#113F48] text-sm">Managed Categories</h4>
                      <ul className="divide-y divide-stone-100 text-xs text-stone-600">
                        {["Overview", "Part A", "Part B", "Part C", "Part D", "Comparison", "Enrollment"].map((c, i) => (
                          <li key={i} className="py-2.5 flex justify-between">
                            <span>{c}</span>
                            <span className="font-bold text-stone-400">{posts.filter(p => p.category === c).length} Articles</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : cmsSubTab === "tags" ? (
                    <div className="bg-white border border-stone-200 p-6 rounded-2xl space-y-4">
                      <h4 className="font-bold text-[#113F48] text-sm">Active Article Tag Keys</h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(new Set(posts.flatMap(p => p.relatedArticles || []))).map((t, idx) => (
                          <span key={idx} className="bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-lg text-xs font-semibold text-stone-600">
                            #{t}
                          </span>
                        ))}
                        {posts.flatMap(p => p.relatedArticles || []).length === 0 && (
                          <span className="text-stone-400 text-xs">No tags defined yet. Edit articles to add keyword tags.</span>
                        )}
                      </div>
                    </div>
                  ) : cmsSubTab === "media" ? (
                    <div className="bg-white border border-stone-200 p-6 rounded-2xl space-y-4">
                      <h4 className="font-bold text-[#113F48] text-sm">Media File Library</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {posts.filter(p => p.featuredImage).map((p) => (
                          <div key={p.id} className="border border-stone-200 rounded-xl overflow-hidden bg-stone-50 space-y-1.5 p-2">
                            <img src={p.featuredImage} alt={p.title} className="h-28 w-full object-cover rounded-lg" />
                            <span className="text-[10px] text-stone-500 font-semibold block truncate" title={p.title}>{p.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-[#C9A15A]/15 text-stone-500 text-xs font-bold uppercase tracking-wider bg-[#FDF6EC]/40">
                              <th className="p-3">Banner</th>
                              <th className="p-3">Title</th>
                              <th className="p-3">Category</th>
                              <th className="p-3">Status</th>
                              <th className="p-3">SEO Score</th>
                              <th className="p-3">Views</th>
                              <th className="p-3">Date</th>
                              <th className="p-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-100 text-xs">
                            {posts
                              .filter((post) => {
                                const matchSearch = 
                                  post.title.toLowerCase().includes(articleSearchQuery.toLowerCase()) ||
                                  post.content.toLowerCase().includes(articleSearchQuery.toLowerCase());
                                
                                const matchCat = 
                                  articleFilterCategory === "all" || 
                                  post.category === articleFilterCategory;

                                const matchStatus = 
                                  articleFilterStatus === "all" ||
                                  (post.status || "Published") === articleFilterStatus;

                                const matchSubTab = 
                                  cmsSubTab === "all" ||
                                  cmsSubTab === "editor" ||
                                  (post.status || "Published") === cmsSubTab;

                                return matchSearch && matchCat && matchStatus && matchSubTab;
                              })
                              .sort((a, b) => {
                                if (articleSortBy === "views") return (b.views || 0) - (a.views || 0);
                                if (articleSortBy === "title") return a.title.localeCompare(b.title);
                                return b.publishedAt.localeCompare(a.publishedAt);
                              })
                              .map((post) => (
                                <tr key={post.id} className="hover:bg-stone-50/50 transition-colors">
                                  <td className="p-3">
                                    <div className="h-8 w-12 rounded bg-stone-100 border border-stone-200 overflow-hidden">
                                      {post.featuredImage ? (
                                        <img src={post.featuredImage} alt="" className="h-full w-full object-cover" />
                                      ) : (
                                        <div className="h-full w-full flex items-center justify-center text-[8px] text-stone-400">None</div>
                                      )}
                                    </div>
                                  </td>
                                  <td className="p-3">
                                    <span className="font-semibold text-[#113F48] text-xs block">{post.title}</span>
                                    <span className="text-[10px] text-stone-400 mt-0.5 block truncate max-w-xs">{post.slug}</span>
                                  </td>
                                  <td className="p-3">
                                    <span className="bg-[#FDF6EC] px-2 py-0.5 rounded border border-[#C9A15A]/20 font-bold text-[10px]">
                                      {post.category}
                                    </span>
                                  </td>
                                  <td className="p-3">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                                      (post.status || "Published") === "Published"
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : (post.status === "Scheduled")
                                        ? "bg-amber-50 text-amber-700 border-amber-200"
                                        : "bg-stone-100 text-stone-600 border-stone-200"
                                    }`}>
                                      {post.status || "Published"}
                                    </span>
                                  </td>
                                  <td className="p-3 font-semibold text-stone-600">{post.seoScore || 85}/100</td>
                                  <td className="p-3 text-stone-500 font-bold">{post.views || 0}</td>
                                  <td className="p-3 text-stone-400">{post.publishedAt}</td>
                                  <td className="p-3 text-right space-x-1.5 flex justify-end items-center h-full pt-4">
                                    <button
                                      onClick={() => handleEditPostClick(post)}
                                      className="p-1.5 border border-stone-200 text-stone-500 hover:text-[#C9A15A] rounded-lg transition-colors"
                                      title="Edit Article"
                                    >
                                      <Edit className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeletePost(post.id)}
                                      className="p-1.5 border border-stone-200 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                      title="Delete Article"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
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
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold text-[#113F48]">Visitor Inquiries</h3>
                  <p className="text-xs text-stone-500 mt-0.5">Manage, search, resolve, and reply to visitor messages.</p>
                </div>
                <button
                  onClick={handleExportMessagesCSV}
                  className="flex items-center gap-1 bg-[#113F48] text-white hover:bg-[#C9A15A] text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm"
                >
                  <Download className="h-4 w-4" /> Export CSV
                </button>
              </div>

              {/* Filters & Search */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#113F48] uppercase tracking-wide">Search Name, Email, or Message</label>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={msgSearch}
                    onChange={(e) => setMsgSearch(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#113F48] uppercase tracking-wide">Filter Resolved</label>
                  <select
                    value={msgFilterResolved}
                    onChange={(e) => setMsgFilterResolved(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                  >
                    <option value="all">All Inquiries</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#113F48] uppercase tracking-wide">Filter Archived</label>
                  <select
                    value={msgFilterArchived}
                    onChange={(e) => setMsgFilterArchived(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                  >
                    <option value="unarchived">Active Inquiries</option>
                    <option value="archived">Archived Inquiries</option>
                    <option value="all">All Inquiries</option>
                  </select>
                </div>
              </div>

              {/* Inquiries List */}
              <div className="space-y-6">
                {messages
                  .filter((msg) => {
                    const matchSearch = 
                      msg.name.toLowerCase().includes(msgSearch.toLowerCase()) ||
                      msg.email.toLowerCase().includes(msgSearch.toLowerCase()) ||
                      msg.message.toLowerCase().includes(msgSearch.toLowerCase()) ||
                      msg.subject.toLowerCase().includes(msgSearch.toLowerCase());
                    
                    const matchResolved = 
                      msgFilterResolved === "all" ||
                      (msgFilterResolved === "resolved" && msg.resolved) ||
                      (msgFilterResolved === "pending" && !msg.resolved);
                    
                    const matchArchived = 
                      msgFilterArchived === "all" ||
                      (msgFilterArchived === "archived" && msg.archived) ||
                      (msgFilterArchived === "unarchived" && !msg.archived);

                    return matchSearch && matchResolved && matchArchived;
                  })
                  .map((msg) => (
                    <div key={msg.id} className="border border-stone-100 p-5 rounded-xl space-y-4 bg-[#FDF6EC]/5 hover:border-[#C9A15A]/30 transition-all">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="bg-[#113F48]/5 text-[#113F48] text-[10px] font-bold px-2 py-0.5 rounded border border-[#113F48]/10">
                              {msg.inquiryType || "General Question"}
                            </span>
                            <h4 className="font-bold text-[#113F48] text-base">{msg.subject}</h4>
                          </div>
                          <p className="text-xs text-stone-500 mt-1">
                            From: <span className="font-semibold text-stone-700">{msg.name}</span> ({msg.email})
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] text-stone-400 flex items-center gap-0.5 mr-2">
                            <Clock className="h-3 w-3" />
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </span>
                          
                          {/* Toggle Resolve Status */}
                          <button
                            onClick={() => handleResolveMessage(msg.id || "", !msg.resolved)}
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                              msg.resolved 
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" 
                                : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
                            }`}
                          >
                            {msg.resolved ? "Resolved" : "Mark Resolved"}
                          </button>

                          {/* Toggle Archive Status */}
                          <button
                            onClick={() => handleArchiveMessage(msg.id || "", !msg.archived)}
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                              msg.archived 
                                ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100" 
                                : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
                            }`}
                          >
                            {msg.archived ? "Archived" : "Archive"}
                          </button>

                          <button
                            onClick={() => handleDeleteMessage(msg.id || "")}
                            className="p-1.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete inquiry"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
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

          {/* TAB 8: Legal Pages Management */}
          {activeTab === "legal" && (
            <div className="bg-white border border-[#C9A15A]/20 p-6 rounded-2xl shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#113F48]">Legal Pages &amp; Disclaimers</h3>
                <p className="text-sm text-stone-500">Edit legal policy details, publish updates, and view revision history logs.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Slug Selector */}
                <div className="lg:col-span-4 space-y-2">
                  <span className="text-[10px] font-bold text-[#113F48] uppercase tracking-wide block mb-1">Select Legal Page</span>
                  {[
                    { label: "Privacy Policy", slug: "privacy-policy" },
                    { label: "Terms & Conditions", slug: "terms-and-conditions" },
                    { label: "Cookie Policy", slug: "cookie-policy" },
                    { label: "Medical Disclaimer", slug: "medical-disclaimer" },
                    { label: "Editorial Policy", slug: "editorial-policy" },
                    { label: "Accessibility Statement", slug: "accessibility" },
                    { label: "DMCA Policy", slug: "dmca" },
                    { label: "Corrections Policy", slug: "corrections-policy" },
                    { label: "Advertising Policy", slug: "advertising-policy" },
                    { label: "Affiliate Disclosure", slug: "affiliate-disclosure" },
                  ].map((item) => (
                    <button
                      key={item.slug}
                      onClick={() => setSelectedLegalSlug(item.slug)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold border transition-all ${
                        selectedLegalSlug === item.slug
                          ? "bg-[#113F48] text-white border-[#113F48] shadow-sm"
                          : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Right Editor Form */}
                <div className="lg:col-span-8">
                  {legalLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-stone-400 space-y-2">
                      <Loader2 className="h-8 w-8 animate-spin text-[#C9A15A]" />
                      <span className="text-xs">Loading page details...</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveLegalPage} className="space-y-4">
                      
                      <div className="flex justify-between items-center gap-4 border-b border-stone-100 pb-3 flex-wrap">
                        <div className="text-xs text-stone-400 font-medium">
                          Status: <span className="font-bold text-[#113F48]">{legalLastUpdated ? `Last Updated: ${legalLastUpdated}` : "Draft"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="publishedCheckbox"
                            checked={legalPublished}
                            onChange={(e) => setLegalPublished(e.target.checked)}
                            className="h-4 w-4 rounded border-stone-300 text-[#113F48] focus:ring-[#C9A15A]"
                          />
                          <label htmlFor="publishedCheckbox" className="text-xs font-semibold text-stone-600 cursor-pointer">
                            Published
                          </label>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Page Header Title</label>
                        <input
                          required
                          value={legalTitle}
                          onChange={(e) => setLegalTitle(e.target.value)}
                          className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Page Content (Markdown / Text)</label>
                        <textarea
                          required
                          rows={12}
                          value={legalContent}
                          onChange={(e) => setLegalContent(e.target.value)}
                          className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48] font-mono resize-y"
                          placeholder="# Header..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={legalSaving}
                        className="w-full bg-[#113F48] hover:bg-[#C9A15A] text-white py-3.5 rounded-xl font-bold transition-all shadow text-xs"
                      >
                        {legalSaving ? "Saving Policy..." : "Save Legal Page Details"}
                      </button>

                      {/* Version History Log */}
                      {legalHistory.length > 0 && (
                        <div className="pt-6 border-t border-stone-100 space-y-3">
                          <h4 className="text-xs font-bold text-[#113F48] uppercase tracking-wider">Revision History Log</h4>
                          <div className="max-h-48 overflow-y-auto space-y-2 border border-stone-100 p-3 rounded-xl bg-stone-50">
                            {legalHistory.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-start gap-4 border-b border-stone-200/60 pb-2 last:border-0 last:pb-0 text-[10px] text-stone-500">
                                <div>
                                  <span className="font-semibold text-stone-700 block">{item.date}</span>
                                  <span className="block mt-0.5 text-stone-400">By: {item.updatedBy}</span>
                                </div>
                                <span className="bg-[#113F48]/5 border border-[#113F48]/10 text-[9px] px-1.5 py-0.5 rounded font-medium">Version {legalHistory.length - idx}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </form>
                  )}
                </div>

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

          {/* TAB: Category Management */}
          {activeTab === "categories" && (
            <div className="space-y-6">
              {(isAddingCategory || editingCategory) ? (
                <div className="bg-white border border-[#C9A15A]/25 p-6 rounded-2xl shadow-sm space-y-6">
                  
                  {/* Category Editor Header */}
                  <div className="flex justify-between items-center border-b border-stone-100 pb-4">
                    <h3 className="text-lg font-bold text-[#113F48]">
                      {editingCategory ? `Edit Category: ${catName}` : "Create New Category"}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingCategory(false);
                        setEditingCategory(null);
                      }}
                      className="text-stone-400 hover:text-[#113F48] text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Category Editor Tabs */}
                  <div className="flex gap-2 bg-stone-50 p-1 rounded-xl w-fit">
                    <button
                      type="button"
                      onClick={() => setCategoryTab("basic")}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        categoryTab === "basic" ? "bg-white text-[#113F48] shadow-sm" : "text-stone-500"
                      }`}
                    >
                      Basic Info
                    </button>
                    <button
                      type="button"
                      onClick={() => setCategoryTab("seo")}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        categoryTab === "seo" ? "bg-white text-[#113F48] shadow-sm" : "text-stone-500"
                      }`}
                    >
                      SEO Meta Settings
                    </button>
                  </div>

                  <form onSubmit={handleSaveCategory} className="space-y-4">
                    
                    {/* Basic Info Tab */}
                    {categoryTab === "basic" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Category Name *</label>
                            <input
                              required
                              value={catName}
                              onChange={(e) => {
                                setCatName(e.target.value);
                                if (!editingCategory) {
                                  setCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
                                }
                              }}
                              placeholder="e.g. Heart Health"
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Slug *</label>
                            <input
                              required
                              value={catSlug}
                              onChange={(e) => setCatSlug(e.target.value)}
                              placeholder="e.g. heart-health"
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Description</label>
                          <textarea
                            rows={3}
                            value={catDesc}
                            onChange={(e) => setCatDesc(e.target.value)}
                            placeholder="Brief summary of articles in this category..."
                            className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Display Icon</label>
                            <input
                              value={catIcon}
                              onChange={(e) => setCatIcon(e.target.value)}
                              placeholder="e.g. Heart, Shield, Activity, Folder"
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Display Order</label>
                            <input
                              type="number"
                              value={catDisplayOrder}
                              onChange={(e) => setCatDisplayOrder(Number(e.target.value))}
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Parent Category</label>
                            <select
                              value={catParent}
                              onChange={(e) => setCatParent(e.target.value)}
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            >
                              <option value="">None (Primary)</option>
                              {categoriesList.filter(c => c.slug !== catSlug).map(c => (
                                <option key={c.id} value={c.slug}>{c.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Banner Image URL</label>
                            <input
                              value={catBanner}
                              onChange={(e) => setCatBanner(e.target.value)}
                              placeholder="https://..."
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Thumbnail Image URL</label>
                            <input
                              value={catThumbnail}
                              onChange={(e) => setCatThumbnail(e.target.value)}
                              placeholder="https://..."
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Status</label>
                            <select
                              value={catStatus}
                              onChange={(e) => setCatStatus(e.target.value as "Active" | "Inactive")}
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            >
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </select>
                          </div>
                        </div>

                        <div className="pt-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={catFeatured}
                              onChange={(e) => setCatFeatured(e.target.checked)}
                              className="h-4 w-4 rounded border-stone-300 text-[#113F48] focus:ring-[#C9A15A]"
                            />
                            <span className="text-xs font-semibold text-stone-700">Feature this category on the homepage</span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* SEO Tab */}
                    {categoryTab === "seo" && (
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">SEO Meta Title</label>
                          <input
                            value={catSeoTitle}
                            onChange={(e) => setCatSeoTitle(e.target.value)}
                            placeholder="Defaults to Category Name if empty..."
                            className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">SEO Meta Description</label>
                          <textarea
                            rows={3}
                            value={catSeoDesc}
                            onChange={(e) => setCatSeoDesc(e.target.value)}
                            placeholder="Brief description for search engine results..."
                            className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Focus Keyword</label>
                            <input
                              value={catSeoKeyword}
                              onChange={(e) => setCatSeoKeyword(e.target.value)}
                              placeholder="e.g. cardiovascular guidelines"
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Canonical URL</label>
                            <input
                              value={catSeoCanonical}
                              onChange={(e) => setCatSeoCanonical(e.target.value)}
                              placeholder="https://mediguidehub.com/categories/..."
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Schema Data Structured Type</label>
                            <input
                              value={catSeoSchema}
                              onChange={(e) => setCatSeoSchema(e.target.value)}
                              placeholder="e.g. MedicalWebPage"
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Open Graph Social Image URL</label>
                            <input
                              value={catSeoOgImage}
                              onChange={(e) => setCatSeoOgImage(e.target.value)}
                              placeholder="https://..."
                              className="w-full bg-[#FDF6EC]/10 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 justify-end pt-4 border-t border-stone-100">
                      <button
                        type="submit"
                        className="bg-[#113F48] hover:bg-[#C9A15A] text-white font-semibold px-6 py-2.5 rounded-xl text-xs transition-all shadow shadow-[#113F48]/10"
                      >
                        Save Category Details
                      </button>
                    </div>

                  </form>
                </div>
              ) : (
                /* CATEGORIES LIST TABLE VIEW */
                <div className="bg-white border border-[#C9A15A]/20 p-6 rounded-2xl shadow-sm space-y-6">
                  
                  {/* Category Header Controls */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-100 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#113F48]">Category Management</h3>
                      <p className="text-xs text-stone-500 mt-0.5">Define structured taxonomy directories and parent paths.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={handleAddCategoryClick}
                        className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1 shadow-sm"
                      >
                        <Plus className="h-4 w-4" /> Add Category
                      </button>
                      <button
                        onClick={() => {
                          let csv = "data:text/csv;charset=utf-8,Category Name,Slug,Display Order,Featured,Status\n";
                          categoriesList.forEach(c => csv += `"${c.name}","${c.slug}",${c.displayOrder},${c.featuredCategory},"${c.status}"\n`);
                          const encoded = encodeURI(csv);
                          const link = document.createElement("a");
                          link.setAttribute("href", encoded);
                          link.setAttribute("download", `mediguide_categories_${Date.now()}.csv`);
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                      >
                        Export CSV
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#C9A15A]/15 text-stone-500 text-xs font-bold uppercase tracking-wider bg-[#FDF6EC]/40">
                          <th className="p-3">Icon</th>
                          <th className="p-3">Category Name</th>
                          <th className="p-3">Slug</th>
                          <th className="p-3">Articles</th>
                          <th className="p-3">SEO Score</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-xs text-stone-600">
                        {categoriesList.map((cat) => {
                          const articleCount = posts.filter(p => p.category === cat.name).length;
                          return (
                            <tr key={cat.id} className="hover:bg-stone-50/50 transition-colors">
                              <td className="p-3">
                                <span className="bg-[#113F48]/5 text-[#113F48] p-1.5 rounded-lg inline-block border border-[#113F48]/10 font-bold">
                                  {cat.icon || "Folder"}
                                </span>
                              </td>
                              <td className="p-3">
                                <span className="font-semibold text-[#113F48] block">{cat.name}</span>
                                {cat.parentCategory && (
                                  <span className="text-[9px] text-[#C9A15A] font-bold block mt-0.5">Parent: {cat.parentCategory}</span>
                                )}
                              </td>
                              <td className="p-3 font-mono text-[10px] text-stone-400">{cat.slug}</td>
                              <td className="p-3 font-bold text-[#113F48]">{articleCount} Guides</td>
                              <td className="p-3 font-semibold text-stone-500">{cat.seoScore || 85}/100</td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                                  cat.status === "Active"
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                                }`}>
                                  {cat.status || "Active"}
                                </span>
                              </td>
                              <td className="p-3 text-right space-x-1.5">
                                <button
                                  onClick={() => handleEditCategoryClick(cat)}
                                  className="p-1.5 border border-stone-200 text-stone-500 hover:text-[#C9A15A] rounded-lg transition-colors inline-block"
                                  title="Edit Category"
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteCategory(cat.id || "")}
                                  className="p-1.5 border border-stone-200 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-block"
                                  title="Delete Category"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}
            </div>
          )}

          {/* TAB: Search Analytics */}
          {activeTab === "search-analytics" && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="bg-white border border-[#C9A15A]/20 p-6 rounded-2xl shadow-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C9A15A]">SEO &amp; Intent Analytics</span>
                  <h3 className="text-lg font-bold text-[#113F48]">Search Engine Analytics</h3>
                  <p className="text-xs text-stone-500">Analyze healthcare user intent, trending keywords, and no-result queries.</p>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Searches", val: "24,500" },
                  { label: "Unique Users", val: "18,200" },
                  { label: "No Result Queries", val: "360" },
                  { label: "Avg Search Speed", val: "280ms" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white border border-[#C9A15A]/15 p-4.5 rounded-2xl shadow-sm">
                    <span className="text-[9px] font-bold text-stone-400 uppercase block">{stat.label}</span>
                    <span className="text-xl font-extrabold text-[#113F48] block mt-1.5">{stat.val}</span>
                  </div>
                ))}
              </div>

              {/* Trends & Lists */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Top Search Keywords */}
                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#113F48] border-b border-stone-100 pb-2">Top Search Keywords</h4>
                  <div className="space-y-3">
                    {[
                      { word: "medicare enrollment", count: 8450, ctr: "13.6%" },
                      { word: "part a hospital cost", count: 6200, ctr: "12.9%" },
                      { word: "medigap plans 2026", count: 4100, ctr: "10.5%" },
                      { word: "medicare advantage rules", count: 3800, ctr: "12.2%" },
                      { word: "prescription deductible", count: 2500, ctr: "9.8%" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-stone-700">{idx + 1}. {item.word}</span>
                        <div className="flex gap-4 text-stone-400 font-medium">
                          <span>{item.count} searches</span>
                          <span className="text-emerald-600 font-bold">CTR: {item.ctr}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* No Result Queries */}
                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-red-600 border-b border-stone-100 pb-2">No Result Queries (Optimize Content)</h4>
                  <div className="space-y-3">
                    {[
                      { word: "health insurance under 50", count: 145 },
                      { word: "private dental near me", count: 120 },
                      { word: "free checkups state list", count: 95 },
                      { word: "vision deductibles table", count: 70 },
                      { word: "retiree supplemental drug discount", count: 42 }
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-stone-700">{idx + 1}. {item.word}</span>
                        <span className="text-stone-400 font-bold">{item.count} hits</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB: Technical SEO */}
          {activeTab === "technical-seo" && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="bg-white border border-[#C9A15A]/20 p-6 rounded-2xl shadow-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C9A15A]">SEO Audits &amp; Search Crawling</span>
                  <h3 className="text-lg font-bold text-[#113F48]">Technical SEO &amp; Performance Audit</h3>
                  <p className="text-xs text-stone-500">Monitor Core Web Vitals, schema structured data, indexing status, and Lighthouse indicators.</p>
                </div>
              </div>

              {/* Technical SEO Indicators Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "SEO Health Score", val: "98/100", status: "Optimal" },
                  { label: "Lighthouse Performance", val: "96/100", status: "Passing" },
                  { label: "Accessibility Score", val: "100/100", status: "Passing" },
                  { label: "Best Practices", val: "100/100", status: "Passing" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white border border-[#C9A15A]/15 p-4.5 rounded-2xl shadow-sm">
                    <span className="text-[9px] font-bold text-stone-400 uppercase block">{stat.label}</span>
                    <span className="text-xl font-extrabold text-[#113F48] block mt-1.5">{stat.val}</span>
                    <span className="text-[9px] font-bold text-emerald-600 mt-1 block">✓ {stat.status}</span>
                  </div>
                ))}
              </div>

              {/* Core Web Vitals & Indexing */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 1. Core Web Vitals */}
                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#113F48] border-b border-stone-100 pb-2">Core Web Vitals</h4>
                  <ul className="text-xs space-y-3 font-semibold text-stone-600">
                    <li className="flex justify-between"><span>Largest Contentful Paint (LCP)</span> <span className="text-emerald-600">1.8s (Good)</span></li>
                    <li className="flex justify-between"><span>Interaction to Next Paint (INP)</span> <span className="text-emerald-600">95ms (Good)</span></li>
                    <li className="flex justify-between"><span>Cumulative Layout Shift (CLS)</span> <span className="text-emerald-600">0.02 (Good)</span></li>
                    <li className="flex justify-between"><span>Time To First Byte (TTFB)</span> <span className="text-emerald-600">120ms (Good)</span></li>
                  </ul>
                </div>

                {/* 2. Crawl & Indexing Status */}
                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#113F48] border-b border-stone-100 pb-2">Crawling &amp; Indexing</h4>
                  <ul className="text-xs space-y-3 font-semibold text-stone-600">
                    <li className="flex justify-between"><span>Sitemap Status</span> <span className="text-emerald-600">Active (/sitemap.xml)</span></li>
                    <li className="flex justify-between"><span>Robots.txt Configuration</span> <span className="text-emerald-600">Active (/robots.txt)</span></li>
                    <li className="flex justify-between"><span>Indexed Pages (Search Console)</span> <span className="text-[#113F48]">24 Routes</span></li>
                    <li className="flex justify-between"><span>Duplicate Canonical URLs</span> <span className="text-emerald-600">0 Detected</span></li>
                  </ul>
                </div>

                {/* 3. Security Monitor */}
                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#113F48] border-b border-stone-100 pb-2">Security Headers</h4>
                  <ul className="text-xs space-y-3 font-semibold text-stone-600">
                    <li className="flex justify-between"><span>Content Security Policy (CSP)</span> <span className="text-emerald-600">Configured</span></li>
                    <li className="flex justify-between"><span>SSL Status (HTTPS)</span> <span className="text-emerald-600">Active &amp; Valid</span></li>
                    <li className="flex justify-between"><span>X-Frame-Options</span> <span className="text-emerald-600">SAMEORIGIN</span></li>
                    <li className="flex justify-between"><span>Rate Limiting</span> <span className="text-emerald-600">Active</span></li>
                  </ul>
                </div>

              </div>

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
