import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import logoImg from "../../imports/Logo_ISYA__1_-2.jpeg";

export function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: "#000B1A" }}
    >
      <div className="mb-6 animate-float">
        <img
          src={logoImg}
          alt="ISYA"
          style={{
            width: 120,
            filter: "drop-shadow(0 0 24px rgba(249,115,22,0.5))",
          }}
        />
      </div>

      <h1
        className="text-white mb-2"
        style={{ fontSize: "clamp(4rem, 12vw, 8rem)", fontWeight: 800, lineHeight: 1, background: "linear-gradient(135deg, #FFA500, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
      >
        404
      </h1>

      <h2 className="text-white mb-3" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
        Lost in Space
      </h2>

      <p style={{ color: "#7A8894", maxWidth: 380, lineHeight: 1.7, marginBottom: "2.5rem" }}>
        The page you're looking for has drifted into the cosmos. Let's get you back to mission
        control.
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 px-8 py-3.5 rounded-xl transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, #FFA500, #EC4899)",
          color: "#fff",
          fontWeight: 600,
          boxShadow: "0 0 25px rgba(255,165,0,0.3)",
        }}
      >
        <ArrowLeft size={18} />
        Back to Home
      </Link>
    </div>
  );
}
