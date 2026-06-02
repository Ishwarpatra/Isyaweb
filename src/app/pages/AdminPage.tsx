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

// --- Extracted Memoized View Components & Sub-forms ---

// 1. Dashboard View
interface DashboardViewProps {
  pendingUsers: any[];
  onApprove: (id: number) => void;
  onDeny: (id: number) => void;
}

const DashboardView = React.memo(({ pendingUsers, onApprove, onDeny }: DashboardViewProps) => {
  return (
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
              <p className="font-mono text-[11px] text-gray-400 tracking-widest mb-1">{stat.label}</p>
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
                    <stop offset="5%" stopColor="#EC4899" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip content={<TelemetryTooltip />} />
                <Area type="monotone" dataKey="members" stroke="#EC4899" strokeWidth={2} fillOpacity={1} fill="url(#colorMembers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5">
          <h4 className="font-mono text-xs text-blue-500 tracking-widest mb-6">// MISSION_SPECIALIZATION_RATIO</h4>
          <div className="h-[240px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SPECIALIZATION_DATA}>
                <PolarGrid stroke="#ffffff10" />
                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={11} />
                <Radar name="Agents" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.15} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Enlistment Queue */}
      <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-mono text-xs text-emerald-500 tracking-widest">// ENLISTMENT_QUEUE</h4>
          <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] text-emerald-500 bg-emerald-500/10 border border-emerald-500/20">
            {pendingUsers.length} PENDING_FILES
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/5 font-mono text-[11px] text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-4">Cadet / Contact</th>
                <th className="py-3 px-4">Node Sector</th>
                <th className="py-3 px-4">Enlistment Date</th>
                <th className="py-3 px-4">Clearance Specialty</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02] text-gray-300">
              {pendingUsers.length > 0 ? (
                pendingUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-4 px-4">
                      <p className="font-semibold text-white text-xs">{user.name}</p>
                      <p className="text-gray-500 text-[11px] font-mono">{user.email}</p>
                    </td>
                    <td className="py-4 px-4 font-mono text-[11px] text-pink-500/80">{user.region} ({user.country})</td>
                    <td className="py-4 px-4 text-gray-400">{user.date}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-blue-500/20 bg-blue-500/5 text-blue-400">
                        {user.interest}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => onApprove(user.id)}
                          className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
                          title="Approve cadet"
                        >
                          <CheckCircle size={14} />
                        </button>
                        <button
                          onClick={() => onDeny(user.id)}
                          className="p-1.5 rounded bg-red-500/10 border border-red-500/25 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                          title="Reject cadet file"
                        >
                          <XCircle size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-600 font-mono">
                    // ALL_FILES_SYNCED_AND_DISPATCHED
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
});

// 2. Animated WebSocket Telemetry Panel
const WebSocketTelemetryPanel = () => {
  const [latencyA, setLatencyA] = useState(12.4);
  const [latencyB, setLatencyB] = useState(14.1);
  const [latencyC, setLatencyC] = useState(42.9);
  const [isDOnline, setIsDOnline] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setLatencyA((prev) => +(prev + (Math.random() - 0.5) * 0.8).toFixed(1));
      setLatencyB((prev) => +(prev + (Math.random() - 0.5) * 0.6).toFixed(1));
      setLatencyC((prev) => +(prev + (Math.random() - 0.5) * 4.0).toFixed(1));
      if (Math.random() < 0.05) {
        setIsDOnline((prev) => !prev);
      }
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-mono text-xs text-pink-500">// REAL_TIME_WEBSOCKET_SIGNAL</h4>
          <span className="px-2 py-0.5 rounded font-mono text-[9px] text-amber-500 bg-amber-500/10 border border-amber-500/20 animate-pulse">
            SIMULATED FEED
          </span>
        </div>
        <p className="text-gray-400 text-xs mb-4">Tracking signal packet reception latencies across all downlink nodes.</p>
      </div>
      <div className="space-y-3 font-mono text-xs">
        <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5">
          <span className="text-emerald-500">SYS_DOWNLINK_A:</span>
          <span className="text-white">{latencyA} ms (99.8% STABLE)</span>
        </div>
        <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5">
          <span className="text-emerald-500">SYS_DOWNLINK_B:</span>
          <span className="text-white">{latencyB} ms (100% STABLE)</span>
        </div>
        <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5">
          <span className="text-amber-500">SYS_DOWNLINK_C:</span>
          <span className="text-white">{latencyC} ms (91.2% JITTER)</span>
        </div>
        <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5">
          <span className={isDOnline ? "text-emerald-500" : "text-red-500"}>SYS_DOWNLINK_D:</span>
          <span className="text-white">
            {isDOnline ? `${latencyA * 1.5} ms (95.4% LINKED)` : "OFFLINE (NO_CLEARANCE_BEACON)"}
          </span>
        </div>
      </div>
    </div>
  );
};

// 3. Analytics View
interface AnalyticsViewProps {
  faqAnalytics: any[];
  mentorAnalytics: any[];
}

const AnalyticsView = React.memo(({ faqAnalytics, mentorAnalytics }: AnalyticsViewProps) => {
  const totalFaqViews = faqAnalytics.reduce((acc, curr) => acc + curr.views, 0);
  const totalMentorBookings = mentorAnalytics.reduce((acc, curr) => acc + curr.bookings, 0);

  const analyticsStats = [
    { label: "TOTAL_FAQ_RESOLUTIONS", value: totalFaqViews.toLocaleString(), detail: "FAQ View Datalink Hits", color: "#EC4899" },
    { label: "SCHEDULED_MENTOR_DUETS", value: totalMentorBookings.toLocaleString(), detail: "Active Training Sessions", color: "#3B82F6" },
    { label: "NODE_COMM_HEALTH", value: "98.7%", detail: "Simulated Stable Handshake", color: "#10B981" },
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Insight Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {analyticsStats.map((stat) => (
          <div key={stat.label} className="p-5 rounded-2xl bg-gray-900/40 border border-white/5">
            <p className="font-mono text-xs text-gray-500 mb-1">{stat.label}</p>
            <h3 className="text-xl font-bold text-white">{stat.value}</h3>
            <p className="text-[11px] text-gray-500 font-mono mt-1">// {stat.detail}</p>
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
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip content={<TelemetryTooltip />} />
                <Bar dataKey="members" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <WebSocketTelemetryPanel />
      </div>

      {/* Dynamic Analytics Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQ views analytics table */}
        <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5">
          <h4 className="font-mono text-xs text-pink-500 mb-4">// CENTRAL_FAQ_VIEWS_TELEMETRY</h4>
          <div className="space-y-3">
            {faqAnalytics.length > 0 ? (
              faqAnalytics.map((faq, index) => (
                <div key={faq.id} className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5 text-xs">
                  <span className="text-gray-300 truncate max-w-[280px]" title={faq.question}>
                    {index + 1}. {faq.question}
                  </span>
                  <span className="font-mono text-pink-500 shrink-0 bg-pink-500/10 px-2.5 py-0.5 rounded-md border border-pink-500/20">
                    {faq.views} VIEWS
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center font-mono text-xs text-gray-500 py-6">// NO_FAQ_HITS_YET</p>
            )}
          </div>
        </div>

        {/* Mentor bookings analytics table */}
        <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5">
          <h4 className="font-mono text-xs text-blue-500 mb-4">// MENTOR_MATCHING_TELEMETRY</h4>
          <div className="space-y-3">
            {mentorAnalytics.length > 0 ? (
              mentorAnalytics.map((mentor, index) => (
                <div key={mentor.id} className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5 text-xs">
                  <span className="text-gray-300">
                    {index + 1}. {mentor.name}
                  </span>
                  <span className="font-mono text-blue-500 shrink-0 bg-blue-500/10 px-2.5 py-0.5 rounded-md border border-blue-500/20">
                    {mentor.bookings} BOOKINGS
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center font-mono text-xs text-gray-500 py-6">// NO_MENTOR_BOOKINGS_YET</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

// 4. Users View
interface UsersViewProps {
  registeredAgents: Agent[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onDeleteAgent: (id: number, name: string) => void;
}

const UsersView = React.memo(({ registeredAgents, searchQuery, onSearchChange, onDeleteAgent }: UsersViewProps) => {
  const filtered = registeredAgents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Filter registered agents by name, email, or role..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-white text-xs bg-[#05080F] border border-white/10 focus:border-pink-500/50 outline-none transition-colors"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-gray-900/40 p-6">
        <table className="w-full text-left font-sans text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/5 font-mono text-[11px] text-gray-500 uppercase tracking-wider">
              <th className="pb-3 px-4">Agent Identification</th>
              <th className="pb-3 px-4">Contact Coordinate</th>
              <th className="pb-3 px-4">Node Clearances</th>
              <th className="pb-3 px-4 text-right">Dossier Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02] text-gray-300">
            {filtered.length > 0 ? (
              filtered.map((agent) => {
                if (agent.isDeleted) {
                  return (
                    <tr key={agent.id} className="bg-red-500/5 transition-colors animate-[pulse_2s_infinite]">
                      <td colSpan={3} className="py-4 px-4 font-mono text-red-400 text-xs">
                        // AGENT_DELETION_IN_QUEUE :: {agent.name.toUpperCase()} (Undo available)
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-[11px] font-mono text-gray-500">// QUEUED</span>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={agent.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-4 px-4 font-semibold text-white text-xs">{agent.name}</td>
                    <td className="py-4 px-4 font-mono text-[11px] text-gray-400">{agent.email}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        agent.role === "admin"
                          ? "border-pink-500/30 bg-pink-500/10 text-pink-400"
                          : agent.role === "moderator"
                          ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                          : "border-blue-500/30 bg-blue-500/10 text-blue-400"
                      }`}>
                        {agent.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => onDeleteAgent(agent.id, agent.name)}
                        className="p-1.5 rounded hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 text-gray-500 hover:text-red-400 transition-all cursor-pointer inline-flex items-center"
                        title="Delete agent clearance"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-600 font-mono">
                  // NO_ACTIVE_DOSSIERS_MATCHING_FILTER
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

// 5. localized form components inside ContentView
const AddWebinarForm = ({ onAdd, userEmail }: { onAdd: (msg: string) => void; userEmail?: string }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !videoUrl || !desc) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const defaultImg = "https://images.unsplash.com/photo-1476156863127-a8f1e9dba2b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400";
    mockDb.addWebinar({
      title,
      date,
      image: image || defaultImg,
      videoUrl,
      description: desc,
      createdBy: userEmail || "admin@isya.space",
    });
    onAdd(`NEW_WEBINAR_ADDED // TITLE: ${title}`);
    toast.success("Webinar added successfully!");
    setTitle("");
    setDate("");
    setImage("");
    setVideoUrl("");
    setDesc("");
  };

  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5 max-w-xl">
      <h4 className="font-mono text-xs text-pink-500 mb-6">// ADD_WEBINAR_SIGNAL</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="webinarTitle" className="block font-mono text-xs text-gray-300 tracking-wider mb-2">WEBINAR_TITLE</label>
          <input
            id="webinarTitle"
            type="text"
            required
            placeholder="e.g. Astrophysics Traineeship Briefing"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="webinarDate" className="block font-mono text-xs text-gray-300 tracking-wider mb-2">BROADCAST_DATE</label>
            <input
              id="webinarDate"
              type="text"
              required
              placeholder="e.g. 15 JUNE 2026"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
            />
          </div>
          <div>
            <label htmlFor="webinarImg" className="block font-mono text-xs text-gray-300 tracking-wider mb-2">IMAGE_THUMBNAIL_URL (OPTIONAL)</label>
            <input
              id="webinarImg"
              type="text"
              placeholder="https://images.unsplash.com/..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="webinarUrl" className="block font-mono text-xs text-gray-300 tracking-wider mb-2">YOUTUBE_VIDEO_URL (OR ID)</label>
          <input
            id="webinarUrl"
            type="text"
            required
            placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
          />
        </div>
        <div>
          <label htmlFor="webinarDesc" className="block font-mono text-xs text-gray-300 tracking-wider mb-2">BRIEFING_DESCRIPTION</label>
          <textarea
            id="webinarDesc"
            rows={4}
            required
            placeholder="Provide a briefing summary vector details..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none resize-none"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-pink-500 text-white font-mono text-xs font-bold tracking-widest hover:bg-pink-500/90 cursor-pointer shadow-[0_0_10px_rgba(236,72,153,0.3)] transition-all animate-float"
        >
          SUBMIT_WEBINAR_SIGNAL
        </button>
      </form>
    </div>
  );
};

const AddFAQForm = ({ onAdd, userEmail }: { onAdd: (msg: string) => void; userEmail?: string }) => {
  const [category, setCategory] = useState<"GENERAL" | "MEMBERSHIP" | "COMMUNITY" | "ADMIN" | "MENTORSHIP">("GENERAL");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) {
      toast.error("Please provide both a question and an answer.");
      return;
    }
    mockDb.addFAQ({
      category,
      question,
      answer,
      createdBy: userEmail || "admin@isya.space",
      updatedAt: new Date().toISOString().split("T")[0],
    });
    onAdd(`NEW_FAQ_ADDED // CATEGORY: ${category} // QUESTION: ${question}`);
    toast.success("FAQ added successfully!");
    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5 max-w-xl">
      <h4 className="font-mono text-xs text-pink-500 mb-6">// ADD_FAQ_STREAM</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="faqCat" className="block font-mono text-xs text-gray-300 tracking-wider mb-2">FAQ_CATEGORY</label>
          <select
            id="faqCat"
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2.5 text-white text-xs outline-none cursor-pointer"
          >
            <option value="GENERAL">GENERAL</option>
            <option value="MEMBERSHIP">MEMBERSHIP</option>
            <option value="COMMUNITY">COMMUNITY</option>
            <option value="ADMIN">ADMIN</option>
            <option value="MENTORSHIP">MENTORSHIP</option>
          </select>
        </div>
        <div>
          <label htmlFor="faqQ" className="block font-mono text-xs text-gray-300 tracking-wider mb-2">QUESTION_TEXT</label>
          <input
            id="faqQ"
            type="text"
            required
            placeholder="e.g. How do I unlock node credentials?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
          />
        </div>
        <div>
          <label htmlFor="faqA" className="block font-mono text-xs text-gray-300 tracking-wider mb-2">ANSWER_TEXT</label>
          <textarea
            id="faqA"
            rows={4}
            required
            placeholder="Provide answer clearance details..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none resize-none"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-pink-500 text-white font-mono text-xs font-bold tracking-widest hover:bg-pink-500/90 cursor-pointer shadow-[0_0_10px_rgba(236,72,153,0.3)] transition-all"
        >
          SUBMIT_FAQ_RECORD
        </button>
      </form>
    </div>
  );
};

const AddPodcastForm = ({ onAdd }: { onAdd: (msg: string) => void }) => {
  const [title, setTitle] = useState("");
  const [episode, setEpisode] = useState("");
  const [guest, setGuest] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [freq, setFreq] = useState("98.6 MHz");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !episode || !guest || !duration || !date) {
      toast.error("Please fill in all required podcast fields.");
      return;
    }
    mockDb.addPodcast({
      title,
      episode: parseInt(episode, 10) || 0,
      guest,
      duration,
      date,
      freq,
    });
    onAdd(`NEW_PODCAST_ADDED // EPISODE: ${episode} // TITLE: ${title}`);
    toast.success("Podcast episode added successfully!");
    setTitle("");
    setEpisode("");
    setGuest("");
    setDuration("");
    setDate("");
  };

  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5 max-w-xl">
      <h4 className="font-mono text-xs text-pink-500 mb-6">// ADD_PODCAST_BEACON</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="podEp" className="block font-mono text-xs text-gray-300 tracking-wider mb-2">EPISODE_NUMBER</label>
            <input
              id="podEp"
              type="number"
              required
              placeholder="e.g. 12"
              value={episode}
              onChange={(e) => setEpisode(e.target.value)}
              className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
            />
          </div>
          <div>
            <label htmlFor="podFreq" className="block font-mono text-xs text-gray-300 tracking-wider mb-2">PODCAST_FREQ</label>
            <input
              id="podFreq"
              type="text"
              required
              placeholder="e.g. 98.6 MHz"
              value={freq}
              onChange={(e) => setFreq(e.target.value)}
              className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="podTitle" className="block font-mono text-xs text-gray-300 tracking-wider mb-2">EPISODE_TITLE</label>
            <input
              id="podTitle"
              type="text"
              required
              placeholder="e.g. Orbital Mechanics 101"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
            />
          </div>
          <div>
            <label htmlFor="podGuest" className="block font-mono text-xs text-gray-300 tracking-wider mb-2">GUEST_SPEAKER</label>
            <input
              id="podGuest"
              type="text"
              required
              placeholder="e.g. Dr. Jane Carter"
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
              className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="podDur" className="block font-mono text-xs text-gray-300 tracking-wider mb-2">DURATION_STRING</label>
            <input
              id="podDur"
              type="text"
              required
              placeholder="e.g. 45 MIN"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
            />
          </div>
          <div>
            <label htmlFor="podDate" className="block font-mono text-xs text-gray-300 tracking-wider mb-2">BROADCAST_DATE</label>
            <input
              id="podDate"
              type="text"
              required
              placeholder="e.g. 10 MAY 2026"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-pink-500 text-white font-mono text-xs font-bold tracking-widest hover:bg-pink-500/90 cursor-pointer shadow-[0_0_10px_rgba(236,72,153,0.3)] transition-all"
        >
          SUBMIT_PODCAST_BEACON
        </button>
      </form>
    </div>
  );
};

const AddAnnouncementForm = ({ onAdd, userEmail }: { onAdd: (msg: string) => void; userEmail?: string }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("PUBLISHED");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Please complete the announcement title and body content.");
      return;
    }
    mockDb.addAnnouncement({
      title,
      content,
      status,
      scheduledDate: new Date().toISOString().split("T")[0],
      createdBy: userEmail || "admin@isya.space",
    });
    onAdd(`NEW_ANNOUNCEMENT_ADDED // STATUS: ${status} // TITLE: ${title}`);
    toast.success("Announcement created successfully!");
    setTitle("");
    setContent("");
  };

  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5 max-w-xl">
      <h4 className="font-mono text-xs text-pink-500 mb-6">// NEW_ANNOUNCEMENT_VECTOR</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="annTitle" className="block font-mono text-xs text-gray-300 tracking-wider mb-2">ANNOUNCEMENT_TITLE</label>
            <input
              id="annTitle"
              type="text"
              required
              placeholder="e.g. System upgrade sector-5 completion"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none"
            />
          </div>
          <div>
            <label htmlFor="annStatus" className="block font-mono text-xs text-gray-300 tracking-wider mb-2">BROADCAST_STATUS</label>
            <select
              id="annStatus"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none cursor-pointer"
            >
              <option value="PUBLISHED">PUBLISHED</option>
              <option value="DRAFT">DRAFT</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="annContent" className="block font-mono text-xs text-gray-300 tracking-wider mb-2">CONTENT_BODY</label>
          <textarea
            id="annContent"
            rows={4}
            required
            placeholder="Type announcement body copy..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-[#05080F] border border-white/10 focus:border-pink-500/50 rounded-lg px-3 py-2 text-white text-xs outline-none resize-none"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-pink-500 text-white font-mono text-xs font-bold tracking-widest hover:bg-pink-500/90 cursor-pointer shadow-[0_0_10px_rgba(236,72,153,0.3)] transition-all"
        >
          BROADCAST_ANNOUNCEMENT
        </button>
      </form>
    </div>
  );
};

// 6. Content tab wrapper
interface ContentViewProps {
  auditLogs: string[];
  onClearLogs: () => void;
  onAddAuditLog: (msg: string) => void;
  userEmail?: string;
  subTab: "log" | "webinar" | "faq" | "podcast" | "announcement";
  onSubTabChange: (tab: "log" | "webinar" | "faq" | "podcast" | "announcement") => void;
}

const ContentView = React.memo(({ auditLogs, onClearLogs, onAddAuditLog, userEmail, subTab, onSubTabChange }: ContentViewProps) => {
  return (
    <div className="space-y-6">
      {/* Sub-tab selection menu */}
      <div className="flex gap-2 border-b border-white/5 pb-4 overflow-x-auto">
        {(["log", "webinar", "faq", "podcast", "announcement"] as const).map((sub) => (
          <button
            key={sub}
            onClick={() => onSubTabChange(sub)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer ${
              subTab === sub
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

      {subTab === "log" && (
        <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5 flex flex-col h-[500px]">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <h4 className="font-mono text-xs text-pink-500 tracking-widest">// DECRYPTED_SIGNAL_STREAM</h4>
            <button 
              onClick={onClearLogs}
              className="text-gray-500 hover:text-white font-mono text-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-500"
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

      {subTab === "webinar" && <AddWebinarForm onAdd={onAddAuditLog} userEmail={userEmail} />}
      {subTab === "faq" && <AddFAQForm onAdd={onAddAuditLog} userEmail={userEmail} />}
      {subTab === "podcast" && <AddPodcastForm onAdd={onAddAuditLog} />}
      {subTab === "announcement" && <AddAnnouncementForm onAdd={onAddAuditLog} userEmail={userEmail} />}
    </div>
  );
});

// 7. Settings View
interface SettingsViewProps {
  flags: any;
  onToggleFlag: (key: string) => void;
  onChangeEnvironment: (val: string) => void;
}

const SettingsView = React.memo(({ flags, onToggleFlag, onChangeEnvironment }: SettingsViewProps) => {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5 max-w-2xl">
        <h4 className="font-mono text-xs text-blue-500 tracking-widest border-b border-white/5 pb-4 mb-6">// SYS_ENVIRONMENT_VARIABLES</h4>
        
        <div className="space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
            <div>
              <p className="text-white font-bold">VITE_ENABLE_ADMIN_PANEL</p>
              <p className="text-gray-500 text-xs mt-1">If false, redirects unauthorized sectors back to base terminal.</p>
            </div>
            <button
              onClick={() => onToggleFlag("VITE_ENABLE_ADMIN_PANEL")}
              className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                flags.VITE_ENABLE_ADMIN_PANEL ? "bg-pink-500" : "bg-gray-800"
              }`}
              aria-label="Toggle VITE_ENABLE_ADMIN_PANEL"
            >
              <div className={`bg-white w-4 h-4 rounded-full transition-transform ${
                flags.VITE_ENABLE_ADMIN_PANEL ? "translate-x-6" : ""
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
            <div>
              <p className="text-white font-bold">VITE_ENABLE_COMMUNITY_FEATURES</p>
              <p className="text-gray-500 text-xs mt-1">Enables/disables real-time broadcast uploads and connections.</p>
            </div>
            <button
              onClick={() => onToggleFlag("VITE_ENABLE_COMMUNITY_FEATURES")}
              className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                flags.VITE_ENABLE_COMMUNITY_FEATURES ? "bg-pink-500" : "bg-gray-800"
              }`}
              aria-label="Toggle VITE_ENABLE_COMMUNITY_FEATURES"
            >
              <div className={`bg-white w-4 h-4 rounded-full transition-transform ${
                flags.VITE_ENABLE_COMMUNITY_FEATURES ? "translate-x-6" : ""
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
            <div>
              <p className="text-white font-bold">VITE_ENVIRONMENT</p>
              <p className="text-gray-500 text-xs mt-1">Toggles logging verbosities and simulated sandbox environments.</p>
            </div>
            <select
              value={flags.VITE_ENVIRONMENT}
              onChange={(e) => onChangeEnvironment(e.target.value)}
              className="bg-[#05080F] border border-white/10 rounded px-3 py-1.5 text-white outline-none cursor-pointer"
              aria-label="Select environment"
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
});

export function AdminPage() {
  const { user, isAdmin } = useAuth();
  
  // Sub-tab state
  const [contentSubTab, setContentSubTab] = useState<"log" | "webinar" | "faq" | "podcast" | "announcement">("log");

  // States
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
  const pendingTimeouts = useRef<Record<number, NodeJS.Timeout>>({});

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

  // Handle mobile/desktop resize transitions for accessibility and sidebar state
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    
    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        const mainEl = document.querySelector("main");
        const headerEl = document.querySelector("header");
        mainEl?.removeAttribute("aria-hidden");
        headerEl?.removeAttribute("aria-hidden");
        setSidebarOpen(false);
      }
    };

    handleResize(mediaQuery);
    mediaQuery.addEventListener("change", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  // Cleanup timeouts on unmount to prevent leaks
  useEffect(() => {
    return () => {
      Object.values(pendingTimeouts.current).forEach((tId) => clearTimeout(tId));
    };
  }, []);

  // Focus trap / overlay logic
  useEffect(() => {
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

  const addAuditLog = (msg: string) => {
    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19);
    const newEntry = `[${timestamp}] ${msg}`;
    setAuditLogs((prev) => {
      const updated = [newEntry, ...prev];
      sessionStorage.setItem("isya_audit_logs", JSON.stringify(updated));
      return updated;
    });
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

    setRegisteredAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isDeleted: true } : a))
    );
    addAuditLog(`Active agent DELETED: ${target.name} (${target.email})`);

    const timerId = setTimeout(() => {
      setRegisteredAgents((prev) => prev.filter((a) => !(a.id === id && a.isDeleted)));
      delete pendingTimeouts.current[id];
    }, 5000);
    pendingTimeouts.current[id] = timerId;

    toast.warning(`Agent ${name} deleted from databases.`, {
      action: {
        label: "Undo",
        onClick: () => {
          const tId = pendingTimeouts.current[id];
          if (tId) {
            clearTimeout(tId);
            delete pendingTimeouts.current[id];
          }
          setRegisteredAgents((prev) =>
            prev.map((a) => (a.id === id ? { ...a, isDeleted: false } : a))
          );
          addAuditLog(`Undo command: Agent deletion cancelled for ${name}`);
          toast.info(`Agent dossier restored for ${name}`);
        },
      },
    });
  };

  const toggleFlag = (key: string) => {
    setFlags((prev) => {
      if (key in prev) {
        const k = key as keyof typeof prev;
        const updated = { ...prev, [k]: !prev[k] };
        addAuditLog(`System Config Flag updated: ${key} = ${updated[k]}`);
        toast.success(`Flag ${key} toggled.`);
        localStorage.setItem("isya_sys_flags", JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  };

  const changeEnvironment = (val: string) => {
    setFlags((prev) => {
      const updated = { ...prev, VITE_ENVIRONMENT: val };
      addAuditLog(`VITE_ENVIRONMENT updated to: ${val.toUpperCase()}`);
      toast.success(`Environment updated to ${val}`);
      localStorage.setItem("isya_sys_flags", JSON.stringify(updated));
      return updated;
    });
  };

  // Compute analytics memoized values
  const { faqAnalytics, mentorAnalytics } = React.useMemo(() => {
    const { faqViews, mentorBookings } = mockDb.getAnalyticsData();
    const faqs = mockDb.getFAQs();
    const mentors = mockDb.getMentors();

    const faq = faqs
      .map((f) => ({
        id: f.id,
        question: f.question,
        views: faqViews[f.id] || 0,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    const mentor = mentors
      .map((m) => ({
        id: m.id,
        name: m.name,
        bookings: mentorBookings[m.id] || 0,
      }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 5);

    return { faqAnalytics: faq, mentorAnalytics: mentor };
  }, [activeSection]);

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
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-pink-500 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-pink-500 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-pink-500 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-pink-500 rounded-br-lg" />
          
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
          <img src={logoImg} alt="ISYA" width="36" height="36" className="w-9 h-9 object-contain drop-shadow-[0_0_8px_rgba(249,115,22,0.35)]" />
          <div className="font-mono">
            <p className="text-xs text-pink-500 tracking-wider font-bold">ISYA_ADMIN</p>
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
              aria-label="Open sidebar menu"
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
            {activeSection === "dashboard" && (
              <DashboardView
                pendingUsers={pendingUsers}
                onApprove={handleApprove}
                onDeny={handleDeny}
              />
            )}
            {activeSection === "analytics" && (
              <AnalyticsView
                faqAnalytics={faqAnalytics}
                mentorAnalytics={mentorAnalytics}
              />
            )}
            {activeSection === "users" && (
              <UsersView
                registeredAgents={registeredAgents}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onDeleteAgent={handleDeleteAgent}
              />
            )}
            {activeSection === "content" && (
              <ContentView
                auditLogs={auditLogs}
                onClearLogs={() => {
                  setAuditLogs([]);
                  sessionStorage.setItem("isya_audit_logs", JSON.stringify([]));
                }}
                onAddAuditLog={addAuditLog}
                userEmail={user?.email}
                subTab={contentSubTab}
                onSubTabChange={setContentSubTab}
              />
            )}
            {activeSection === "settings" && (
              <SettingsView
                flags={flags}
                onToggleFlag={toggleFlag}
                onChangeEnvironment={changeEnvironment}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
