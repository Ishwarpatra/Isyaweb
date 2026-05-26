import { useEffect } from "react";
import { useLocation, Link } from "react-router";
import { ShieldCheck, Scale, FileText, ArrowLeft } from "lucide-react";

export function GuidelinesPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <div className="stardust bg-[#0B0F19] min-h-screen text-gray-300">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs text-pink-500 hover:text-pink-400 transition-colors">
          <ArrowLeft size={16} />
          BACK_TO_TERMINAL
        </Link>

        {/* Header */}
        <div className="border-b border-white/5 pb-8">
          <p className="font-mono text-pink-500 text-xs tracking-[0.16em] mb-2">// LEGAL_PROTOCOLS :: SECURITY_DIVISION</p>
          <h1 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            System Protocols & Guidelines
          </h1>
          <p className="text-gray-500 text-xs font-mono mt-2">LAST_MODIFIED: epoch 2026-05-26T20:42:11</p>
        </div>

        {/* SECTION 1: Community Guidelines */}
        <section id="community" className="space-y-4">
          <div className="flex items-center gap-3 text-white">
            <ShieldCheck className="text-[#FFA500]" size={22} />
            <h2 className="text-lg font-bold font-mono tracking-wider">// 01_COMMUNITY_CODE_OF_CONDUCT</h2>
          </div>
          <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-4 text-xs leading-relaxed">
            <p>
              The International Space Youth Association (ISYA) is committed to providing a safe, open, and collaborative environment for youth scientists, aerospace engineers, and dreamers globally. Cadets must adhere to the following values:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li><strong>Scientific Integrity:</strong> Present your research and telemetry results honestly. Plagiarism or fraudulent data collection is strictly prohibited.</li>
              <li><strong>Mutual Respect:</strong> Collaborate across national and cultural borders. Harassment, discrimination, or abusive communications will result in instant clearance decommissioning.</li>
              <li><strong>Mentorship & Cooperation:</strong> Support younger and less experienced cadets. Share knowledge, tools, and code libraries openly.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 2: Terms of Service */}
        <section id="terms" className="space-y-4">
          <div className="flex items-center gap-3 text-white">
            <Scale className="text-pink-500" size={22} />
            <h2 className="text-lg font-bold font-mono tracking-wider">// 02_TERMS_OF_SERVICE</h2>
          </div>
          <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-4 text-xs leading-relaxed">
            <p>
              By accessing the ISYA node network and creating an account (enlistment request), you agree to comply with the terms set forth by our security division:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li><strong>Clearance Levels:</strong> Users are granted basic clearance. Do not attempt to bypass access controls or override restricted directories (such as `/admin`) without clearance credentials.</li>
              <li><strong>System Abuse:</strong> Do not overload our telemetry relays, deploy automated web spiders, or inject harmful scripts. All connection details are audited in the transmission logs.</li>
              <li><strong>Termination of Service:</strong> ISYA command reserves the right to suspend or terminate any cadet credential if protocols are violated.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 3: Privacy Policy */}
        <section id="privacy" className="space-y-4">
          <div className="flex items-center gap-3 text-white">
            <FileText className="text-blue-500" size={22} />
            <h2 className="text-lg font-bold font-mono tracking-wider">// 03_PRIVACY_POLICY</h2>
          </div>
          <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-4 text-xs leading-relaxed">
            <p>
              We prioritize the encryption and privacy of our global cadet network. Here is how we manage transmission metadata:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li><strong>Log Audits:</strong> We store basic logs (IP coordinates, email identifiers, interest specializations) to prevent malicious network flooding.</li>
              <li><strong>Session Data:</strong> Temporary browser storage (sessionStorage) is utilized to track active login states. No persistent tracking beacons are embedded.</li>
              <li><strong>Security:</strong> All transmissions between your local terminal and our main database nodes are encrypted via SSL. We do not sell cadet details to third-party institutions.</li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
}
