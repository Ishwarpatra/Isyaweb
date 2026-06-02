import { useState, useEffect, useRef } from "react";
import { Users, GraduationCap, Calendar, Clock, Star, FileText, CheckCircle2, ChevronRight, X, AlertCircle, Search, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { mockDb, Mentor } from "../utils/mockDb";
import { useAuth } from "../hooks/useAuth";

export function MentorPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"find" | "become">("find");
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("ALL");

  // Booking modal state
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingTopic, setBookingTopic] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [cadetName, setCadetName] = useState("");
  const [cadetEmail, setCadetEmail] = useState("");
  
  const [submittingBooking, setSubmittingBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Validation errors
  const [bookingErrors, setBookingErrors] = useState<Record<string, string>>({});
  const [applyErrors, setApplyErrors] = useState<Record<string, string>>({});

  // Application form state
  const [applyName, setApplyName] = useState("");
  const [applyEmail, setApplyEmail] = useState("");
  const [applySpecialties, setApplySpecialties] = useState("");
  const [applyExperience, setApplyExperience] = useState("");
  const [applyAvailability, setApplyAvailability] = useState("");
  const [applyBio, setApplyBio] = useState("");
  const [submittingApp, setSubmittingApp] = useState(false);

  const modalCloseRef = useRef<HTMLButtonElement>(null);

  // Load mentors from DB
  useEffect(() => {
    try {
      setMentors(mockDb.getMentors());
    } catch (e) {
      console.error("Failed to load mentors:", e);
      toast.error("Telemetry failed to retrieve mentor records.");
    }
  }, []);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedMentor(null);
      setIsClosing(false);
      setBookingSuccess(false);
      setBookingErrors({});
      setBookingDate("");
      setBookingTime("");
      setBookingTopic("");
      setBookingNotes("");
      setCadetName("");
      setCadetEmail("");
    }, 200);
  };

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to book a mentorship session.");
      return;
    }

    // Validation
    const errors: Record<string, string> = {};
    if (!cadetName.trim()) errors.cadetName = "Name is required.";
    if (!cadetEmail.trim()) errors.cadetEmail = "Email is required.";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cadetEmail)) {
        errors.cadetEmail = "Invalid email format.";
      }
    }

    if (!bookingDate) {
      errors.bookingDate = "Date selection is required.";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selDate = new Date(bookingDate);
      selDate.setHours(0, 0, 0, 0);
      if (selDate < today) {
        errors.bookingDate = "Date cannot be in the past.";
      }
    }

    if (!bookingTime) errors.bookingTime = "UTC Time selection is required.";
    if (!bookingTopic.trim()) errors.bookingTopic = "Specialization topic is required.";

    if (Object.keys(errors).length > 0) {
      setBookingErrors(errors);
      toast.error("Please resolve scheduling errors before transmitting.");
      return;
    }

    setBookingErrors({});
    setSubmittingBooking(true);

    setTimeout(() => {
      try {
        if (selectedMentor) {
          // Log analytics booking view
          mockDb.logMentorBooking(selectedMentor.id);
          // Update status in mock DB
          mockDb.updateMentor(selectedMentor.id, { status: "Fully Booked" });
          setMentors(mockDb.getMentors());
        }
        setBookingSuccess(true);
        toast.success("Session booked and logged in system. Check back for mentor confirmation.");
      } catch (err: any) {
        toast.error(err.message || "Failed to submit booking.");
      } finally {
        setSubmittingBooking(false);
      }
    }, 500);
  };

  const handleApplyMentor = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const errors: Record<string, string> = {};
    if (!applyName.trim()) errors.applyName = "Full name is required.";
    if (!applyEmail.trim()) errors.applyEmail = "Email address is required.";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(applyEmail)) {
        errors.applyEmail = "Invalid email format.";
      }
    }
    if (!applySpecialties.trim()) errors.applySpecialties = "Specialties list is required.";
    if (!applyExperience.trim()) errors.applyExperience = "Experience years is required.";
    if (!applyAvailability) errors.applyAvailability = "Standard availability selection is required.";
    if (!applyBio.trim()) errors.applyBio = "Dossier bio is required.";
    else if (applyBio.trim().length < 20) {
      errors.applyBio = "Bio must be at least 20 characters for peer verification.";
    }

    if (Object.keys(errors).length > 0) {
      setApplyErrors(errors);
      toast.error("Please correct dossier errors before enlisting.");
      return;
    }

    setApplyErrors({});
    setSubmittingApp(true);
    
    setTimeout(() => {
      try {
        const newMentor = mockDb.addMentor({
          name: applyName,
          // Generate initials and restrict to 2 characters max
          avatar: applyName.split(" ").map(n => n.charAt(0)).join("").toUpperCase().slice(0, 2),
          specialties: applySpecialties.split(",").map(s => s.trim()).filter(Boolean),
          experience: applyExperience,
          availability: applyAvailability,
          bio: applyBio,
          status: "Available",
        });

        toast.success("Dossier submitted! You are now listed as an active ISYA Mentor.");
        setMentors(mockDb.getMentors());
        setActiveTab("find");

        // Reset fields
        setApplyName("");
        setApplyEmail("");
        setApplySpecialties("");
        setApplyExperience("");
        setApplyAvailability("");
        setApplyBio("");
      } catch (err: any) {
        toast.error(err.message || "Failed to register mentor.");
      } finally {
        setSubmittingApp(false);
      }
    }, 500);
  };

  // Close modal on Escape
  useEffect(() => {
    if (selectedMentor) {
      document.body.style.overflow = "hidden";
      modalCloseRef.current?.focus();
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") handleCloseModal();
      };
      window.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [selectedMentor]);

  // Extract all specialties dynamically
  const uniqueSpecialties = ["ALL", ...Array.from(new Set(mentors.flatMap(m => m.specialties)))];

  // Filter mentors based on search queries and specialty tags
  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch = 
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      mentor.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = 
      selectedSpecialty === "ALL" || 
      mentor.specialties.includes(selectedSpecialty);
    
    return matchesSearch && matchesSpecialty;
  });

  const todayString = new Date().toISOString().split("T")[0];

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
          <div className="space-y-8">
            
            {/* Search and Tag Filtering Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gray-950/40 border border-white/5">
              {/* Search */}
              <div className="relative w-full md:max-w-md">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search mentors by name or background coords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 font-mono text-xs text-white bg-gray-900/40 border border-white/5 focus:border-pink-500/50 rounded-xl outline-none transition-colors"
                />
              </div>

              {/* Specialty Selector */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="font-mono text-[10px] text-gray-500 shrink-0">SPECIALTY_FILTER:</span>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="flex-1 md:flex-none font-mono text-xs text-white bg-gray-900/60 border border-white/5 rounded-xl px-3 py-2 outline-none focus:border-pink-500/45 cursor-pointer appearance-none pr-8 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.65rem_auto] bg-[right_0.75rem_center] bg-no-repeat"
                >
                  {uniqueSpecialties.map((spec) => (
                    <option key={spec} value={spec} className="bg-[#070B14]">
                      {spec.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mentor Cards Grid */}
            {filteredMentors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMentors.map((mentor) => (
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
                        onClick={() => {
                          setSelectedMentor(mentor);
                          if (user) {
                            setCadetName(user.name);
                            setCadetEmail(user.email);
                          }
                        }}
                        className={`px-4 py-2.5 rounded-xl font-mono text-[10px] font-bold tracking-widest cursor-pointer transition-all ${
                          mentor.status === "Available"
                            ? "bg-pink-500 text-white hover:bg-pink-500/90 shadow-[0_0_15px_rgba(236,72,153,0.3)] active:scale-95"
                            : "bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed"
                        }`}
                        title={mentor.status === "Fully Booked" ? "This mentor's roster is currently fully booked." : "Request a mentorship match"}
                      >
                        REQUEST_MATCH
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 rounded-2xl bg-white/2 border border-white/5 font-mono">
                <Users className="mx-auto text-gray-600 mb-4" size={36} />
                <p className="text-xs text-gray-500">NO_MENTORS_FOUND // ZERO_COORDINATE_MATCH</p>
                <p className="text-gray-400 text-sm mt-1 font-sans">Try editing search terms or selecting another specialization filter.</p>
              </div>
            )}
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
                  {applyErrors.applyName && (
                    <p className="mt-1 font-mono text-[10px] text-red-500">{applyErrors.applyName}</p>
                  )}
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
                  {applyErrors.applyEmail && (
                    <p className="mt-1 font-mono text-[10px] text-red-500">{applyErrors.applyEmail}</p>
                  )}
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
                {applyErrors.applySpecialties && (
                  <p className="mt-1 font-mono text-[10px] text-red-500">{applyErrors.applySpecialties}</p>
                )}
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
                  {applyErrors.applyExperience && (
                    <p className="mt-1 font-mono text-[10px] text-red-500">{applyErrors.applyExperience}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="mentorAvail" className="block font-mono text-xs text-gray-400 tracking-wider mb-2">
                    WEEKLY_AVAILABILITY
                  </label>
                  <select
                    id="mentorAvail"
                    required
                    value={applyAvailability}
                    onChange={(e) => setApplyAvailability(e.target.value)}
                    className="w-full bg-gray-950/60 border border-pink-500/10 focus:border-pink-500/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors appearance-none pr-8 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.65rem_auto] bg-[right_0.75rem_center] bg-no-repeat"
                  >
                    <option value="" className="bg-[#070B14]">Select availability slot...</option>
                    <option value="Weekdays Morning" className="bg-[#070B14]">Weekdays Morning</option>
                    <option value="Weekdays Afternoon" className="bg-[#070B14]">Weekdays Afternoon</option>
                    <option value="Weekdays Evening" className="bg-[#070B14]">Weekdays Evening</option>
                    <option value="Weekends" className="bg-[#070B14]">Weekends</option>
                    <option value="Flexible / ASAP" className="bg-[#070B14]">Flexible / ASAP</option>
                  </select>
                  {applyErrors.applyAvailability && (
                    <p className="mt-1 font-mono text-[10px] text-red-500">{applyErrors.applyAvailability}</p>
                  )}
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
                {applyErrors.applyBio && (
                  <p className="mt-1 font-mono text-[10px] text-red-500">{applyErrors.applyBio}</p>
                )}
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

      {/* Booking Scheduling Modal Overlay with entry/exit animations */}
      {selectedMentor && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm ${
          isClosing ? "animate-modal-overlay-out" : "animate-modal-overlay"
        }`}>
          <div 
            className={`relative w-full max-w-md bg-gray-900 border border-pink-500/20 rounded-2xl p-6 shadow-2xl text-left flex flex-col max-h-[85dvh] overflow-y-auto overscroll-contain hud-corners ${
              isClosing ? "animate-modal-content-out" : "animate-modal-content"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HUD details */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-pink-500/30 rounded-tl-lg" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-pink-500/30 rounded-br-lg" />

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
              <div>
                <h3 className="text-white text-lg font-bold">
                  {bookingSuccess ? "Booking Confirmed" : "Request Match Slot"}
                </h3>
                <p className="font-mono text-[9px] text-pink-500 tracking-wider">
                  {bookingSuccess ? "TRANSMISSION_COMPLETED" : `COORD_LINK // ${selectedMentor.name.toUpperCase()}`}
                </p>
              </div>
              <button
                ref={modalCloseRef}
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-white p-1 cursor-pointer"
                aria-label="Close scheduler"
              >
                <X size={18} />
              </button>
            </div>

            {bookingSuccess ? (
              /* Confirmation Receipt Screen */
              <div className="space-y-6 py-4">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Check size={24} />
                  </div>
                  <h4 className="font-mono text-sm text-white font-bold tracking-wider uppercase">Match Request Logged</h4>
                  <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
                    Cadet dossier linking matches established successfully. Telemetry schedule request has been logged in flight systems.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-[10px] space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">MENTOR_NAME:</span>
                    <span className="text-white font-bold">{selectedMentor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">CADET_NAME:</span>
                    <span className="text-white font-bold">{cadetName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">TARGET_DATE:</span>
                    <span className="text-white font-bold">{bookingDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">UTC_TIME:</span>
                    <span className="text-white font-bold">{bookingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">TOPIC:</span>
                    <span className="text-white font-bold truncate max-w-[200px]">{bookingTopic}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-pink-500/5 border border-pink-500/10 text-pink-400/80">
                  <AlertCircle size={14} className="shrink-0" />
                  <span className="font-mono text-[9px] leading-relaxed">
                    Confirmation receipt transmitted to: <strong className="text-white font-sans">{cadetEmail}</strong>. Please check your inbox for instructions.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-full py-3.5 rounded-xl font-mono text-xs font-bold text-white bg-pink-500 hover:bg-pink-600 hover:shadow-[0_0_20px_rgba(236,72,153,0.35)] transition-all cursor-pointer text-center"
                >
                  BACK_TO_MENTOR_LIST
                </button>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleBookSession} className="space-y-4">
                
                {/* Cadet Name & Email (Prefilled, Editable with Validation) */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="booking-name" className="block font-mono text-[9px] text-gray-400 tracking-wider mb-1.5">CADET_NAME</label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      aria-describedby={bookingErrors.cadetName ? "booking-name-err" : undefined}
                      aria-invalid={!!bookingErrors.cadetName}
                      value={cadetName}
                      onChange={(e) => setCadetName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full bg-gray-950/60 border border-white/5 focus:border-pink-500/40 rounded-lg px-3 py-2 text-white text-xs outline-none"
                    />
                    {bookingErrors.cadetName && (
                      <p id="booking-name-err" role="alert" className="mt-1 font-mono text-[8px] text-red-500">{bookingErrors.cadetName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="booking-email" className="block font-mono text-[9px] text-gray-400 tracking-wider mb-1.5">CADET_EMAIL</label>
                    <input
                      id="booking-email"
                      type="email"
                      required
                      aria-describedby={bookingErrors.cadetEmail ? "booking-email-err" : undefined}
                      aria-invalid={!!bookingErrors.cadetEmail}
                      value={cadetEmail}
                      onChange={(e) => setCadetEmail(e.target.value)}
                      placeholder="cadet@isya.space"
                      className="w-full bg-gray-950/60 border border-white/5 focus:border-pink-500/40 rounded-lg px-3 py-2 text-white text-xs outline-none"
                    />
                    {bookingErrors.cadetEmail && (
                      <p id="booking-email-err" role="alert" className="mt-1 font-mono text-[8px] text-red-500">{bookingErrors.cadetEmail}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="booking-date" className="block font-mono text-[9px] text-gray-400 tracking-wider mb-1.5">TARGET_DATE</label>
                    <input
                      id="booking-date"
                      type="date"
                      required
                      min={todayString}
                      aria-describedby={bookingErrors.bookingDate ? "booking-date-err" : undefined}
                      aria-invalid={!!bookingErrors.bookingDate}
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-gray-950/60 border border-white/5 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-pink-500/40 cursor-pointer"
                    />
                    {bookingErrors.bookingDate && (
                      <p id="booking-date-err" role="alert" className="mt-1 font-mono text-[8px] text-red-500">{bookingErrors.bookingDate}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="booking-time" className="block font-mono text-[9px] text-gray-400 tracking-wider mb-1.5">
                      UTC_TIME
                      <span className="ml-1 text-gray-600">(UTC{new Date().getTimezoneOffset() <= 0 ? "+" : ""}{-(new Date().getTimezoneOffset() / 60)})</span>
                    </label>
                    <input
                      id="booking-time"
                      type="time"
                      required
                      aria-describedby={bookingErrors.bookingTime ? "booking-time-err" : undefined}
                      aria-invalid={!!bookingErrors.bookingTime}
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full bg-gray-950/60 border border-white/5 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-pink-500/40 cursor-pointer"
                    />
                    {bookingErrors.bookingTime && (
                      <p id="booking-time-err" role="alert" className="mt-1 font-mono text-[8px] text-red-500">{bookingErrors.bookingTime}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="booking-topic" className="block font-mono text-[9px] text-gray-400 tracking-wider mb-1.5">SPECIALIZATION_TOPIC</label>
                  <input
                    id="booking-topic"
                    type="text"
                    required
                    placeholder="e.g. Astrophysics orbit calculations"
                    aria-describedby={bookingErrors.bookingTopic ? "booking-topic-err" : undefined}
                    aria-invalid={!!bookingErrors.bookingTopic}
                    value={bookingTopic}
                    onChange={(e) => setBookingTopic(e.target.value)}
                    className="w-full bg-gray-950/60 border border-white/5 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-pink-500/40"
                  />
                  {bookingErrors.bookingTopic && (
                    <p id="booking-topic-err" role="alert" className="mt-1 font-mono text-[8px] text-red-500">{bookingErrors.bookingTopic}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="booking-notes" className="block font-mono text-[9px] text-gray-400 tracking-wider mb-1.5">SESSION_NOTES_OR_QUESTIONS</label>
                  <textarea
                    id="booking-notes"
                    rows={3}
                    placeholder="Briefly state your rocket designs or project coordinates..."
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    className="w-full bg-gray-950/60 border border-white/5 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-pink-500/40 resize-none"
                  />
                </div>

                <div className="flex items-center gap-1.5 p-3 rounded-lg bg-pink-500/5 border border-pink-500/10 text-pink-400/80 mb-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span className="font-mono text-[9px] leading-relaxed">
                    NOTE: Match requests will be submitted to the mentor's dossier queue immediately.
                  </span>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
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
            )}
          </div>
        </div>
      )}

    </main>
  );
}
