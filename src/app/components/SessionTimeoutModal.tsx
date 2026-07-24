import React from "react";
import { AlertTriangle } from "lucide-react";

interface SessionTimeoutModalProps {
  isOpen: boolean;
  secondsRemaining: number;
  onExtend: () => void;
  onLogout: () => void;
}

export const SessionTimeoutModal: React.FC<SessionTimeoutModalProps> = ({
  isOpen,
  secondsRemaining,
  onExtend,
  onLogout,
}) => {
  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl text-white">
        <div className="flex items-center gap-3 text-amber-400 mb-4">
          <AlertTriangle size={24} />
          <h2 className="text-lg font-bold">Session Inactivity Warning</h2>
        </div>

        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
          You have been inactive for a while. For security reasons, your session will automatically log out in:
        </p>

        <div className="text-center font-mono text-3xl font-bold text-amber-400 my-4 bg-slate-950 py-3 rounded-lg border border-slate-800">
          {formattedTime}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onLogout}
            className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 font-semibold text-slate-300 rounded-lg text-sm transition"
          >
            Log Out Now
          </button>
          <button
            onClick={onExtend}
            className="flex-1 py-2.5 bg-cyan-500 hover:bg-cyan-400 font-semibold text-slate-950 rounded-lg text-sm transition"
          >
            Extend Session
          </button>
        </div>
      </div>
    </div>
  );
};
