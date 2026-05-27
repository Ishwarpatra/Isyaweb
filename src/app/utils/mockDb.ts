import { toast } from "sonner";

// Interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "mentor" | "moderator" | "admin";
  createdAt: string;
  posts: number[];
  mentee_status: "idle" | "pending" | "matched";
}

export interface Post {
  id: number;
  author: string;
  avatar: string;
  color: string;
  time: string;
  createdAt: number;
  content: string;
  likes: number;
  comments: number;
  liked: boolean;
  status: "DRAFT" | "PUBLISHED" | "FLAGGED";
}

export interface Comment {
  id: string;
  postId: number;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: number;
}

export interface FAQ {
  id: number;
  category: "GENERAL" | "MEMBERSHIP" | "COMMUNITY" | "ADMIN" | "MENTORSHIP";
  question: string;
  answer: string;
  createdBy: string;
  updatedAt: string;
}

export interface Mentor {
  id: number;
  name: string;
  avatar: string;
  specialties: string[];
  experience: string;
  availability: string;
  bio: string;
  status: "Available" | "Fully Booked";
}

export interface Webinar {
  id: number;
  title: string;
  date: string;
  image: string;
  videoUrl: string;
  description: string;
  createdBy: string;
}

export interface Podcast {
  id: number;
  title: string;
  episode: string;
  guest: string;
  duration: string;
  date: string;
  freq: string;
  audioUrl?: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  scheduledDate: string;
  createdBy: string;
}

export interface ModerationItem {
  id: string;
  contentType: "post" | "comment" | "user";
  contentId: number | string;
  content: string;
  flaggedBy: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REMOVED";
  createdAt: number;
}

// Initial Mock Data
const INITIAL_WEBINARS: Webinar[] = [
  {
    id: 1,
    title: "Deep Space Exploration with JWST",
    date: "2026-05-10",
    image: "https://images.unsplash.com/photo-1727034394040-0377258a5791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "An in-depth analysis of the James Webb Space Telescope's latest deep-field observations and discoveries.",
    createdBy: "admin@isya.space",
  },
  {
    id: 2,
    title: "Astrophysics and Cosmic Radiation",
    date: "2026-04-22",
    image: "https://images.unsplash.com/photo-1706562018605-909733434781?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "Understanding cosmic ray flux, solar wind shielding, and its implications for deep-space human flight.",
    createdBy: "admin@isya.space",
  },
  {
    id: 3,
    title: "Satellite Propulsion Systems Engineering",
    date: "2026-03-15",
    image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "A comprehensive workshop on electric propulsion, cold-gas thrusters, and orbital maneuvers.",
    createdBy: "admin@isya.space",
  },
  {
    id: 4,
    title: "Astrobiology: Searching for Biosignatures",
    date: "2026-02-28",
    image: "https://images.unsplash.com/photo-1476156863127-a8f1e9dba2b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "Exploring ocean world telemetry, extremity habitats on Earth, and remote spectroscopy for exoplanets.",
    createdBy: "admin@isya.space",
  },
];

const INITIAL_FAQS: FAQ[] = [
  {
    id: 1,
    category: "GENERAL",
    question: "What is the International Space Youth Association (ISYA)?",
    answer: "ISYA is a global network of youth, cadets, students, and professionals working to foster collaboration in space sciences, rocketry, space policy, and astronomy. We provide mentorship, resources, webinars, and coordinate youth projects.",
    createdBy: "admin@isya.space",
    updatedAt: "2026-05-27",
  },
  {
    id: 2,
    category: "GENERAL",
    question: "Who can join ISYA?",
    answer: "Membership is open to any student, cadet, or space enthusiast aged 14 to 28 who is passionate about space science, technology, and policy.",
    createdBy: "admin@isya.space",
    updatedAt: "2026-05-27",
  },
  {
    id: 3,
    category: "MEMBERSHIP",
    question: "Is there a fee to become a member?",
    answer: "No, joining ISYA and participating in our core educational programs, webinars, and community forums is completely free. We believe space education should be accessible to everyone.",
    createdBy: "admin@isya.space",
    updatedAt: "2026-05-27",
  },
  {
    id: 4,
    category: "MEMBERSHIP",
    question: "How do I upgrade my status to a Cadet or Specialist?",
    answer: "By active participation in community forums, completing free training initiatives, or joining project working groups, members earn clearance points to unlock next-level titles.",
    createdBy: "admin@isya.space",
    updatedAt: "2026-05-27",
  },
  {
    id: 5,
    category: "COMMUNITY",
    question: "How can I post announcements or request project support?",
    answer: "You can use the Community tab to broadcast transmissions. Type your post in the compose box, attach any project links, and submit it for peer review.",
    createdBy: "admin@isya.space",
    updatedAt: "2026-05-27",
  },
  {
    id: 6,
    category: "MENTORSHIP",
    question: "How does the Mentor/Mentee matching program work?",
    answer: "Cadets can browse our list of active mentors on the Mentor Program tab, view specialties, and submit a booking request. Once approved by the mentor, you will receive slot details via email.",
    createdBy: "admin@isya.space",
    updatedAt: "2026-05-27",
  },
  {
    id: 7,
    category: "MENTORSHIP",
    question: "Can I apply to become a Mentor?",
    answer: "Yes! If you are a graduate student, post-doc, or space industry professional, toggle the mode to 'Become a Mentor' on the Mentor page and submit our application form.",
    createdBy: "admin@isya.space",
    updatedAt: "2026-05-27",
  },
  {
    id: 8,
    category: "ADMIN",
    question: "Who moderates content on the ISYA network?",
    answer: "Certified moderators and system admins review reported posts and verify new member applications to keep our network constructive, safe, and focused on scientific pursuits.",
    createdBy: "admin@isya.space",
    updatedAt: "2026-05-27",
  },
  {
    id: 9,
    category: "GENERAL",
    question: "Where are ISYA events held?",
    answer: "Most symposiums, webinars, and panel discussions are held virtually on YouTube and Zoom. Some chapters hold physical telescope watch sessions locally.",
    createdBy: "admin@isya.space",
    updatedAt: "2026-05-27",
  },
  {
    id: 10,
    category: "MEMBERSHIP",
    question: "Can high school students join?",
    answer: "Yes, our first membership age bracket starts at 14 (Secondary School). We have special introductory workshops and challenges designed for high school level cadets.",
    createdBy: "admin@isya.space",
    updatedAt: "2026-05-27",
  },
  {
    id: 11,
    category: "COMMUNITY",
    question: "How do I report inappropriate content?",
    answer: "Every community post and comment features a flag button. Clicking this allows you to specify a reason and send the item directly to the Moderation Queue for moderator action.",
    createdBy: "admin@isya.space",
    updatedAt: "2026-05-27",
  },
  {
    id: 12,
    category: "MENTORSHIP",
    question: "Are mentorship sessions paid?",
    answer: "No, all mentorship sessions provided through the ISYA network are voluntary and free of charge for registered members.",
    createdBy: "admin@isya.space",
    updatedAt: "2026-05-27",
  },
  {
    id: 13,
    category: "ADMIN",
    question: "How do I contact support or general admin teams?",
    answer: "You can submit an inquiry through our standard support channel, or email us at general@isya.space for administration inquiries.",
    createdBy: "admin@isya.space",
    updatedAt: "2026-05-27",
  },
  {
    id: 14,
    category: "GENERAL",
    question: "Can I collaborate with ISYA as an external partner?",
    answer: "Absolutely. We are always looking for Guest Speakers, Research Partners, and Mentors to guide our members. You can find detail options in the Collaboration section.",
    createdBy: "admin@isya.space",
    updatedAt: "2026-05-27",
  },
  {
    id: 15,
    category: "MEMBERSHIP",
    question: "What are the rules of the community?",
    answer: "Members are expected to be respectful, collaborative, and focus conversations on space science, technologies, policy, and educational endeavors. Check our guidelines page for details.",
    createdBy: "admin@isya.space",
    updatedAt: "2026-05-27",
  },
];

const INITIAL_MENTORS: Mentor[] = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    avatar: "SC",
    specialties: ["Astrophysics", "Deep Space Observation"],
    experience: "8 years",
    availability: "Weekends",
    bio: "Astrophysicist and deep space observer helping cadets understand cosmic spectra, telescope structures, and redshift calculations.",
    status: "Available",
  },
  {
    id: 2,
    name: "David Osei",
    avatar: "DO",
    specialties: ["CubeSat Design", "Propulsion Systems"],
    experience: "5 years",
    availability: "Mon/Wed Evening",
    bio: "Aerospace engineer guiding teams on flight hardware assemblies, electrical buses, and thruster mechanisms.",
    status: "Available",
  },
  {
    id: 3,
    name: "Yuki Tanaka",
    avatar: "YT",
    specialties: ["Radio Astronomy", "Data Science"],
    experience: "6 years",
    availability: "Friday Afternoon",
    bio: "Data analyst teaching cadets how to clean radio telescope telemetry arrays and search for pulsar pulses.",
    status: "Available",
  },
  {
    id: 4,
    name: "Amara Diallo",
    avatar: "AD",
    specialties: ["Science Communication", "Space Policy"],
    experience: "4 years",
    availability: "Tuesday Morning",
    bio: "Passionate advocate translating complex orbital debris treaties and aerospace regulation updates for student audiences.",
    status: "Fully Booked",
  },
  {
    id: 5,
    name: "Luis Reyes",
    avatar: "LR",
    specialties: ["Space Robotics", "Orbital Mechanics"],
    experience: "10 years",
    availability: "Thursday Evening",
    bio: "Mechanical robotics engineer tutoring cadets on robot arm kinematics and path calculations for rover wheels.",
    status: "Available",
  },
  {
    id: 6,
    name: "Fatima Al-Rashid",
    avatar: "FA",
    specialties: ["Astrobiology", "Space Medicine"],
    experience: "7 years",
    availability: "Weekends",
    bio: "Medical researcher investigating microgravity effects on human bone density and atmospheric parameters in habitats.",
    status: "Available",
  },
];

const INITIAL_PODCASTS: Podcast[] = [
  { id: 1, title: "The Next Space Race: Youth Perspectives", episode: "EP_042", guest: "DR_AMARA_OSEI", duration: "58:24", date: "2026-05-12", freq: "98.6 MHz" },
  { id: 2, title: "From Classroom to Control Room", episode: "EP_041", guest: "CARLOS_MENDEZ", duration: "44:11", date: "2026-05-05", freq: "98.6 MHz" },
  { id: 3, title: "Women Who Are Changing Space Science", episode: "EP_040", guest: "DR_YUKI_NAKAMURA", duration: "51:37", date: "2026-04-28", freq: "98.6 MHz" },
  { id: 4, title: "Astrobiology & the Search for Life", episode: "EP_039", guest: "PROF_LIAM_OBRIEN", duration: "62:08", date: "2026-04-21", freq: "98.6 MHz" },
  { id: 5, title: "Space Policy Explained for Young Scientists", episode: "EP_038", guest: "FATIMA_AL-RASHID", duration: "39:55", date: "2026-04-14", freq: "98.6 MHz" },
];

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "ISYA 2026 Symposium Registration Open",
    content: "We are pleased to announce that registrations for the ISYA 2026 International Space Symposium are now officially open. Submit your abstract by June 10th.",
    status: "PUBLISHED",
    scheduledDate: "2026-05-20",
    createdBy: "admin@isya.space",
  },
  {
    id: 2,
    title: "New Mentorship Cohort Starting Next Month",
    content: "CADETS: A new mentorship matching cycle is starting on June 1st. Apply as a mentee on our portal to get paired with aerospace experts.",
    status: "PUBLISHED",
    scheduledDate: "2026-05-25",
    createdBy: "admin@isya.space",
  },
  {
    id: 3,
    title: "CubeSat Design Challenge Phase 1 Submission Deadline",
    content: "Phase 1 design specs for the CubeSat orbital test project must be uploaded to secure flight readiness slots.",
    status: "PUBLISHED",
    scheduledDate: "2026-05-26",
    createdBy: "admin@isya.space",
  },
];

const INITIAL_MODERATION_QUEUE: ModerationItem[] = [
  {
    id: "mod-1",
    contentType: "post",
    contentId: 101,
    content: "Hey, buy these cool crypto rocket tokens, guarantee 1000x gain!! spacecoins.com",
    flaggedBy: "cadet@isya.space",
    reason: "Spam & unauthorized advertising",
    status: "PENDING",
    createdAt: Date.now() - 3600000,
  }
];

// DB Helper functions
export const mockDb = {
  initialize() {
    if (!localStorage.getItem("isya_webinars")) {
      localStorage.setItem("isya_webinars", JSON.stringify(INITIAL_WEBINARS));
    }
    if (!localStorage.getItem("isya_faqs")) {
      localStorage.setItem("isya_faqs", JSON.stringify(INITIAL_FAQS));
    }
    if (!localStorage.getItem("isya_mentors")) {
      localStorage.setItem("isya_mentors", JSON.stringify(INITIAL_MENTORS));
    }
    if (!localStorage.getItem("isya_podcasts")) {
      localStorage.setItem("isya_podcasts", JSON.stringify(INITIAL_PODCASTS));
    }
    if (!localStorage.getItem("isya_announcements")) {
      localStorage.setItem("isya_announcements", JSON.stringify(INITIAL_ANNOUNCEMENTS));
    }
    if (!localStorage.getItem("isya_moderation_queue")) {
      localStorage.setItem("isya_moderation_queue", JSON.stringify(INITIAL_MODERATION_QUEUE));
    }
  },

  // Webinars
  getWebinars(): Webinar[] {
    this.initialize();
    return JSON.parse(localStorage.getItem("isya_webinars") || "[]");
  },
  addWebinar(webinar: Omit<Webinar, "id">) {
    const webinars = this.getWebinars();
    const newWebinar = { ...webinar, id: webinars.length > 0 ? Math.max(...webinars.map(w => w.id)) + 1 : 1 };
    webinars.push(newWebinar);
    localStorage.setItem("isya_webinars", JSON.stringify(webinars));
    return newWebinar;
  },

  // FAQs
  getFAQs(): FAQ[] {
    this.initialize();
    return JSON.parse(localStorage.getItem("isya_faqs") || "[]");
  },
  addFAQ(faq: Omit<FAQ, "id">) {
    const faqs = this.getFAQs();
    const newFAQ = { ...faq, id: faqs.length > 0 ? Math.max(...faqs.map(f => f.id)) + 1 : 1 };
    faqs.push(newFAQ);
    localStorage.setItem("isya_faqs", JSON.stringify(faqs));
    return newFAQ;
  },
  deleteFAQ(id: number) {
    const faqs = this.getFAQs().filter(f => f.id !== id);
    localStorage.setItem("isya_faqs", JSON.stringify(faqs));
  },

  // Mentors
  getMentors(): Mentor[] {
    this.initialize();
    return JSON.parse(localStorage.getItem("isya_mentors") || "[]");
  },
  addMentor(mentor: Omit<Mentor, "id">) {
    const mentors = this.getMentors();
    const newMentor = { ...mentor, id: mentors.length > 0 ? Math.max(...mentors.map(m => m.id)) + 1 : 1 };
    mentors.push(newMentor);
    localStorage.setItem("isya_mentors", JSON.stringify(mentors));
    return newMentor;
  },
  updateMentor(id: number, updates: Partial<Mentor>) {
    const mentors = this.getMentors().map(m => m.id === id ? { ...m, ...updates } : m);
    localStorage.setItem("isya_mentors", JSON.stringify(mentors));
  },

  // Podcasts
  getPodcasts(): Podcast[] {
    this.initialize();
    return JSON.parse(localStorage.getItem("isya_podcasts") || "[]");
  },
  addPodcast(podcast: Omit<Podcast, "id">) {
    const podcasts = this.getPodcasts();
    const newPodcast = { ...podcast, id: podcasts.length > 0 ? Math.max(...podcasts.map(p => p.id)) + 1 : 1 };
    podcasts.push(newPodcast);
    localStorage.setItem("isya_podcasts", JSON.stringify(podcasts));
    return newPodcast;
  },

  // Announcements
  getAnnouncements(): Announcement[] {
    this.initialize();
    return JSON.parse(localStorage.getItem("isya_announcements") || "[]");
  },
  addAnnouncement(announcement: Omit<Announcement, "id">) {
    const announcements = this.getAnnouncements();
    const newAnn = { ...announcement, id: announcements.length > 0 ? Math.max(...announcements.map(a => a.id)) + 1 : 1 };
    announcements.push(newAnn);
    localStorage.setItem("isya_announcements", JSON.stringify(announcements));
    return newAnn;
  },

  // Moderation Queue
  getModerationQueue(): ModerationItem[] {
    this.initialize();
    return JSON.parse(localStorage.getItem("isya_moderation_queue") || "[]");
  },
  addToModerationQueue(item: Omit<ModerationItem, "id" | "status" | "createdAt">) {
    const queue = this.getModerationQueue();
    const newItem: ModerationItem = {
      ...item,
      id: `mod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: "PENDING",
      createdAt: Date.now(),
    };
    queue.push(newItem);
    localStorage.setItem("isya_moderation_queue", JSON.stringify(queue));
    toast.success("Content has been flagged and submitted to the moderation queue.");
    return newItem;
  },
  updateModerationStatus(id: string, status: "APPROVED" | "REMOVED") {
    const queue = this.getModerationQueue().map(item => {
      if (item.id === id) {
        return { ...item, status };
      }
      return item;
    });
    localStorage.setItem("isya_moderation_queue", JSON.stringify(queue));

    // If removed or approved, reflect it in the target database if applicable
    const item = queue.find(q => q.id === id);
    if (item && item.contentType === "post") {
      const postsStr = localStorage.getItem("isya_community_posts");
      if (postsStr) {
        try {
          const posts = JSON.parse(postsStr) as Post[];
          const updatedPosts = posts.map(p => {
            if (p.id === Number(item.contentId)) {
              return { ...p, status: status === "APPROVED" ? "PUBLISHED" as const : "FLAGGED" as const };
            }
            return p;
          });
          localStorage.setItem("isya_community_posts", JSON.stringify(updatedPosts));
        } catch (e) {}
      }
    }
  }
};
