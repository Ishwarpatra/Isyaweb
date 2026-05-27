import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Shield, ShieldAlert, CheckCircle, Trash2, Layers, AlertTriangle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { mockDb, ModerationItem } from "../utils/mockDb";
import { useAuth } from "../hooks/useAuth";

export function ModerationPage() {
  const navigate = useNavigate();
  const { user, isModerator } = useAuth();
  const [queue, setQueue] = useState<ModerationItem[]>([]);
  const [filter, setFilter] = useState<"PENDING" | "APPROVED" | "REMOVED">("PENDING");

  // Load moderation queue
  useEffect(() => {
    setQueue(mockDb.getModerationQueue());
  }, []);

  // Guard routing permissions
  if (!user || !isModerator) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070B14] p-6 stardust">
        <div className="w-full max-w-md p-8 rounded-2xl border border-red-500/20 bg-red-500/5 text-center flex flex-col items-center gap-4 relative hud-corners">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-500/30 rounded-tl-lg" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-500/30 rounded-br-lg" />
          
          <ShieldAlert className="text-red-500 animate-pulse" size={42} />
          <h2 className="text-white text-xl font-bold font-mono">// ACCESS_DENIED</h2>
          <p className="text-gray-400 text-xs leading-relaxed">
            Security clearance level 3 is required. Your current credentials do not grant moderation permissions.
          </p>
          <Link to="/" className="mt-4 px-6 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-red-500/20 border border-red-500/40 hover:bg-red-500/30 transition-colors focus:outline-none focus:ring-1 focus:ring-red-500">
            ← RETURN_TO_BASE_TERMINAL
          </Link>
        </div>
      </div>
    );
  }

  const handleApprove = (id: string) => {
    mockDb.updateModerationStatus(id, "APPROVED");
    toast.success("Content approved and restored to transmissions feed.");
    setQueue(mockDb.getModerationQueue());
  };

  const handleRemove = (id: string) => {
    mockDb.updateModerationStatus(id, "REMOVED");
    toast.warning("Content removed from transmissions feed.");
    setQueue(mockDb.getModerationQueue());
  };

  const filteredQueue = queue.filter((item) => item.status === filter);

  return (
    <main className="min-h-screen bg-[#070B14] stardust pb-24 pt-28 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs text-pink-500 tracking-[0.25em] uppercase">
              // MODERATION_CONTROL // CLEARANCE_LEVEL_3
            </span>
            <h1 className="text-white text-3xl font-extrabold tracking-tight mt-1 leading-tight flex items-center gap-2">
              <Shield className="text-pink-500" size={28} />
              Moderation Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-2 max-w-xl">
              Audit reported telemetry, flag transmissions violating science communications protocols, and moderate user reports.
            </p>
          </div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-mono font-bold tracking-widest transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            ADMIN_DOCK
          </Link>
        </div>

        {/* Filters and Queue info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-2" role="tablist" aria-label="Moderation status filters">
            {(["PENDING", "APPROVED", "REMOVED"] as const).map((status) => {
              const count = queue.filter(q => q.status === status).length;
              return (
                <button
                  key={status}
                  role="tab"
                  aria-selected={filter === status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                    filter === status
                      ? "bg-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                      : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {status} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Report Cards Grid */}
        {filteredQueue.length > 0 ? (
          <div className="space-y-4">
            {filteredQueue.map((item) => (
              <div 
                key={item.id}
                className="relative rounded-2xl p-6 bg-gray-950/70 border border-white/5 hover:border-pink-500/15 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between hud-corners"
              >
                {/* HUD borders */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/10 rounded-tl" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10 rounded-br" />

                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[9px] text-pink-500 bg-pink-500/5 px-2 py-0.5 rounded border border-pink-500/10 uppercase tracking-widest">
                      {item.contentType} // ID_{item.contentId}
                    </span>
                    <span className="font-mono text-[9px] text-gray-500">
                      FLAGGED_BY: {item.flaggedBy}
                    </span>
                  </div>

                  <p className="text-white text-sm bg-black/40 rounded-xl p-4 border border-white/5 leading-relaxed italic">
                    "{item.content}"
                  </p>

                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-orange-400">
                    <AlertTriangle size={12} />
                    <span>REASON: {item.reason}</span>
                  </div>
                </div>

                {/* Action buttons */}
                {item.status === "PENDING" && (
                  <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 text-white hover:bg-emerald-500/90 text-xs font-mono font-bold tracking-widest transition-all cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.2)] active:scale-95"
                    >
                      <CheckCircle size={14} />
                      APPROVE
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-500 text-white hover:bg-red-500/90 text-xs font-mono font-bold tracking-widest transition-all cursor-pointer shadow-[0_0_12px_rgba(239,68,68,0.2)] active:scale-95"
                    >
                      <Trash2 size={14} />
                      DECOMMISSION
                    </button>
                  </div>
                )}

                {item.status !== "PENDING" && (
                  <div className="font-mono text-[10px] text-gray-500 shrink-0">
                    DECISION: {item.status}
                  </div>
                )}

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl bg-white/2 border border-white/5">
            <Layers className="mx-auto text-gray-600 mb-4" size={32} />
            <p className="font-mono text-xs text-gray-500">NO_RECORDS_FOUND // QUEUE_SYNCHRONIZED</p>
            <p className="text-gray-400 text-sm mt-1">There are no reported transmissions matching this category.</p>
          </div>
        )}

      </div>
    </main>
  );
}
