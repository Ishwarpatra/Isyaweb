import { useState } from "react";
import {
  Users,
  FileText,
  BarChart2,
  Settings,
  CheckCircle,
  XCircle,
  MoreVertical,
  Globe,
  Youtube,
  Menu,
  X,
  ShieldX,
  Activity,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import logoImg from "../../imports/Logo_ISYA__1_-2.jpeg";

const NAV_ITEMS = [
  { id: "dashboard", label: "MISSION_CONTROL", icon: BarChart2 },
  { id: "analytics", label: "TELEMETRY_DATA", icon: Activity },
  { id: "users", label: "AGENT_DOSSIERS", icon: Users },
  { id: "content", label: "TRANSMISSION_LOG", icon: FileText },
  { id: "settings", label: "SYS_CONFIG", icon: Settings },
];

const PENDING_USERS = [
  { id: 1, name: "Emma Wilson", email: "emma@example.com", country: "🇬🇧", region: "EU-WEST", date: "2026-05-18", interest: "ASTROPHYSICS" },
  { id: 2, name: "Kwame Asante", email: "kwame@example.com", country: "🇬🇭", region: "AF-WEST", date: "2026-05-17", interest: "AEROSPACE_ENG" },
  { id: 3, name: "Mia Hoffmann", email: "mia@example.com", country: "🇩🇪", region: "EU-CENT", date: "2026-05-17", interest: "DATA_SCIENCE" },
  { id: 4, name: "Ryo Inoue", email: "ryo@example.com", country: "🇯🇵", region: "AS-EAST", date: "2026-05-16", interest: "RADIO_ASTRO" },
];

const ALL_USERS = [
  { id: 1, name: "Sarah Chen", email: "sarah@isya.org", country: "🇺🇸", region: "AM-NORTH", status: "ACTIVE", role: "MEMBER", joined: "2024-03", clearance: "LVL-2" },
  { id: 2, name: "David Osei", email: "david@isya.org", country: "🇬🇭", region: "AF-WEST", status: "ACTIVE", role: "MODERATOR", joined: "2023-01", clearance: "LVL-4" },
  { id: 3, name: "Yuki Tanaka", email: "yuki@isya.org", country: "🇯🇵", region: "AS-EAST", status: "ACTIVE", role: "MEMBER", joined: "2025-06", clearance: "LVL-2" },
  { id: 4, name: "Amara Diallo", email: "amara@isya.org", country: "🇸🇳", region: "AF-WEST", status: "INACTIVE", role: "MEMBER", joined: "2024-04", clearance: "LVL-1" },
  { id: 5, name: "Luis Reyes", email: "luis@isya.org", country: "🇲🇽", region: "AM-SOUTH", status: "ACTIVE", role: "MEMBER", joined: "2023-02", clearance: "LVL-2" },
];

const CONTENT_ITEMS = [
  { id: 1, title: "ISYA Members Join ESA Traineeship", type: "BLOG", author: "AGENT_CHEN_S", date: "2026-05-14", status: "PUBLISHED" },
  { id: 2, title: "Annual Space Symposium 2026", type: "EVENT", author: "ISYA_CMD", date: "2026-05-06", status: "PUBLISHED" },
  { id: 3, title: "CubeSat Workshop — Module 3", type: "VIDEO", author: "AGENT_OSEI_D", date: "2026-05-20", status: "SCHEDULED" },
  { id: 4, title: "Radio Telescope Budget Build", type: "BLOG", author: "AGENT_TANAKA_Y", date: "2026-05-22", status: "DRAFT" },
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

const ENGAGEMENT = [
  { day: "MON", views: 1200, posts: 8, signups: 24 },
  { day: "TUE", views: 1800, posts: 12, signups: 31 },
  { day: "WED", views: 1400, posts: 9, signups: 18 },
  { day: "THU", views: 2200, posts: 15, signups: 42 },
  { day: "FRI", views: 1900, posts: 11, signups: 35 },
  { day: "SAT", views: 900, posts: 5, signups: 16 },
  { day: "SUN", views: 700, posts: 3, signups: 12 },
];

const SPECIALIZATION_DATA = [
  { subject: "ASTROPHYSICS", A: 85 },
  { subject: "AEROSPACE", A: 72 },
  { subject: "DATA_SCI", A: 63 },
  { subject: "RADIO_ASTRO", A: 58 },
  { subject: "CUBESAT", A: 78 },
  { subject: "ASTROBIO", A: 45 },
];

const CUSTOM_TOOLTIP_STYLE = {
  background: "rgba(17,24,39,0.95)",
  border: "1px solid rgba(236,72,153,0.2)",
  borderRadius: 8,
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.65rem",
  color: "#9CA3AF",
};

function TelemetryTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={CUSTOM_TOOLTIP_STYLE} className="p-3">
      <p style={{ color: "#EC4899", marginBottom: 4, letterSpacing: "0.1em" }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name.toUpperCase()}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

function AccessDenied({ onBypass }: { onBypass: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "#05080F" }}
    >
      {/* Scan line overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(239,68,68,0.015) 3px, rgba(239,68,68,0.015) 6px)",
        }}
      />
      {/* Red glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none animate-pulse-glow"
        style={{ background: "rgba(239,68,68,0.06)", filter: "blur(150px)" }}
      />

      <div className="relative z-10 text-center px-4">
        {/* HUD frame */}
        <div
          className="inline-flex flex-col items-center p-10 rounded-2xl relative"
          style={{
            background: "rgba(17,24,39,0.6)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(239,68,68,0.2)",
            boxShadow: "0 0 60px rgba(239,68,68,0.08), inset 0 0 60px rgba(239,68,68,0.02)",
          }}
        >
          {/* Corner brackets — red */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-500 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-500 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-500 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-500 rounded-br-lg" />

          <ShieldX size={52} className="mb-5" style={{ color: "#EF4444" }} />

          <div
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "#EF4444", letterSpacing: "0.2em", marginBottom: "0.75rem" }}
          >
            INCIDENT_LOG :: EVENT_ID_42691
          </div>

          <h1
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "#EF4444",
              letterSpacing: "0.05em",
              lineHeight: 1.1,
              marginBottom: "0.5rem",
            }}
          >
            ACCESS DENIED
          </h1>

          <div
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "#374151", letterSpacing: "0.12em", marginBottom: "1.5rem" }}
          >
            // INCIDENT LOGGED // SECTOR: ADMIN_PORTAL
          </div>

          <p style={{ color: "#6B7280", fontSize: "0.85rem", maxWidth: 360, lineHeight: 1.6, marginBottom: "2rem" }}>
            Your credentials do not meet the required clearance level for this sector.
            All access attempts are recorded and reviewed by the Security Division.
          </p>

          {/* Error codes */}
          <div
            className="flex flex-col gap-1 mb-8 text-left w-full"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem" }}
          >
            {[
              { code: "ERR_401", msg: "AUTHENTICATION_FAILURE", color: "#EF4444" },
              { code: "ERR_403", msg: "CLEARANCE_INSUFFICIENT", color: "#F97316" },
              { code: "LOG_0x7F", msg: "ATTEMPT_RECORDED_UTC_2026-05-19T09:14:22Z", color: "#374151" },
            ].map((e) => (
              <div key={e.code} className="flex gap-3">
                <span style={{ color: e.color }}>[{e.code}]</span>
                <span style={{ color: "#4B5563" }}>{e.msg}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onBypass}
            className="px-8 py-3 rounded-xl transition-all duration-300"
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.25)",
              color: "#EF4444",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              fontWeight: 600,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.18)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(239,68,68,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            OVERRIDE_WITH_ADMIN_KEY // DEMO_MODE
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminPage() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingUsers, setPendingUsers] = useState(PENDING_USERS);
  const [userStatuses, setUserStatuses] = useState<Record<number, string>>({});

  if (!accessGranted) {
    return <AccessDenied onBypass={() => setAccessGranted(true)} />;
  }

  const handleApprove = (id: number) => setPendingUsers((prev) => prev.filter((u) => u.id !== id));
  const handleDeny = (id: number) => setPendingUsers((prev) => prev.filter((u) => u.id !== id));
  const toggleUserStatus = (id: number, current: string) =>
    setUserStatuses((prev) => ({ ...prev, [id]: current === "ACTIVE" ? "INACTIVE" : "ACTIVE" }));

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#05080F" }}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{
          width: 220,
          background: "rgba(5,8,15,0.98)",
          backdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(236,72,153,0.08)",
        }}
      >
        {/* Sidebar header */}
        <div
          className="flex items-center gap-2.5 px-4 h-16 shrink-0"
          style={{ borderBottom: "1px solid rgba(236,72,153,0.08)" }}
        >
          <img
            src={logoImg}
            alt="ISYA"
            style={{ width: 38, filter: "drop-shadow(0 0 8px rgba(249,115,22,0.35))" }}
          />
          <div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#EC4899", letterSpacing: "0.1em" }}>
              ISYA_ADMIN
            </p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "#374151", letterSpacing: "0.08em" }}>
              CLEARANCE_LVL_5
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2.5 py-4 overflow-y-auto">
          <p
            className="px-2 mb-3"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#1F2937", fontSize: "0.6rem", letterSpacing: "0.15em" }}
          >
            // NAVIGATION
          </p>
          <ul className="flex flex-col gap-0.5">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => { setActiveSection(id); setSidebarOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-200"
                  style={{
                    background: activeSection === id ? "rgba(236,72,153,0.08)" : "transparent",
                    color: activeSection === id ? "#EC4899" : "#4B5563",
                    borderLeft: activeSection === id ? "2px solid #EC4899" : "2px solid transparent",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.06em",
                    fontWeight: activeSection === id ? 600 : 400,
                  }}
                >
                  <Icon size={14} />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Admin identity */}
        <div className="p-3">
          <div
            className="flex items-center gap-2.5 p-3 rounded-xl"
            style={{ background: "rgba(236,72,153,0.05)", border: "1px solid rgba(236,72,153,0.1)" }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #EC4899, #3B82F6)" }}
            >
              <span className="text-white text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>AD</span>
            </div>
            <div className="min-w-0">
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "#9CA3AF", letterSpacing: "0.06em" }}>CMDR_ADMIN</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "#EC4899", letterSpacing: "0.08em" }}>SUPER_ADMIN</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header
          className="flex items-center justify-between px-5 h-16 shrink-0"
          style={{
            background: "rgba(5,8,15,0.95)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(236,72,153,0.08)",
          }}
        >
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg"
              style={{ color: "#6B7280" }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "#EC4899", letterSpacing: "0.1em" }}>
                {NAV_ITEMS.find((n) => n.id === activeSection)?.label ?? "MISSION_CONTROL"}
              </p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "#374151", letterSpacing: "0.08em" }}>
                ISYA_ADMIN_PORTAL // v4.0
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.2)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                color: "#10B981",
                letterSpacing: "0.1em",
              }}
            >
              <span className="animate-live-pulse inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
              SYSTEMS_NOMINAL
            </div>
            <button
              onClick={() => setAccessGranted(false)}
              className="px-3 py-1.5 rounded-lg transition-colors duration-200"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                color: "#374151",
                border: "1px solid rgba(239,68,68,0.15)",
                letterSpacing: "0.08em",
              }}
            >
              REVOKE_ACCESS
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5">
          {/* ── Dashboard ── */}
          {activeSection === "dashboard" && (
            <div>
              {/* Stats grid */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-5 rounded-xl relative"
                    style={{
                      background: "rgba(17,24,39,0.6)",
                      backdropFilter: "blur(8px)",
                      border: `1px solid ${stat.color}18`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        style={{ fontFamily: "'JetBrains Mono', monospace", color: "#374151", fontSize: "0.58rem", letterSpacing: "0.1em" }}
                      >
                        {stat.label}
                      </span>
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: `${stat.color}14` }}
                      >
                        <stat.icon size={14} style={{ color: stat.color }} />
                      </div>
                    </div>
                    <p className="text-white mb-1" style={{ fontSize: "1.6rem", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>
                      {stat.value}
                    </p>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#10B981", fontSize: "0.58rem", letterSpacing: "0.08em" }}>
                      {stat.change} // {stat.period}
                    </p>
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                {/* Member growth */}
                <div
                  className="p-5 rounded-xl"
                  style={{
                    background: "rgba(17,24,39,0.6)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(236,72,153,0.08)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#EC4899", letterSpacing: "0.1em" }}>
                        // AGENT_GROWTH_TRAJECTORY
                      </p>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "#374151", letterSpacing: "0.08em", marginTop: 2 }}>
                        6_CYCLE_WINDOW
                      </p>
                    </div>
                    <TrendingUp size={14} style={{ color: "#10B981" }} />
                  </div>
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={MEMBER_GROWTH} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="memberGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#EC4899" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                      <XAxis dataKey="month" tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fill: "#374151" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fill: "#374151" }} axisLine={false} tickLine={false} />
                      <Tooltip content={<TelemetryTooltip />} />
                      <Area type="monotone" dataKey="members" name="agents" stroke="#EC4899" strokeWidth={2} fill="url(#memberGrad)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Weekly engagement */}
                <div
                  className="p-5 rounded-xl"
                  style={{
                    background: "rgba(17,24,39,0.6)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(59,130,246,0.08)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#3B82F6", letterSpacing: "0.1em" }}>
                        // WEEKLY_SIGNAL_ACTIVITY
                      </p>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "#374151", letterSpacing: "0.08em", marginTop: 2 }}>
                        MULTI_CHANNEL_FEED
                      </p>
                    </div>
                    <Activity size={14} style={{ color: "#3B82F6" }} />
                  </div>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={ENGAGEMENT} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barSize={8}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                      <XAxis dataKey="day" tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fill: "#374151" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fill: "#374151" }} axisLine={false} tickLine={false} />
                      <Tooltip content={<TelemetryTooltip />} />
                      <Bar dataKey="views" name="views" fill="#3B82F6" fillOpacity={0.7} radius={[3, 3, 0, 0]} />
                      <Bar dataKey="signups" name="signups" fill="#EC4899" fillOpacity={0.7} radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Specialization radar + pending */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Radar */}
                <div
                  className="p-5 rounded-xl"
                  style={{
                    background: "rgba(17,24,39,0.6)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(139,92,246,0.08)",
                  }}
                >
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#8B5CF6", letterSpacing: "0.1em", marginBottom: "1rem" }}>
                    // SPECIALIZATION_DISTRIBUTION_MAP
                  </p>
                  <ResponsiveContainer width="100%" height={200}>
                    <RadarChart data={SPECIALIZATION_DATA} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                      <PolarGrid stroke="rgba(255,255,255,0.05)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, fill: "#4B5563" }} />
                      <Radar name="members" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.15} strokeWidth={1.5} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Pending approvals */}
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: "rgba(17,24,39,0.6)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(236,72,153,0.08)",
                  }}
                >
                  <div
                    className="flex items-center justify-between px-5 py-3"
                    style={{ borderBottom: "1px solid rgba(236,72,153,0.06)" }}
                  >
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#EC4899", letterSpacing: "0.1em" }}>
                      // PENDING_ENLISTMENTS
                    </p>
                    {pendingUsers.length > 0 && (
                      <span
                        className="px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(239,68,68,0.12)",
                          color: "#EF4444",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.6rem",
                          fontWeight: 700,
                        }}
                      >
                        {pendingUsers.length}_QUEUED
                      </span>
                    )}
                  </div>
                  {pendingUsers.length === 0 ? (
                    <div className="px-5 py-10 text-center">
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#1F2937", letterSpacing: "0.1em" }}>
                        QUEUE_EMPTY // ALL_PROCESSED
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y" style={{ borderColor: "rgba(236,72,153,0.04)" }}>
                      {pendingUsers.map((user) => (
                        <div key={user.id} className="flex items-center gap-3 px-5 py-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: "rgba(236,72,153,0.1)", color: "#EC4899", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", fontWeight: 700 }}
                          >
                            {user.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white truncate" style={{ fontWeight: 500, fontSize: "0.82rem" }}>{user.name}</p>
                            <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#374151", fontSize: "0.58rem", letterSpacing: "0.06em" }}>
                              {user.region} // {user.interest}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleApprove(user.id)}
                              className="p-1.5 rounded-lg transition-all duration-200"
                              style={{ background: "rgba(16,185,129,0.1)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}
                              aria-label="Approve"
                            >
                              <CheckCircle size={14} />
                            </button>
                            <button
                              onClick={() => handleDeny(user.id)}
                              className="p-1.5 rounded-lg transition-all duration-200"
                              style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.2)" }}
                              aria-label="Deny"
                            >
                              <XCircle size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Analytics ── */}
          {activeSection === "analytics" && (
            <div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#374151", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
                <span style={{ color: "#EC4899" }}>◈</span> DEEP_TELEMETRY :: LIVE_DATA_STREAMS // LAST_UPDATED_2026-05-19T09:14Z
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div className="p-5 rounded-xl" style={{ background: "rgba(17,24,39,0.6)", border: "1px solid rgba(236,72,153,0.08)" }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#EC4899", letterSpacing: "0.1em", marginBottom: "1rem" }}>
                    // AGENT_RECRUITMENT_CURVE
                  </p>
                  <ResponsiveContainer width="100%" height={240}>
                    <AreaChart data={MEMBER_GROWTH} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EC4899" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#EC4899" stopOpacity={0.01} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                      <XAxis dataKey="month" tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fill: "#374151" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fill: "#374151" }} axisLine={false} tickLine={false} />
                      <Tooltip content={<TelemetryTooltip />} />
                      <Area type="monotone" dataKey="members" name="agents" stroke="#EC4899" strokeWidth={2} fill="url(#grad2)" dot={{ fill: "#EC4899", r: 3 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="p-5 rounded-xl" style={{ background: "rgba(17,24,39,0.6)", border: "1px solid rgba(139,92,246,0.08)" }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#8B5CF6", letterSpacing: "0.1em", marginBottom: "1rem" }}>
                    // SPECIALIZATION_RADAR_SCAN
                  </p>
                  <ResponsiveContainer width="100%" height={240}>
                    <RadarChart data={SPECIALIZATION_DATA}>
                      <PolarGrid stroke="rgba(255,255,255,0.05)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, fill: "#4B5563" }} />
                      <Radar name="members" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.18} strokeWidth={1.5} dot={{ fill: "#8B5CF6", r: 3 }} />
                      <Tooltip content={<TelemetryTooltip />} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="p-5 rounded-xl" style={{ background: "rgba(17,24,39,0.6)", border: "1px solid rgba(59,130,246,0.08)" }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#3B82F6", letterSpacing: "0.1em", marginBottom: "1rem" }}>
                  // MULTI_SIGNAL_WEEKLY_BREAKDOWN
                </p>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={ENGAGEMENT} margin={{ top: 5, right: 5, left: -10, bottom: 0 }} barGap={4} barSize={12}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                    <XAxis dataKey="day" tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fill: "#374151" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fill: "#374151" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<TelemetryTooltip />} />
                    <Bar dataKey="views" name="views" fill="#3B82F6" fillOpacity={0.75} radius={[3, 3, 0, 0]} />
                    <Bar dataKey="posts" name="posts" fill="#8B5CF6" fillOpacity={0.75} radius={[3, 3, 0, 0]} />
                    <Bar dataKey="signups" name="signups" fill="#EC4899" fillOpacity={0.75} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* ── Users ── */}
          {activeSection === "users" && (
            <div
              className="rounded-xl overflow-hidden"
              style={{ background: "rgba(17,24,39,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(236,72,153,0.08)" }}
            >
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid rgba(236,72,153,0.06)" }}
              >
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#EC4899", letterSpacing: "0.1em" }}>
                  // AGENT_DOSSIER_DATABASE
                </p>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#374151", fontSize: "0.6rem", letterSpacing: "0.08em" }}>
                  {ALL_USERS.length}_RECORDS_INDEXED
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(236,72,153,0.05)" }}>
                      {["AGENT_ID", "REGION", "ROLE", "STATUS", "CLEARANCE", "ACTIONS"].map((h) => (
                        <th
                          key={h}
                          className="px-5 py-3 text-left"
                          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#1F2937", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.12em" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ALL_USERS.map((user) => {
                      const status = (userStatuses[user.id] ?? user.status) as string;
                      return (
                        <tr key={user.id} style={{ borderBottom: "1px solid rgba(236,72,153,0.03)" }}>
                          <td className="px-5 py-3.5">
                            <div>
                              <p className="text-white" style={{ fontWeight: 500, fontSize: "0.82rem" }}>{user.name}</p>
                              <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#374151", fontSize: "0.58rem", letterSpacing: "0.06em" }}>{user.email}</p>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#4B5563", fontSize: "0.62rem", letterSpacing: "0.06em" }}>
                              {user.country} {user.region}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span
                              className="px-2 py-0.5 rounded"
                              style={{
                                background: user.role === "MODERATOR" ? "rgba(59,130,246,0.12)" : "rgba(255,255,255,0.04)",
                                color: user.role === "MODERATOR" ? "#3B82F6" : "#4B5563",
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "0.58rem",
                                fontWeight: 600,
                                letterSpacing: "0.06em",
                              }}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span
                              className="px-2 py-0.5 rounded"
                              style={{
                                background: status === "ACTIVE" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                                color: status === "ACTIVE" ? "#10B981" : "#EF4444",
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "0.58rem",
                                fontWeight: 600,
                                letterSpacing: "0.06em",
                              }}
                            >
                              {status === "ACTIVE" && <span className="animate-live-pulse inline-block w-1 h-1 rounded-full mr-1" style={{ background: "#10B981" }} />}
                              {status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#374151", fontSize: "0.6rem", letterSpacing: "0.08em" }}>
                              {user.clearance}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <button
                              onClick={() => toggleUserStatus(user.id, status)}
                              className="px-2.5 py-1 rounded-lg transition-all duration-200"
                              style={{
                                background: status === "ACTIVE" ? "rgba(239,68,68,0.08)" : "rgba(16,185,129,0.08)",
                                color: status === "ACTIVE" ? "#EF4444" : "#10B981",
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "0.58rem",
                                fontWeight: 600,
                                letterSpacing: "0.06em",
                                border: `1px solid ${status === "ACTIVE" ? "rgba(239,68,68,0.18)" : "rgba(16,185,129,0.18)"}`,
                              }}
                            >
                              {status === "ACTIVE" ? "DEACTIVATE" : "ACTIVATE"}
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

          {/* ── Content ── */}
          {activeSection === "content" && (
            <div
              className="rounded-xl overflow-hidden"
              style={{ background: "rgba(17,24,39,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(236,72,153,0.08)" }}
            >
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid rgba(236,72,153,0.06)" }}
              >
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#EC4899", letterSpacing: "0.1em" }}>
                  // TRANSMISSION_LOG
                </p>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                  style={{
                    background: "linear-gradient(135deg, #EC4899, #3B82F6)",
                    color: "#fff",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.62rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                  }}
                >
                  + NEW_TRANSMISSION
                </button>
              </div>
              <div className="divide-y" style={{ borderColor: "rgba(236,72,153,0.03)" }}>
                {CONTENT_ITEMS.map((item) => {
                  const statusConfig: Record<string, { bg: string; color: string }> = {
                    PUBLISHED: { bg: "rgba(16,185,129,0.1)", color: "#10B981" },
                    SCHEDULED: { bg: "rgba(59,130,246,0.1)", color: "#3B82F6" },
                    DRAFT: { bg: "rgba(255,255,255,0.04)", color: "#4B5563" },
                  };
                  const typeColors: Record<string, string> = { BLOG: "#EC4899", EVENT: "#F97316", VIDEO: "#3B82F6" };
                  const sc = statusConfig[item.status] ?? statusConfig.DRAFT;
                  return (
                    <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: `${typeColors[item.type] ?? "#EC4899"}14`,
                          color: typeColors[item.type] ?? "#EC4899",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.55rem",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                        }}
                      >
                        {item.type.slice(0, 3)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white truncate" style={{ fontWeight: 500, fontSize: "0.85rem" }}>{item.title}</p>
                        <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#374151", fontSize: "0.58rem", letterSpacing: "0.06em" }}>
                          AUTH: {item.author} // {item.date}
                        </p>
                      </div>
                      <span
                        className="px-2 py-0.5 rounded shrink-0"
                        style={{
                          background: sc.bg,
                          color: sc.color,
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.58rem",
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                        }}
                      >
                        {item.status}
                      </span>
                      <button aria-label="More options" style={{ color: "#1F2937" }}>
                        <MoreVertical size={15} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Settings ── */}
          {activeSection === "settings" && (
            <div
              className="rounded-xl p-6 max-w-xl"
              style={{ background: "rgba(17,24,39,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(236,72,153,0.08)" }}
            >
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#EC4899", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
                // SYS_CONFIGURATION_PANEL
              </p>
              <div className="flex flex-col gap-5">
                {[
                  { label: "PORTAL_DESIGNATION", value: "ISYA Admin Portal" },
                  { label: "COMMS_ENDPOINT", value: "admin@isya.org" },
                  { label: "SUPPORT_NODE", value: "https://isya.org/support" },
                ].map((field) => (
                  <div key={field.label}>
                    <label
                      className="block mb-1.5"
                      style={{ fontFamily: "'JetBrains Mono', monospace", color: "#4B5563", fontSize: "0.6rem", letterSpacing: "0.12em" }}
                    >
                      {field.label}
                    </label>
                    <input
                      defaultValue={field.value}
                      className="input-glow w-full px-1 py-2.5 outline-none"
                      style={{ color: "#F9FAFB", fontSize: "0.875rem", background: "transparent", caretColor: "#EC4899" }}
                    />
                  </div>
                ))}
                <button
                  className="self-start px-5 py-2 rounded-xl mt-2"
                  style={{
                    background: "linear-gradient(135deg, #EC4899, #3B82F6)",
                    color: "#fff",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    boxShadow: "0 0 20px rgba(236,72,153,0.3)",
                  }}
                >
                  APPLY_CHANGES
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
