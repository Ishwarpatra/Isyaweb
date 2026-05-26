import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import logoImg from "../../imports/Logo_ISYA__1_-2.jpeg";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-[#000B1A] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none animate-pulse-glow bg-orange-500/5 blur-[150px]" />
      
      <div className="relative z-10">
        <div className="mb-8 animate-float">
          <img
            src={logoImg}
            alt="ISYA Logo"
            width="120"
            height="120"
            className="w-[120px] mx-auto drop-shadow-[0_0_24px_rgba(249,115,22,0.5)]"
          />
        </div>

        <h1 className="text-[clamp(4rem,12vw,8rem)] font-extrabold leading-none mb-4 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="text-white text-2xl font-bold mb-4">
          Lost in Space
        </h2>

        <p className="text-gray-500 max-w-sm mx-auto leading-relaxed mb-10">
          The page you're looking for has drifted into the cosmos. Let's get you back to mission control.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-pink-500 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>

      {/* Footer deco */}
      <div className="absolute bottom-10 left-0 right-0 font-mono text-xs text-gray-500 tracking-[0.3em] pointer-events-none">
        ERROR_CODE_404 // COORDINATES_UNKNOWN
      </div>
    </div>
  );
}
