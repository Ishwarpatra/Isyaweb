import { useState, useEffect } from "react";
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

function TelemetryTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="p-3 bg-gray-900/95 border border-pink-500/20 rounded-lg font-mono text-[0.65rem] text-gray-400">
      <p className="text-pink-500 mb-1 tracking-widest">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name.toUpperCase()}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

function AccessDenied({ onBypass }: { onBypass: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05080F]">
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(239,68,68,0.015)_3px,rgba(239,68,68,0.015)_6px)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none animate-pulse-glow bg-red-500/5 blur-[150px]" />

      <div className="relative z-10 text-center px-4">
        <div className="inline-flex flex-col items-center p-10 rounded-2xl bg-gray-900/60 backdrop-blur-2xl border border-red-500/20 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-500 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-500 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-500 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-500 rounded-br-lg" />

          <ShieldX size={52} className="mb-5 text-red-500" />
          <div className="font-mono text-[0.7rem] text-red-500 tracking-[0.2em] mb-3">
            INCIDENT_LOG :: EVENT_ID_42691
          </div>
          <h1 className="font-mono text-[clamp(2rem,5vw,3rem)] font-bold text-red-500 tracking-wider leading-none mb-2">
            ACCESS DENIED
          </h1>
          <div className="font-mono text-[0.75rem] text-gray-700 tracking-widest mb-6">
            // INCIDENT LOGGED // SECTOR: ADMIN_PORTAL
          </div>
          <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-8">
            Your credentials do not meet the required clearance level for this sector.
            All access attempts are recorded and reviewed by the Security Division.
          </p>
          <button
            onClick={onBypass}
            className="px-8 py-3 rounded-xl font-mono text-[0.7rem] font-bold tracking-widest text-red-500 bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 transition-all"
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

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [sidebarOpen]);

  if (!accessGranted) {
    return <AccessDenied onBypass={() => setAccessGranted(true)} />;
  }

  const handleApprove = (id: number) => setPendingUsers((prev) => prev.filter((u) => u.id !== id));
  const handleDeny = (id: number) => setPendingUsers((prev) => prev.filter((u) => u.id !== id));

  return (
    <div className="flex h-screen overflow-hidden bg-[#05080F]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[220px] bg-[#05080F]/98 backdrop-blur-2xl border-r border-pink-500/10 transition-transform duration-300 md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-4 h-16 border-b border-pink-500/10">
          <img src={logoImg} alt="ISYA" className="w-9 drop-shadow-[0_0_8px_rgba(249,115,22,0.35)]" />
          <div className="font-mono">
            <p className="text-[0.65rem] text-pink-500 tracking-wider">ISYA_ADMIN</p>
            <p className="text-[0.55rem] text-gray-700 tracking-widest">CLEARANCE_LVL_5</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <p className="px-2 mb-4 font-mono text-gray-800 text-[0.6rem] tracking-[0.2em]">
            // NAVIGATION
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => { setActiveSection(id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-[0.62rem] tracking-wider transition-all ${
                    activeSection === id 
                      ? "bg-pink-500/10 text-pink-500 border-l-2 border-pink-500 font-bold" 
                      : "text-gray-600 hover:text-gray-300"
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-pink-500/5 border border-pink-500/10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-blue-500 flex items-center justify-center shrink-0">
              <span className="text-white text-[0.6rem] font-bold font-mono">AD</span>
            </div>
            <div className="min-w-0 font-mono">
              <p className="text-[0.62rem] text-gray-400 truncate">CMDR_ADMIN</p>
              <p className="text-[0.55rem] text-pink-500 truncate">SUPER_ADMIN</p>
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
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-400">
              <Menu size={20} />
            </button>
            <h2 className="font-mono text-[0.7rem] text-gray-500 tracking-[0.2em]">
              {NAV_ITEMS.find(n => n.id === activeSection)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[0.6rem] text-emerald-500">SYS_OPTIMAL</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="p-5 rounded-2xl bg-gray-900/40 border border-white/5 relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-lg" style={{ background: `${stat.color}15`, color: stat.color }}>
                        <stat.icon size={18} />
                      </div>
                      <span className="font-mono text-[0.6rem] text-emerald-500">{stat.change}</span>
                    </div>
                    <p className="font-mono text-[0.6rem] text-gray-600 tracking-widest mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                  </div>
                  <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5">
                <h4 className="font-mono text-[0.65rem] text-pink-500 tracking-widest mb-6">// AGENT_GROWTH_CURVE</h4>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MEMBER_GROWTH}>
                      <defs>
                        <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      <XAxis dataKey="month" stroke="#4B5563" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip content={<TelemetryTooltip />} />
                      <Area type="monotone" dataKey="members" stroke="#EC4899" fillOpacity={1} fill="url(#colorMembers)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5">
                <h4 className="font-mono text-[0.65rem] text-blue-500 tracking-widest mb-6">// SPECIALIZATION_MATRIX</h4>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={SPECIALIZATION_DATA}>
                      <PolarGrid stroke="#ffffff08" />
                      <PolarAngleAxis dataKey="subject" stroke="#4B5563" fontSize={9} />
                      <Radar name="Agents" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.5} />
                      <Tooltip content={<TelemetryTooltip />} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Tables Section */}
            <div className="p-6 rounded-2xl bg-gray-900/40 border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-mono text-[0.65rem] text-orange-500 tracking-widest">// PENDING_CLEARANCE_REQUESTS</h4>
                <span className="font-mono text-[0.6rem] text-gray-700">{pendingUsers.length} PENDING</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="pb-4 font-mono text-[0.6rem] text-gray-600 tracking-widest">IDENTIFIER</th>
                      <th className="pb-4 font-mono text-[0.6rem] text-gray-600 tracking-widest">SECTOR_INTEREST</th>
                      <th className="pb-4 font-mono text-[0.6rem] text-gray-600 tracking-widest">TIMESTAMP</th>
                      <th className="pb-4 text-right font-mono text-[0.6rem] text-gray-600 tracking-widest">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {pendingUsers.map((user) => (
                      <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center font-mono text-[0.65rem] text-gray-400">
                              {user.country}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{user.name}</p>
                              <p className="text-[0.65rem] text-gray-600 font-mono">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="font-mono text-[0.6rem] text-gray-400 bg-white/5 px-2 py-1 rounded">
                            {user.interest}
                          </span>
                        </td>
                        <td className="py-4 font-mono text-[0.65rem] text-gray-600">{user.date}</td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleApprove(user.id)}
                              className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition-colors"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeny(user.id)}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                            >
                              <XCircle size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
