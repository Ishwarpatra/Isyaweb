import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  Users,
  FileText,
  BarChart2,
  Settings,
  CheckCircle,
  XCircle,
  ShieldAlert,
  Globe,
  Youtube,
  Menu,
  X,
  ShieldX,
  Activity,
  ChevronRight,
  Search,
  Undo2,
  Trash2,
  Lock,
  Home,
} from "lucide-react";
import {
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import logoImg from "../../imports/Logo_ISYA__1_-2.jpeg";
import { useAuth } from "../hooks/useAuth";
import { useScrollLock } from "../hooks/useScrollLock";
import { getInitials } from "./CommunityPage";
import { toast } from "sonner";
import { mockDb } from "../utils/mockDb";

const NAV_ITEMS = [
  { id: "dashboard", label: "MISSION_CONTROL", icon: BarChart2 },
  { id: "analytics", label: "TELEMETRY_DATA", icon: Activity },
  { id: "users", label: "AGENT_DOSSIERS", icon: Users },
  { id: "content", label: "TRANSMISSION_LOG", icon: FileText },
  { id: "settings", label: "SYS_CONFIG", icon: Settings },
];

const INITIAL_PENDING_USERS = [
  { id: 1, name: "Emma Wilson", email: "emma@example.com", country: "🇬🇧", region: "EU-WEST", date: "2026-05-18", interest: "ASTROPHYSICS" },
  { id: 2, name: "Kwame Asante", email: "kwame@example.com", country: "🇬🇭", region: "AF-WEST", date: "2026-05-17", interest: "AEROSPACE_ENG" },
  { id: 3, name: "Mia Hoffmann", email: "mia@example.com", country: "🇩🇪", region: "EU-CENT", date: "2026-05-17", interest: "DATA_SCIENCE" },
  { id: 4, name: "Ryo Inoue", email: "ryo@example.com", country: "🇯🇵", region: "AS-EAST", date: "2026-05-16", interest: "RADIO_ASTRO" },
];

const STATS = [
  { label: "ACTIVE_AGENTS", value: "8,412", change: "+124", period: "THIS_CYCLE", icon: Users, color: "#EC4899" },
  { label: "LIVE_MISSIONS", value: "27", change: "+3", period: "THIS_WEEK", icon: Globe, color: "#3B82F6" },
  { label: "TRANSMISSIONS", value: "184", change: "+7", period: "THIS_CYCLE", icon: FileText, color: "#8B5CF6" },
  { label: "SIGNAL_REACH", value: "96.4K", change: "+12%", period: "THIS_CYCLE", icon: Youtube, color: "#10B981" },
];

const MEMBER_GROWTH = [
  { month: "DEC", members: 6200 },
  { month: "JAN", members: 6800 },
  { month: "FEB", members: 7100 },
  { month: "MAR", members: 7500 },
  { month: "APR", members: 7900 },
  { month: "MAY", members: 8412 },
];

const SPECIALIZATION_DATA = [
  { subject: "ASTROPHYSICS", A: 85 },
  { subject: "AEROSPACE", A: 72 },
  { subject: "DATA_SCI", A: 63 },
  { subject: "RADIO_ASTRO", A: 58 },
  { subject: "CUBESAT", A: 78 },
  { subject: "ASTROBIO", A: 45 },
];

interface Agent {
  id: number;
  name: string;
  email: string;
  role: string;
  region: string;
  status: string;
  isDeleted?: boolean;
}

// Expanded Mock Active Agents Dossiers
const REGISTERED_AGENTS: Agent[] = [
  { id: 101, name: "Sarah Chen", email: "sarah@isya.space", role: "ASTROPHYSICIST", region: "US-EAST", status: "ACTIVE" },
  { id: 102, name: "David Osei", email: "david@isya.space", role: "RESEARCH_FELLOW", region: "AF-WEST", status: "ACTIVE" },
  { id: 103, name: "Yuki Tanaka", email: "yuki@isya.space", role: "RADIO_ASTRONOMER", region: "AS-EAST", status: "ACTIVE" },
  { id: 104, name: "Amara Diallo", email: "amara@isya.space", role: "SCI_COMMUNICATOR", region: "AF-WEST", status: "SUSPENDED" },
  { id: 105, name: "Luis Reyes", email: "luis@isya.space", role: "AEROSPACE_ENG", region: "LA-CENT", status: "ACTIVE" },
  { id: 106, name: "Fatima Al-Rashid", email: "fatima@isya.space", role: "SPACE_POLICY", region: "ME-EAST", status: "ACTIVE" },
];

function TelemetryTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="p-3 bg-gray-900/95 border border-pink-500/20 rounded-lg font-mono text-xs text-gray-400">
      <p className="text-pink-500 mb-1 tracking-widest">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name.toUpperCase()}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

function AccessDenied({ onVerify }: { onVerify: (passcode: string) => void }) {
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) {
      setErrorMsg("CLEARANCE PASSCODE IS REQUIRED");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      inputRef.current?.focus();
      return;
    }

    onVerify(passcode);

    if (passcode !== "ISYA-ADMIN-KEY-2026") {
      setErrorMsg("DECRYPTION ERROR: SECURITY CLEARANCE BYPASS REJECTED.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05080F]">
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(239,68,68,0.015)_3px,rgba(239,68,68,0.015)_6px)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none animate-pulse-glow bg-red-500/5 blur-[150px]" />

      <div className="relative z-10 text-center px-4 w-full max-w-md">
        <div className="inline-flex flex-col items-center p-8 rounded-2xl bg-gray-900/60 backdrop-blur-2xl border border-red-500/20 shadow-2xl relative w-full">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-500 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-500 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-500 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-500 rounded-br-lg" />

          <ShieldX size={52} className="mb-5 text-red-500" />
          <div className="font-mono text-xs text-red-500 tracking-[0.2em] mb-3">
            INCIDENT_LOG :: EVENT_ID_42691
          </div>
          <h1 className="font-mono text-2xl font-bold text-red-500 tracking-wider mb-2">
            ACCESS DENIED
          </h1>
          <div className="font-mono text-xs text-gray-500 tracking-widest mb-6">
            // INCIDENT LOGGED // SECTOR: ADMIN_PORTAL
          </div>
          <p className="text-gray-400 text-xs leading-relaxed mb-6">
            Clearence level 5 is required. Enter override passcode key to decrypt sector:
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className={`relative ${isShaking ? "animate-shake" : ""}`}>
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500/60" />
              <input
                ref={inputRef}
                type="password"
                placeholder="OVERRIDE_PASSCODE_KEY"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                aria-invalid={!!errorMsg}
                aria-describedby={errorMsg ? "passcode-error" : undefined}
                className={`w-full pl-9 pr-4 py-2.5 font-mono text-xs text-white bg-black/80 border rounded-lg outline-none transition-colors text-center ${
                  errorMsg ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-red-500/30 focus:border-red-500"
                }`}
              />
            </div>
            {errorMsg && (
              <p id="passcode-error" role="alert" className="text-red-500 font-mono text-[10px] tracking-wider text-center mt-1">
                {errorMsg}
              </p>
            )}
            <button
              type="submit"
              className="w-full px-8 py-3 rounded-xl font-mono text-xs font-bold tracking-widest text-red-500 bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 transition-all cursor-pointer animate-live-pulse"
            >
              SUBMIT_CLEARANCE_CODE
            </button>
          </form>

          <Link
            to="/"
            className="block mt-6 font-mono text-xs text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            ← RETURN_TO_BASE_TERMINAL
          </Link>
        </div>
      </div>
    </div>
  );
}

export function AdminPage() {
  const { user, isAdmin } = useAuth();
  
  // Sub-tab state
  const [contentSubTab, setContentSubTab] = useState<"log" | "webinar" | "faq" | "podcast" | "announcement">("log");

  // Webinar Form States
  const [webinarTitle, setWebinarTitle] = useState("");
  const [webinarDate, setWebinarDate] = useState("");
  const [webinarImage, setWebinarImage] = useState("");
  const [webinarVideoUrl, setWebinarVideoUrl] = useState("");
  const [webinarDesc, setWebinarDesc] = useState("");

  // FAQ Form States
  const [faqCategory, setFaqCategory] = useState<"GENERAL" | "MEMBERSHIP" | "COMMUNITY" | "ADMIN" | "MENTORSHIP">("GENERAL");
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");

  // Podcast Form States
  const [podcastTitle, setPodcastTitle] = useState("");
  const [podcastEpisode, setPodcastEpisode] = useState("");
  const [podcastGuest, setPodcastGuest] = useState("");
  const [podcastDuration, setPodcastDuration] = useState("");
  const [podcastDate, setPodcastDate] = useState("");
  const [podcastFreq, setPodcastFreq] = useState("98.6 MHz");

  // Announcement Form States
  const [annTitle, setAnnTitle] = useState("");
  const [annContent, setAnnContent] = useState("");
  const [annStatus, setAnnStatus] = useState<"DRAFT" | "PUBLISHED" | "ARCHIVED">("PUBLISHED");

  const handleAddWebinar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!webinarTitle || !webinarDate || !webinarVideoUrl || !webinarDesc) {
      toast.error("Please fill in all required webinar details.");
      return;
    }
    const defaultImg = "https://images.unsplash.com/photo-1476156863127-a8f1e9dba2b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
    mockDb.addWebinar({
      title: webinarTitle,
      date: webinarDate,
      image: webinarImage || defaultImg,
      videoUrl: webinarVideoUrl,
      description: webinarDesc,
      createdBy: user?.email || "admin@isya.space",
    });
    addAuditLog(`NEW_WEBINAR_ADDED // TITLE: ${webinarTitle}`);
    toast.success("Webinar added successfully!");
    setWebinarTitle("");
    setWebinarDate("");
    setWebinarImage("");
    setWebinarVideoUrl("");
    setWebinarDesc("");
  };

  const handleAddFAQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion || !faqAnswer) {
      toast.error("Please provide both a question and an answer.");
      return;
    }
    mockDb.addFAQ({
      category: faqCategory,
      question: faqQuestion,
      answer: faqAnswer,
      createdBy: user?.email || "admin@isya.space",
      updatedAt: new Date().toISOString().split("T")[0],
    });
    addAuditLog(`NEW_FAQ_ADDED // CATEGORY: ${faqCategory} // QUESTION: ${faqQuestion}`);
    toast.success("FAQ added successfully!");
    setFaqQuestion("");
    setFaqAnswer("");
  };

  const handleAddPodcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!podcastTitle || !podcastEpisode || !podcastGuest || !podcastDuration || !podcastDate) {
      toast.error("Please fill in all required podcast fields.");
      return;
    }
    mockDb.addPodcast({
      title: podcastTitle,
      episode: podcastEpisode,
      guest: podcastGuest,
      duration: podcastDuration,
      date: podcastDate,
      freq: podcastFreq,
    });
    addAuditLog(`NEW_PODCAST_ADDED // EPISODE: ${podcastEpisode} // TITLE: ${podcastTitle}`);
    toast.success("Podcast episode added successfully!");
    setPodcastTitle("");
    setPodcastEpisode("");
    setPodcastGuest("");
    setPodcastDuration("");
    setPodcastDate("");
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) {
      toast.error("Please complete the announcement title and body content.");
      return;
    }
    mockDb.addAnnouncement({
      title: annTitle,
      content: annContent,
      status: annStatus,
      scheduledDate: new Date().toISOString().split("T")[0],
      createdBy: user?.email || "admin@isya.space",
    });
    addAuditLog(`NEW_ANNOUNCEMENT_ADDED // STATUS: ${annStatus} // TITLE: ${annTitle}`);
    toast.success("Announcement created successfully!");
    setAnnTitle("");
    setAnnContent("");
  };
  
  // States
  const [accessGranted, setAccessGranted] = useState(() => {
    return sessionStorage.getItem("isya_admin_decrypted") === "true";
  });
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingUsers, setPendingUsers] = useState(INITIAL_PENDING_USERS);
  const [registeredAgents, setRegisteredAgents] = useState<Agent[]>(REGISTERED_AGENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [auditLogs, setAuditLogs] = useState<string[]>(() => {
    const stored = sessionStorage.getItem("isya_audit_logs");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {}
    }
    return [
      "System log initialized at epoch 2026-05-26T20:42:11.",
      "Websocket telemetry client connected.",
      "Security firewall running in ENFORCED mode.",
    ];
  });

  const sidebarRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  // Feature flag settings state
  const [flags, setFlags] = useState(() => {
    const stored = localStorage.getItem("isya_sys_flags");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {}
    }
    return {
      VITE_ENABLE_ADMIN_PANEL: true,
      VITE_ENABLE_COMMUNITY_FEATURES: true,
      VITE_ENVIRONMENT: "development",
    };
  });

  // Coordinate scroll locks
  useScrollLock(sidebarOpen);

  useEffect(() => {
    // Only apply focus trap on mobile screens where sidebar acts as modal overlay
    if (window.innerWidth >= 768) return;

    const mainEl = document.querySelector("main");
    const headerEl = document.querySelector("header");

    if (!sidebarOpen) {
      mainEl?.removeAttribute("aria-hidden");
      headerEl?.removeAttribute("aria-hidden");
      if (lastActiveElement.current) {
        lastActiveElement.current.focus();
        lastActiveElement.current = null;
      } else {
        menuButtonRef.current?.focus();
      }
      return;
    }

    lastActiveElement.current = document.activeElement as HTMLElement;
    mainEl?.setAttribute("aria-hidden", "true");
    headerEl?.setAttribute("aria-hidden", "true");

    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const getFocusable = () =>
      sidebar.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

    const focusable = getFocusable();
    if (focusable.length > 0) {
      focusable[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        return;
      }

      if (e.key === "Tab") {
        const elements = getFocusable();
        if (elements.length === 0) return;
        const firstEl = elements[0];
        const lastEl = elements[elements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            lastEl.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastEl) {
            firstEl.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      mainEl?.removeAttribute("aria-hidden");
      headerEl?.removeAttribute("aria-hidden");
    };
  }, [sidebarOpen]);

  const storedFlags = localStorage.getItem("isya_sys_flags");
  let adminEnabled = true;
  if (storedFlags) {
    try {
      const parsed = JSON.parse(storedFlags);
      if (parsed.VITE_ENABLE_ADMIN_PANEL === false) adminEnabled = false;
    } catch (e) {}
  }

  if (!adminEnabled) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-[#0B0F19] stardust relative">
        <div className="p-8 rounded-2xl border border-pink-500/20 bg-pink-500/5 max-w-xl mx-auto flex flex-col items-center gap-4 relative hud-corners">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-pink rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-brand-pink rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-brand-pink rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-pink rounded-br-lg" />
          
          <h2 className="text-white text-xl font-bold font-mono">// SECTOR_OFFLINE</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            The Admin command terminal has been disabled by system security flags.
          </p>
          <Link to="/" className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-pink-500/20 border border-pink-500/40 hover:bg-pink-500/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]">
            ← RETURN_TO_BASE_TERMINAL
          </Link>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05080F] stardust">
        <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(239,68,68,0.015)_3px,rgba(239,68,68,0.015)_6px)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none animate-pulse-glow bg-red-500/5 blur-[150px]" />

        <div className="relative z-10 text-center px-4 w-full max-w-sm">
          <div className="inline-flex flex-col items-center p-8 rounded-2xl bg-gray-900/60 backdrop-blur-2xl border border-red-500/20 shadow-2xl relative w-full hud-corners">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-500 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-500 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-500 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-500 rounded-br-lg" />

            <ShieldAlert size={52} className="mb-5 text-red-500 animate-[bounce_2s_infinite]" />
            <div className="font-mono text-xs text-red-500 tracking-[0.2em] mb-3">
              UNAUTHORIZED_SECTOR // CLASSIFIED
            </div>
            <h1 className="font-mono text-xl font-bold text-red-500 tracking-wider mb-2">
              ACCESS FORBIDDEN
            </h1>
            <p className="text-gray-400 text-xs leading-relaxed mb-6">
              You must be authenticated with an Admin account to access this command sector.
            </p>
            <Link
              to="/login"
              className="w-full px-8 py-3 rounded-xl font-mono text-xs font-bold tracking-widest text-center text-red-500 bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 transition-all cursor-pointer block"
            >
              AUTHENTICATE_CREW
            </Link>
            <Link
              to="/"
              className="block mt-4 font-mono text-xs text-gray-500 hover:text-white transition-colors cursor-pointer"
            >
              ← RETURN_TO_BASE_TERMINAL
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const addAuditLog = (msg: string) => {
    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19);
    const newEntry = `[${timestamp}] ${msg}`;
    setAuditLogs((prev) => {
      const updated = [newEntry, ...prev];
      sessionStorage.setItem("isya_audit_logs", JSON.stringify(updated));
      return updated;
    });
  };

  const handleVerifyPasscode = (code: string) => {
    if (code === "ISYA-ADMIN-KEY-2026") {
      setAccessGranted(true);
      sessionStorage.setItem("isya_admin_decrypted", "true");
      addAuditLog("Manual Admin Bypass Override successfully validated.");
      toast.success("CLEARANCE OVERRIDE KEY CORRECT. DECRYPTING PANEL.");
    } else {
      toast.error("INVALID PASSCODE KEY. CRITICAL ALARM TRIGGERED.");
      addAuditLog(`FAILED ACCESS OVERRIDE ATTEMPT: Incorrect key "${code}" entered.`);
    }
  };

  const handleApprove = (id: number) => {
    const target = pendingUsers.find((u) => u.id === id);
    if (!target) return;

    setPendingUsers((prev) => prev.filter((u) => u.id !== id));
    addAuditLog(`Cadet enlistment APPROVED: ${target.name} (${target.email})`);

    toast.success(`Agent ${target.name} approved.`, {
      action: {
        label: "Undo",
        onClick: () => {
          setPendingUsers((prev) => [...prev, target].sort((a, b) => a.id - b.id));
          addAuditLog(`Undo command: Enlistment approval cancelled for ${target.name}`);
          toast.info(`Enlistment request restored for ${target.name}`);
        },
      },
    });
  };

  const handleDeny = (id: number) => {
    const target = pendingUsers.find((u) => u.id === id);
    if (!target) return;

    setPendingUsers((prev) => prev.filter((u) => u.id !== id));
    addAuditLog(`Cadet enlistment DENIED: ${target.name} (${target.email})`);

    toast.error(`Agent ${target.name} enlistment request denied.`, {
      action: {
        label: "Undo",
        onClick: () => {
          setPendingUsers((prev) => [...prev, target].sort((a, b) => a.id - b.id));
          addAuditLog(`Undo command: Enlistment denial cancelled for ${target.name}`);
          toast.info(`Enlistment request restored for ${target.name}`);
        },
      },
    });
  };

  const handleDeleteAgent = (id: number, name: string) => {
    const target = registeredAgents.find((a) => a.id === id);
    if (!target) return;

    // Mark as deleted visually
    setRegisteredAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isDeleted: true } : a))
    );
    addAuditLog(`Active agent DELETED: ${target.name} (${target.email})`);

    // Permanent deletion timeout after 5 seconds (matching toast duration)
    const timerId = setTimeout(() => {
      setRegisteredAgents((prev) => prev.filter((a) => !(a.id === id && a.isDeleted)));
    }, 5000);

    toast.warning(`Agent ${name} deleted from databases.`, {
      action: {
        label: "Undo",
        onClick: () => {
          clearTimeout(timerId);
          setRegisteredAgents((prev) =>
            prev.map((a) => (a.id === id ? { ...a, isDeleted: false } : a))
          );
          addAuditLog(`Undo command: Agent deletion cancelled for ${name}`);
          toast.info(`Agent dossier restored for ${name}`);
        },
      },
    });
  };

  const toggleFlag = (key: keyof typeof flags) => {
    setFlags((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      addAuditLog(`System Config Flag updated: ${key} = ${updated[key]}`);
      toast.success(`Flag ${key} toggled.`);
      return updated;
    });
  };

  if (!accessGranted) {
    return <AccessDenied onVerify={handleVerifyPasscode} />;
  }

  // --- Sub-View Component Renders ---

  // 1. Dashboard View
  const renderDashboard = () => (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="p-5 rounded-2xl bg-gray-900/40 border border-white/5 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg" style={{ background: `${stat.color}15`, color: stat.color }}>
                  <stat.icon size={18} />
                </div>
                <span className="font-mono text-xs text-emerald-500">{stat.change}</span>
              </div>
              <p className="font-mono text-xs text-gray-500 tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5">
          <h4 className="font-mono text-xs text-pink-500 tracking-widest mb-6">// AGENT_GROWTH_CURVE</h4>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MEMBER_GROWTH}>
                <defs>
                  <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                {/* Corrected Y-axis support */}
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip content={<TelemetryTooltip />} />
                <Area type="monotone" dataKey="members" stroke="#EC4899" fillOpacity={1} fill="url(#colorMembers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5">
          <h4 className="font-mono text-xs text-blue-500 tracking-widest mb-6">// SPECIALIZATION_MATRIX</h4>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={SPECIALIZATION_DATA}>
                <PolarGrid stroke="#ffffff08" />
                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={9} />
                <Radar name="Agents" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.5} />
                <Tooltip content={<TelemetryTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pending Clearance requests table */}
      <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-mono text-xs text-orange-500 tracking-widest">// PENDING_CLEARANCE_REQUESTS</h4>
          <span className="font-mono text-xs text-gray-500">{pendingUsers.length} PENDING</span>
        </div>
        
        {pendingUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="pb-4 font-mono text-xs text-gray-500 tracking-widest">IDENTIFIER</th>
                  <th className="pb-4 font-mono text-xs text-gray-500 tracking-widest">SECTOR_INTEREST</th>
                  <th className="pb-4 font-mono text-xs text-gray-500 tracking-widest">TIMESTAMP</th>
                  <th className="pb-4 text-right font-mono text-xs text-gray-500 tracking-widest">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {pendingUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center font-mono text-xs text-gray-400">
                          {user.country}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{user.name}</p>
                          <p className="text-xs text-gray-500 font-mono">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="font-mono text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
                        {user.interest}
                      </span>
                    </td>
                    <td className="py-4 font-mono text-xs text-gray-500">{user.date}</td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleApprove(user.id)}
                          aria-label={`Approve ${user.name}`}
                          className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition-colors cursor-pointer"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button
                          onClick={() => handleDeny(user.id)}
                          aria-label={`Deny ${user.name}`}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-10 text-center font-mono text-xs text-gray-500">
            [✓] ALL_PENDING_ENLISTMENT_REQUESTS_CLEARED_
          </div>
        )}
      </div>
    </>
  );

  // 2. Analytics View
  const renderAnalytics = () => {
    const { faqViews, mentorBookings } = mockDb.getAnalyticsData();
    const faqs = mockDb.getFAQs();
    const mentors = mockDb.getMentors();

    const faqAnalytics = faqs
      .map(f => ({
        id: f.id,
        question: f.question,
        views: faqViews[f.id] || 0
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    const mentorAnalytics = mentors
      .map(m => ({
        id: m.id,
        name: m.name,
        bookings: mentorBookings[m.id] || 0
      }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 5);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="p-5 rounded-2xl bg-gray-900/40 border border-white/5">
              <p className="font-mono text-xs text-gray-500 mb-1">{stat.label}</p>
              <h3 className="text-xl font-bold text-white">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth Column Chart */}
          <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5">
            <h4 className="font-mono text-xs text-emerald-500 mb-4">// HISTORICAL_SIGNAL_ACQUISITIONS</h4>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MEMBER_GROWTH}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} />
                  <YAxis stroke="#94A3B8" fontSize={10} />
                  <Tooltip content={<TelemetryTooltip />} />
                  <Bar dataKey="members" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Real-time telemetry simulation */}
          <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5 flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-xs text-pink-500 mb-2">// REAL_TIME_WEBSOCKET_SIGNAL</h4>
              <p className="text-gray-400 text-xs mb-4">Tracking signal packet reception latencies across all downlink nodes.</p>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5">
                <span className="text-emerald-500">SYS_DOWNLINK_A:</span>
                <span className="text-white">12.4 ms (99.8% STABLE)</span>
              </div>
              <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5">
                <span className="text-emerald-500">SYS_DOWNLINK_B:</span>
                <span className="text-white">14.1 ms (100% STABLE)</span>
              </div>
              <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5">
                <span className="text-amber-500">SYS_DOWNLINK_C:</span>
                <span className="text-white">42.9 ms (91.2% JITTER)</span>
              </div>
              <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5">
                <span className="text-red-500">SYS_DOWNLINK_D:</span>
                <span className="text-white">OFFLINE (NO_CLEARANCE_BEACON)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Analytics Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* FAQ views analytics table */}
          <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5">
            <h4 className="font-mono text-xs text-pink-500 mb-4">// CENTRAL_FAQ_VIEWS_TELEMETRY</h4>
            <div className="space-y-3">
              {faqAnalytics.map((faq, index) => (
                <div key={faq.id} className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5 text-xs">
                  <span className="text-gray-300 truncate max-w-[280px]" title={faq.question}>
                    {index + 1}. {faq.question}
                  </span>
                  <span className="font-mono text-pink-500 shrink-0 bg-pink-500/10 px-2.5 py-0.5 rounded-md border border-pink-500/20">
                    {faq.views} VIEWS
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mentor bookings analytics table */}
          <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5">
            <h4 className="font-mono text-xs text-blue-500 mb-4">// MENTOR_MATCHING_TELEMETRY</h4>
            <div className="space-y-3">
              {mentorAnalytics.map((mentor, index) => (
                <div key={mentor.id} className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5 text-xs">
                  <span className="text-gray-300">
                    {index + 1}. {mentor.name}
                  </span>
                  <span className="font-mono text-blue-500 shrink-0 bg-blue-500/10 px-2.5 py-0.5 rounded-md border border-blue-500/20">
                    {mentor.bookings} BOOKINGS
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 3. User Dossiers View
  const renderUsers = () => {
    const filtered = registeredAgents.filter(
      (a) =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative flex-1 w-full max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Query dossiers database..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 font-mono text-xs text-white bg-gray-900/60 border border-pink-500/20 rounded-lg outline-none focus:border-pink-500/50 transition-colors"
            />
          </div>
          <span className="font-mono text-xs text-gray-500">{filtered.length} AGENTS INDEXED</span>
        </div>

        <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="pb-4 font-mono text-xs text-gray-500 tracking-widest">AGENT_DOSSIER</th>
                  <th className="pb-4 font-mono text-xs text-gray-500 tracking-widest">ROLE</th>
                  <th className="pb-4 font-mono text-xs text-gray-500 tracking-widest">REGION</th>
                  <th className="pb-4 font-mono text-xs text-gray-500 tracking-widest">STATUS</th>
                  <th className="pb-4 text-right font-mono text-xs text-gray-500 tracking-widest">DECOMMISSION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-xs">
                {filtered.map((agent) => {
                  if (agent.isDeleted) {
                    return (
                      <tr key={agent.id} className="bg-red-500/5 text-gray-500 text-center animate-pulse">
                        <td colSpan={5} className="py-4 text-xs font-mono">
                          [DOSSIER_DECOMMISSIONED] :: AGENT {agent.name.toUpperCase()} DELETED (UNDO AVAILABLE).
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={agent.id} className="hover:bg-white/[0.01]">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-pink-500 flex items-center justify-center font-bold text-white">
                            {getInitials(agent.name)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white font-sans">{agent.name}</p>
                            <p className="text-xs text-gray-500">{agent.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-gray-300">{agent.role}</td>
                      <td className="py-4 text-gray-400">{agent.region}</td>
                      <td className="py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          agent.status === "ACTIVE" 
                            ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" 
                            : "text-red-500 bg-red-500/10 border-red-500/20"
                        }`}>
                          {agent.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => handleDeleteAgent(agent.id, agent.name)}
                          aria-label={`Decommission ${agent.name}`}
                          className="p-1.5 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // 4. Transmission Log View
  const renderContent = () => (
    <div className="space-y-6">
      {/* Sub-tab selection menu */}
      <div className="flex gap-2 border-b border-white/5 pb-4 overflow-x-auto">
        {(["log", "webinar", "faq", "podcast", "announcement"] as const).map((sub) => (
          <button
            key={sub}
            onClick={() => setContentSubTab(sub)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer ${
              contentSubTab === sub
                ? "bg-pink-500 text-white shadow-[0_0_12px_rgba(236,72,153,0.3)]"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {sub === "log" && "AUDIT_STREAM"}
            {sub === "webinar" && "ADD_WEBINAR"}
            {sub === "faq" && "ADD_FAQ"}
            {sub === "podcast" && "ADD_PODCAST"}
            {sub === "announcement" && "ADD_ANNOUNCEMENT"}
          </button>
        ))}
      </div>

      {contentSubTab === "log" && (
        <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5 flex flex-col h-[500px]">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <h4 className="font-mono text-xs text-pink-500 tracking-widest">// DECRYPTED_SIGNAL_STREAM</h4>
            <button 
              onClick={() => {
                setAuditLogs([]);
                sessionStorage.setItem("isya_audit_logs", JSON.stringify([]));
              }}
              className="text-gray-500 hover:text-white font-mono text-xs transition-colors cursor-pointer"
            >
              CLEAR_BUFFER_
            </button>
          </div>
          <div className="flex-1 overflow-y-auto font-mono text-xs text-gray-300 space-y-2 select-text pr-2">
            {auditLogs.length > 0 ? (
              auditLogs.map((log, i) => (
                <div key={i} className="hover:bg-white/5 p-1 rounded transition-colors whitespace-pre-wrap">
                  {log}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600 py-20">// NO_SIGNAL_PACKETS_IN_BUFFER</div>
            )}
          </div>
        </div>
      )}

      {contentSubTab === "webinar" && (
        <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5 max-w-xl">
          <h4 className="font-mono text-xs text-pink-500 tracking-widest border-b border-white/5 pb-4 mb-6">// ADD_WEBINAR_ENTRY</h4>
          <form onSubmit={handleAddWebinar} className="space-y-4">
            <div>
              <label htmlFor="webinarTitle" className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">WEBINAR_TITLE</label>
              <input
                id="webinarTitle"
                type="text"
                required
                placeholder="Deep Space Astronomy Symposium"
                value={webinarTitle}
                onChange={(e) => setWebinarTitle(e.target.value)}
                className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="webinarDate" className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">BROADCAST_DATE</label>
                <input
                  id="webinarDate"
                  type="date"
                  required
                  value={webinarDate}
                  onChange={(e) => setWebinarDate(e.target.value)}
                  className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
                />
              </div>
              <div>
                <label htmlFor="webinarImg" className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">IMAGE_THUMBNAIL_URL (OPTIONAL)</label>
                <input
                  id="webinarImg"
                  type="text"
                  placeholder="https://unsplash.com/..."
                  value={webinarImage}
                  onChange={(e) => setWebinarImage(e.target.value)}
                  className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="webinarUrl" className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">YOUTUBE_VIDEO_URL (OR ID)</label>
              <input
                id="webinarUrl"
                type="text"
                required
                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                value={webinarVideoUrl}
                onChange={(e) => setWebinarVideoUrl(e.target.value)}
                className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
              />
            </div>
            <div>
              <label htmlFor="webinarDesc" className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">BRIEFING_DESCRIPTION</label>
              <textarea
                id="webinarDesc"
                required
                rows={3}
                placeholder="Detailed summary of the webinar session..."
                value={webinarDesc}
                onChange={(e) => setWebinarDesc(e.target.value)}
                className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none resize-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-pink-500 text-white font-mono text-[10px] font-bold tracking-widest hover:bg-pink-500/90 cursor-pointer shadow-[0_0_10px_rgba(236,72,153,0.3)] transition-all"
            >
              SAVE_WEBINAR_ENTRY
            </button>
          </form>
        </div>
      )}

      {contentSubTab === "faq" && (
        <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5 max-w-xl">
          <h4 className="font-mono text-xs text-pink-500 tracking-widest border-b border-white/5 pb-4 mb-6">// ADD_FAQ_ENTRY</h4>
          <form onSubmit={handleAddFAQ} className="space-y-4">
            <div>
              <label htmlFor="faqCat" className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">FAQ_CATEGORY</label>
              <select
                id="faqCat"
                value={faqCategory}
                onChange={(e) => setFaqCategory(e.target.value as any)}
                className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none cursor-pointer text-gray-300"
              >
                <option value="GENERAL">GENERAL</option>
                <option value="MEMBERSHIP">MEMBERSHIP</option>
                <option value="COMMUNITY">COMMUNITY</option>
                <option value="MENTORSHIP">MENTORSHIP</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div>
              <label htmlFor="faqQ" className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">QUESTION_TEXT</label>
              <input
                id="faqQ"
                type="text"
                required
                placeholder="What is the mission of ISYA?"
                value={faqQuestion}
                onChange={(e) => setFaqQuestion(e.target.value)}
                className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
              />
            </div>
            <div>
              <label htmlFor="faqA" className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">ANSWER_TEXT</label>
              <textarea
                id="faqA"
                required
                rows={4}
                placeholder="Write the detailed explanation response..."
                value={faqAnswer}
                onChange={(e) => setFaqAnswer(e.target.value)}
                className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none resize-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-pink-500 text-white font-mono text-[10px] font-bold tracking-widest hover:bg-pink-500/90 cursor-pointer shadow-[0_0_10px_rgba(236,72,153,0.3)] transition-all"
            >
              SAVE_FAQ_ENTRY
            </button>
          </form>
        </div>
      )}

      {contentSubTab === "podcast" && (
        <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5 max-w-xl">
          <h4 className="font-mono text-xs text-pink-500 tracking-widest border-b border-white/5 pb-4 mb-6">// ADD_PODCAST_EPISODE</h4>
          <form onSubmit={handleAddPodcast} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="podEp" className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">EPISODE_NUMBER</label>
                <input
                  id="podEp"
                  type="text"
                  required
                  placeholder="EP_043"
                  value={podcastEpisode}
                  onChange={(e) => setPodcastEpisode(e.target.value)}
                  className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
                />
              </div>
              <div>
                <label htmlFor="podFreq" className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">PODCAST_FREQ</label>
                <input
                  id="podFreq"
                  type="text"
                  required
                  placeholder="98.6 MHz"
                  value={podcastFreq}
                  onChange={(e) => setPodcastFreq(e.target.value)}
                  className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="podTitle" className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">EPISODE_TITLE</label>
                <input
                  id="podTitle"
                  type="text"
                  required
                  placeholder="Deep Space Radio Signals"
                  value={podcastTitle}
                  onChange={(e) => setPodcastTitle(e.target.value)}
                  className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
                />
              </div>
              <div>
                <label htmlFor="podGuest" className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">GUEST_SPEAKER</label>
                <input
                  id="podGuest"
                  type="text"
                  required
                  placeholder="DR_ALEXIS_VANCE"
                  value={podcastGuest}
                  onChange={(e) => setPodcastGuest(e.target.value)}
                  className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="podDur" className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">EPISODE_DURATION</label>
                <input
                  id="podDur"
                  type="text"
                  required
                  placeholder="42:15"
                  value={podcastDuration}
                  onChange={(e) => setPodcastDuration(e.target.value)}
                  className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
                />
              </div>
              <div>
                <label htmlFor="podDate" className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">RELEASE_DATE</label>
                <input
                  id="podDate"
                  type="date"
                  required
                  value={podcastDate}
                  onChange={(e) => setPodcastDate(e.target.value)}
                  className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-pink-500 text-white font-mono text-[10px] font-bold tracking-widest hover:bg-pink-500/90 cursor-pointer shadow-[0_0_10px_rgba(236,72,153,0.3)] transition-all"
            >
              SAVE_PODCAST_EPISODE
            </button>
          </form>
        </div>
      )}

      {contentSubTab === "announcement" && (
        <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5 max-w-xl">
          <h4 className="font-mono text-xs text-pink-500 tracking-widest border-b border-white/5 pb-4 mb-6">// CREATE_ANNOUNCEMENT</h4>
          <form onSubmit={handleAddAnnouncement} className="space-y-4">
            <div>
              <label htmlFor="annTitle" className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">ANNOUNCEMENT_TITLE</label>
              <input
                id="annTitle"
                type="text"
                required
                placeholder="Nairobi 2026 Symposium Details"
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
              />
            </div>
            <div>
              <label htmlFor="annStatus" className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">STATUS</label>
              <select
                id="annStatus"
                value={annStatus}
                onChange={(e) => setAnnStatus(e.target.value as any)}
                className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none cursor-pointer text-gray-300"
              >
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="DRAFT">DRAFT</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>
            <div>
              <label htmlFor="annContent" className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">ANNOUNCEMENT_BODY_CONTENT</label>
              <textarea
                id="annContent"
                required
                rows={4}
                placeholder="Broadcast text details..."
                value={annContent}
                onChange={(e) => setAnnContent(e.target.value)}
                className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none resize-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-pink-500 text-white font-mono text-[10px] font-bold tracking-widest hover:bg-pink-500/90 cursor-pointer shadow-[0_0_10px_rgba(236,72,153,0.3)] transition-all"
            >
              BROADCAST_ANNOUNCEMENT
            </button>
          </form>
        </div>
      )}
    </div>
  );

  // 5. System Configuration View
  const renderSettings = () => (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5 max-w-2xl">
        <h4 className="font-mono text-xs text-blue-500 tracking-widest border-b border-white/5 pb-4 mb-6">// SYS_ENVIRONMENT_VARIABLES</h4>
        
        <div className="space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
            <div>
              <p className="text-white font-bold">VITE_ENABLE_ADMIN_PANEL</p>
              <p className="text-gray-500 text-[11px] mt-1">If false, redirects unauthorized sectors back to base terminal.</p>
            </div>
            <button
              onClick={() => toggleFlag("VITE_ENABLE_ADMIN_PANEL")}
              className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                flags.VITE_ENABLE_ADMIN_PANEL ? "bg-pink-500" : "bg-gray-800"
              }`}
            >
              <div className={`bg-white w-4 h-4 rounded-full transition-transform ${
                flags.VITE_ENABLE_ADMIN_PANEL ? "translate-x-6" : ""
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
            <div>
              <p className="text-white font-bold">VITE_ENABLE_COMMUNITY_FEATURES</p>
              <p className="text-gray-500 text-[11px] mt-1">Enables/disables real-time broad cast uploads and connections.</p>
            </div>
            <button
              onClick={() => toggleFlag("VITE_ENABLE_COMMUNITY_FEATURES")}
              className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                flags.VITE_ENABLE_COMMUNITY_FEATURES ? "bg-pink-500" : "bg-gray-800"
              }`}
            >
              <div className={`bg-white w-4 h-4 rounded-full transition-transform ${
                flags.VITE_ENABLE_COMMUNITY_FEATURES ? "translate-x-6" : ""
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
            <div>
              <p className="text-white font-bold">VITE_ENVIRONMENT</p>
              <p className="text-gray-500 text-[11px] mt-1">Toggles logging verbosities and simulated sandbox environments.</p>
            </div>
            <select
              value={flags.VITE_ENVIRONMENT}
              onChange={(e) => {
                const val = e.target.value;
                setFlags((prev) => ({ ...prev, VITE_ENVIRONMENT: val }));
                addAuditLog(`VITE_ENVIRONMENT updated to: ${val.toUpperCase()}`);
                toast.success(`Environment updated to ${val}`);
              }}
              className="bg-[#05080F] border border-white/10 rounded px-3 py-1.5 text-white outline-none cursor-pointer"
            >
              <option value="development">development</option>
              <option value="staging">staging</option>
              <option value="production">production</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#05080F]">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 w-[220px] bg-[#05080F]/98 backdrop-blur-2xl border-r border-pink-500/10 transition-transform duration-300 md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-4 h-16 border-b border-pink-500/10">
          <img src={logoImg} alt="ISYA" width="36" height="36" className="w-9 h-9 object-contain drop-shadow-[0_0_8px_rgba(249,115,22,0.35)] mix-blend-multiply" />
          <div className="font-mono">
            <p className="text-xs text-pink-500 tracking-wider">ISYA_ADMIN</p>
            <p className="text-[10px] text-gray-500 tracking-widest">CLEARANCE_LVL_5</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <p className="px-2 mb-4 font-mono text-gray-500 text-[11px] tracking-[0.2em]">
            // NAVIGATION
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => {
                    setActiveSection(id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-xs tracking-wider transition-all cursor-pointer ${
                    activeSection === id
                      ? "bg-pink-500/10 text-pink-500 border-l-2 border-pink-500 font-bold"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              </li>
            ))}

            {/* Exit to Main Portal */}
            <li className="pt-3 mt-3 border-t border-pink-500/10">
              <Link
                to="/"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-xs tracking-wider text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <Home size={14} className="text-pink-500" />
                EXIT_TERMINAL
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-pink-500/5 border border-pink-500/10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-blue-500 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold font-mono">
                {user ? getInitials(user.name) : "AD"}
              </span>
            </div>
            <div className="min-w-0 font-mono">
              <p className="text-xs text-gray-300 truncate font-sans font-bold">{user ? user.name : "Commander"}</p>
              <p className="text-[10px] text-pink-500 truncate">{user ? user.role.toUpperCase() : "SUPER_ADMIN"}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-6 h-16 bg-[#05080F]/95 backdrop-blur-xl border-b border-pink-500/10">
          <div className="flex items-center gap-4">
            <button 
              ref={menuButtonRef}
              onClick={() => setSidebarOpen(true)} 
              className="md:hidden text-gray-400 cursor-pointer"
            >
              <Menu size={20} />
            </button>
            <h2 className="font-mono text-xs text-gray-400 tracking-[0.2em]">
              {NAV_ITEMS.find((n) => n.id === activeSection)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs text-emerald-500">SYS_OPTIMAL</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <div className="max-w-6xl mx-auto space-y-8">
            {activeSection === "dashboard" && renderDashboard()}
            {activeSection === "analytics" && renderAnalytics()}
            {activeSection === "users" && renderUsers()}
            {activeSection === "content" && renderContent()}
            {activeSection === "settings" && renderSettings()}
          </div>
        </main>
      </div>
    </div>
  );
}
