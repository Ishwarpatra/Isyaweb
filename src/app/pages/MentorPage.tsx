import { useState, useEffect, useRef } from "react";
import { Users, GraduationCap, Calendar, Clock, Star, FileText, CheckCircle2, ChevronRight, X, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { mockDb, Mentor } from "../utils/mockDb";
import { useAuth } from "../hooks/useAuth";

export function MentorPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"find" | "become">("find");
  const [mentors, setMentors] = useState<Mentor[]>([]);
  
  // Booking modal state
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingTopic, setBookingTopic] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [submittingBooking, setSubmittingBooking] = useState(false);

  // Application form state
  const [applyName, setApplyName] = useState("");
  const [applyEmail, setApplyEmail] = useState("");
  const [applySpecialties, setApplySpecialties] = useState("");
  const [applyExperience, setApplyExperience] = useState("");
  const [applyAvailability, setApplyAvailability] = useState("");
  const [applyBio, setApplyBio] = useState("");
  const [submittingApp, setSubmittingApp] = useState(false);

  const modalCloseRef = useRef<HTMLButtonElement>(null);

  // Load mentors
  useEffect(() => {
    setMentors(mockDb.getMentors());
  }, []);

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to book a mentorship session.");
      return;
    }
    if (!bookingDate || !bookingTime || !bookingTopic) {
      toast.error("Please fill in all required scheduling parameters.");
      return;
    }

    setSubmittingBooking(true);
    setTimeout(() => {
      setSubmittingBooking(false);
      toast.success(`Booking request for ${selectedMentor?.name} submitted! Confirmation sent to ${user.email}.`);
      
      // Update availability status in mock DB
      if (selectedMentor) {
        mockDb.updateMentor(selectedMentor.id, { status: "Fully Booked" });
        setMentors(mockDb.getMentors());
      }
      
      setSelectedMentor(null);
      setBookingDate("");
      setBookingTime("");
      setBookingTopic("");
      setBookingNotes("");
    }, 400);
  };

  const handleApplyMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyName || !applyEmail || !applySpecialties || !applyExperience || !applyAvailability || !applyBio) {
      toast.error("Please complete all dossier registration fields.");
      return;
    }

    setSubmittingApp(true);
    setTimeout(() => {
      setSubmittingApp(false);
      
      // Save new mentor profile to database
      const newMentor = mockDb.addMentor({
        name: applyName,
        avatar: applyName.split(" ").map(n => n.charAt(0)).join("").toUpperCase().slice(0, 2),
        specialties: applySpecialties.split(",").map(s => s.trim()),
        experience: applyExperience,
        availability: applyAvailability,
        bio: applyBio,
        status: "Available",
      });

      toast.success("Dossier submitted! You are now listed as an active ISYA Mentor.");
      setMentors((prev) => [...prev, newMentor]);
      setActiveTab("find");

      // Reset form
      setApplyName("");
      setApplyEmail("");
      setApplySpecialties("");
      setApplyExperience("");
      setApplyAvailability("");
      setApplyBio("");
    }, 400);
  };

  // Close modal on Escape
  useEffect(() => {
    if (selectedMentor) {
      document.body.style.overflow = "hidden";
      modalCloseRef.current?.focus();
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedMentor(null);
      };
      window.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [selectedMentor]);

  return (
    <main className="min-h-screen bg-[#070B14] stardust pb-24 pt-28 relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-pink-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-pink-500 tracking-[0.25em] uppercase">
            // CADET_NETWORK // MENTORSHIP_DOCK
          </span>
          <h1 className="text-white text-4xl font-extrabold tracking-tight mt-2 leading-tight">
            Share Your Expertise or Find Guidance
          </h1>
          <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Link with senior scientists, engineering flight officers, and policy researchers to guide your orbital projects.
          </p>

          {/* Toggle buttons */}
          <div className="flex items-center justify-center mt-10">
            <div className="p-1 rounded-2xl bg-white/5 border border-white/5 flex gap-1">
              <button
                onClick={() => setActiveTab("find")}
                className={`px-6 py-3 rounded-xl font-mono text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                  activeTab === "find"
                    ? "bg-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                FIND_A_MENTOR
              </button>
              <button
                onClick={() => setActiveTab("become")}
                className={`px-6 py-3 rounded-xl font-mono text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                  activeTab === "become"
                    ? "bg-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                BECOME_A_MENTOR
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Find a Mentor */}
        {activeTab === "find" && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mentors.map((mentor) => (
                <div 
                  key={mentor.id}
                  className="group relative rounded-2xl p-6 bg-gray-950/70 border border-white/5 hover:border-pink-500/30 hover:shadow-[0_0_30px_rgba(236,72,153,0.12)] transition-all duration-300 flex flex-col h-full hud-corners"
                >
                  {/* Status Badge */}
                  <div className="absolute top-6 right-6">
                    <span className={`px-2.5 py-1 rounded-md font-mono text-[9px] font-bold tracking-wider border ${
                      mentor.status === "Available"
                        ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5"
                        : "text-orange-400 border-orange-500/20 bg-orange-500/5"
                    }`}>
                      {mentor.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Header info */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-pink-500/10 border border-pink-500/25 flex items-center justify-center font-mono text-lg font-bold text-pink-500 group-hover:scale-105 transition-transform duration-300">
                      {mentor.avatar}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base tracking-wide group-hover:text-pink-400 transition-colors">
                        {mentor.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1 font-mono text-[10px] text-gray-500">
                        <GraduationCap size={12} />
                        <span>EXP // {mentor.experience}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-1 line-clamp-3">
                    {mentor.bio}
                  </p>

                  {/* Specialties tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {mentor.specialties.map((spec) => (
                      <span 
                        key={spec}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-gray-400 font-mono"
                      >
                        {spec.toUpperCase()}
                      </span>
                    ))}
                  </div>

                  {/* Footer booking link */}
                  <div className="pt-5 border-t border-white/5 flex items-center justify-between gap-4 mt-auto">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-[8px] text-gray-600 tracking-wider">AVAILABILITY</span>
                      <span className="font-mono text-[10px] text-white flex items-center gap-1 text-gray-300">
                        <Calendar size={10} className="text-pink-500" />
                        {mentor.availability}
                      </span>
                    </div>

                    <button
                      disabled={mentor.status !== "Available"}
                      onClick={() => setSelectedMentor(mentor)}
                      className={`px-4 py-2.5 rounded-xl font-mono text-[10px] font-bold tracking-widest cursor-pointer transition-all ${
                        mentor.status === "Available"
                          ? "bg-pink-500 text-white hover:bg-pink-500/90 shadow-[0_0_15px_rgba(236,72,153,0.3)] active:scale-95"
                          : "bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed"
                      }`}
                    >
                      REQUEST_MATCH
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Become a Mentor */}
        {activeTab === "become" && (
          <div className="max-w-2xl mx-auto rounded-2xl bg-gray-900/60 backdrop-blur-2xl border border-pink-500/15 p-8 shadow-2xl relative hud-corners">
            
            {/* HUD details */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-pink-500/30 rounded-tl-lg" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-pink-500/30 rounded-br-lg" />

            <div className="mb-8">
              <h2 className="text-white text-xl font-bold tracking-tight mb-2">Mentor Dossier Application</h2>
              <p className="font-mono text-gray-500 text-xs tracking-wider">
                JOIN_MISSION_FLIGHT_STAFF // REGISTRATION
              </p>
            </div>

            <form onSubmit={handleApplyMentor} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="mentorName" className="block font-mono text-xs text-gray-400 tracking-wider mb-2">
                    FULL_NAME
                  </label>
                  <input
                    id="mentorName"
                    type="text"
                    required
                    placeholder="Dr. Alexis Vance"
                    value={applyName}
                    onChange={(e) => setApplyName(e.target.value)}
                    className="w-full bg-gray-950/60 border border-pink-500/10 focus:border-pink-500/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="mentorEmail" className="block font-mono text-xs text-gray-400 tracking-wider mb-2">
                    EMAIL_ADDRESS
                  </label>
                  <input
                    id="mentorEmail"
                    type="email"
                    required
                    placeholder="alexis@isya.space"
                    value={applyEmail}
                    onChange={(e) => setApplyEmail(e.target.value)}
                    className="w-full bg-gray-950/60 border border-pink-500/10 focus:border-pink-500/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mentorSpecs" className="block font-mono text-xs text-gray-400 tracking-wider mb-2">
                  SPECIALTIES (Comma separated)
                </label>
                <input
                  id="mentorSpecs"
                  type="text"
                  required
                  placeholder="Rocket Propulsion, Orbital Math, SolidWorks"
                  value={applySpecialties}
                  onChange={(e) => setApplySpecialties(e.target.value)}
                  className="w-full bg-gray-950/60 border border-pink-500/10 focus:border-pink-500/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="mentorExp" className="block font-mono text-xs text-gray-400 tracking-wider mb-2">
                    EXPERIENCE LEVEL
                  </label>
                  <input
                    id="mentorExp"
                    type="text"
                    required
                    placeholder="6 years / ESA Specialist"
                    value={applyExperience}
                    onChange={(e) => setApplyExperience(e.target.value)}
                    className="w-full bg-gray-950/60 border border-pink-500/10 focus:border-pink-500/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="mentorAvail" className="block font-mono text-xs text-gray-400 tracking-wider mb-2">
                    WEEKLY AVAILABILITY
                  </label>
                  <input
                    id="mentorAvail"
                    type="text"
                    required
                    placeholder="Tues/Thurs Evenings"
                    value={applyAvailability}
                    onChange={(e) => setApplyAvailability(e.target.value)}
                    className="w-full bg-gray-950/60 border border-pink-500/10 focus:border-pink-500/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mentorBio" className="block font-mono text-xs text-gray-400 tracking-wider mb-2">
                  DOSSIER_BIO
                </label>
                <textarea
                  id="mentorBio"
                  required
                  rows={4}
                  placeholder="Share a brief briefing on your academic research or space flight projects..."
                  value={applyBio}
                  onChange={(e) => setApplyBio(e.target.value)}
                  className="w-full bg-gray-950/60 border border-pink-500/10 focus:border-pink-500/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submittingApp}
                className="w-full py-4 rounded-xl font-mono text-xs font-bold tracking-widest text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] transition-all cursor-pointer disabled:opacity-50"
              >
                {submittingApp ? "TRANSMITTING_DOSSIER..." : "SUBMIT_APPLICATION_DOSSIER"}
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Booking Scheduling Modal Overlay */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
          <div 
            className="relative w-full max-w-md bg-gray-900 border border-pink-500/20 rounded-2xl p-6 shadow-2xl text-left flex flex-col max-h-[85dvh] overflow-y-auto overscroll-contain hud-corners"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HUD details */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-pink-500/30 rounded-tl-lg" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-pink-500/30 rounded-br-lg" />

            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
              <div>
                <h3 className="text-white text-lg font-bold">Request Match slot</h3>
                <p className="font-mono text-[9px] text-pink-500 tracking-wider">
                  COORD_LINK // {selectedMentor.name.toUpperCase()}
                </p>
              </div>
              <button
                ref={modalCloseRef}
                onClick={() => setSelectedMentor(null)}
                className="text-gray-500 hover:text-white p-1 cursor-pointer"
                aria-label="Close scheduler"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleBookSession} className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">TARGET_DATE</label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-gray-950/60 border border-white/5 rounded-lg px-3 py-2.5 text-white text-xs outline-none focus:border-pink-500/40"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">PREFERRED_UTC_TIME</label>
                <input
                  type="time"
                  required
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full bg-gray-950/60 border border-white/5 rounded-lg px-3 py-2.5 text-white text-xs outline-none focus:border-pink-500/40"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">SPECIALIZATION_TOPIC</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Astrophysics orbit calculations"
                  value={bookingTopic}
                  onChange={(e) => setBookingTopic(e.target.value)}
                  className="w-full bg-gray-950/60 border border-white/5 rounded-lg px-3 py-2.5 text-white text-xs outline-none focus:border-pink-500/40"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-gray-400 tracking-wider mb-2">SESSION_NOTES_OR_QUESTIONS</label>
                <textarea
                  rows={3}
                  placeholder="Briefly state your rocket designs or project coordinates..."
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  className="w-full bg-gray-950/60 border border-white/5 rounded-lg px-3 py-2.5 text-white text-xs outline-none focus:border-pink-500/40 resize-none"
                />
              </div>

              <div className="flex items-center gap-1.5 p-3 rounded-lg bg-pink-500/5 border border-pink-500/10 text-pink-400/80 mb-2">
                <AlertCircle size={14} className="shrink-0" />
                <span className="font-mono text-[9px] leading-relaxed">
                  NOTE: Launch request submits immediately for flight staff routing checklist.
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedMentor(null)}
                  className="flex-1 py-3 rounded-xl font-mono text-xs font-bold text-gray-400 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={submittingBooking}
                  className="flex-1 py-3 rounded-xl font-mono text-xs font-bold text-white bg-pink-500 hover:bg-pink-500/90 shadow-[0_0_12px_rgba(236,72,153,0.3)] transition-all cursor-pointer disabled:opacity-50"
                >
                  {submittingBooking ? "SUBMITTING..." : "CONFIRM_LAUNCH"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}
