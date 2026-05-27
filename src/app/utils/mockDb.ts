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

export interface BlogPost {
  id: number;
  tag: string;
  tagColor: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  featured: boolean;
  body: string[];
}

export interface BlogComment {
  id: number;
  postId: number;
  author: string;
  avatar: string;
  time: string;
  text: string;
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

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 1,
    tag: "MISSION_UPDATE",
    tagColor: "#F97316",
    title: "ISYA Members Join ESA's Young Graduate Traineeship Program",
    excerpt: "Fifteen ISYA cadets have been selected for ESA's prestigious traineeship, gaining hands-on experience at facilities across Europe.",
    date: "2026-05-14",
    author: "CADET_CHEN_S",
    readTime: "4 MIN",
    image: "https://images.unsplash.com/photo-1727034394040-0377258a5791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    featured: true,
    body: [
      "Fifteen cadets from the International Space Youth Association (ISYA) have officially been selected to join the European Space Agency's (ESA) Young Graduate Traineeship (YGT) program. This prestigious initiative offers high-caliber university graduates a unique, hands-on experience in space science and engineering.",
      "The trainees will be stationed across key European Space Research and Technology Centre (ESTEC) facilities in the Netherlands, Darmstadt, and Frascati. Their research will span a diverse collection of projects, including CubeSat communications networks, orbital decay simulation models, and next-generation spectral imaging technologies.",
      "This announcement represents a significant milestone in ISYA's mission to bridge the gap between academic space enthusiast clubs and professional space operations agencies. Congratulations to all selected trainees! Their hard work in near-space telemetry during our annual workshops has prepared them to make a tangible contribution to the global scientific community.",
    ]
  },
  {
    id: 2,
    tag: "RESEARCH",
    tagColor: "#3B82F6",
    title: "Exoplanet Discovery Methods: A Youth Astronomer's Complete Guide",
    excerpt: "How do we detect alien worlds orbiting stars trillions of miles away? Explore transit photometry and radial velocity methods.",
    date: "2026-05-10",
    author: "CADET_OSEI_D",
    readTime: "8 MIN",
    image: "https://images.unsplash.com/photo-1706562018605-909733434781?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    featured: false,
    body: [
      "How do we detect alien worlds orbiting stars trillions of miles away? While exoplanets are too distant to be resolved directly by standard telescopes, astronomers use several indirect observation techniques to discover thousands of planetary bodies.",
      "The most successful detection method to date is Transit Photometry. By measuring the dimming of a star as a planet crosses in front of its disk, telescopes like Kepler and TESS can estimate a planet's size, orbital period, and distance from its host star.",
      "Another fundamental method is Radial Velocity, which measures small wobbles in a star's spectral signatures caused by the gravitational pull of an orbiting exoplanet. By combining transit and radial velocity datasets, astrophysicists can calculate both the mass and radius of the planet, revealing its density and chemical composition.",
    ]
  },
  {
    id: 3,
    tag: "EVENT",
    tagColor: "#EC4899",
    title: "Annual Space Symposium 2026 — Registration Now Open",
    excerpt: "Join 500+ young scientists in Nairobi for the ISYA Annual Symposium. Apply before June 30 for priority access.",
    date: "2026-05-06",
    author: "ISYA_COMMAND",
    readTime: "3 MIN",
    image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    featured: false,
    body: [
      "We are thrilled to announce that registration is officially open for the Annual ISYA Space Symposium 2026, set to take place in Nairobi, Kenya, from August 12th to August 16th. The event will bring together over 500 young space advocates, researchers, and professional astronauts.",
      "This year's theme, 'Decentralizing the Cosmos,' focuses on empowering global South space starts and student-led CubeSat operations. Keynote speakers include flight directors from major international agencies, astrobiology researchers, and CubeSat mission managers.",
      "Priority registration closes on June 30th. Funding grants are available to cover travel expenses for cadets presenting research papers. Submit your abstracts via our mission portal as soon as possible!",
    ]
  }
];

const INITIAL_COMMENTS: BlogComment[] = [
  { id: 1, postId: 1, author: "Sarah Chen", avatar: "SC", time: "3 days ago", text: "This is a huge opportunity! Congrats to everyone selected for YGT. See you all in ESTEC!", createdAt: Date.now() - 3 * 24 * 3600000 },
  { id: 2, postId: 1, author: "Yuki Tanaka", avatar: "YT", time: "2 days ago", text: "Excellent write-up! I've been testing the budget radio receivers for solar cycle updates, very relevant.", createdAt: Date.now() - 2 * 24 * 3600000 },
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

// Memory caching for offline/inaccessible localStorage fallbacks
const memoryDb: Record<string, any> = {};

function safeGetItem(key: string, fallback: string): string {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? val : fallback;
  } catch (e) {
    console.warn(`localStorage read failed for ${key}, using memory fallback:`, e);
    return memoryDb[key] !== undefined ? memoryDb[key] : fallback;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn(`localStorage write failed for ${key}, using memory fallback:`, e);
    memoryDb[key] = value;
  }
}

let isDbInitialized = false;

// DB Helper functions
export const mockDb = {
  initialize() {
    if (isDbInitialized) return;
    try {
      if (!safeGetItem("isya_webinars", "")) {
        safeSetItem("isya_webinars", JSON.stringify(INITIAL_WEBINARS));
      }
      if (!safeGetItem("isya_faqs", "")) {
        safeSetItem("isya_faqs", JSON.stringify(INITIAL_FAQS));
      }
      if (!safeGetItem("isya_mentors", "")) {
        safeSetItem("isya_mentors", JSON.stringify(INITIAL_MENTORS));
      }
      if (!safeGetItem("isya_podcasts", "")) {
        safeSetItem("isya_podcasts", JSON.stringify(INITIAL_PODCASTS));
      }
      if (!safeGetItem("isya_announcements", "")) {
        safeSetItem("isya_announcements", JSON.stringify(INITIAL_ANNOUNCEMENTS));
      }
      if (!safeGetItem("isya_blogs", "")) {
        safeSetItem("isya_blogs", JSON.stringify(INITIAL_BLOGS));
      }
      if (!safeGetItem("isya_blog_comments", "")) {
        safeSetItem("isya_blog_comments", JSON.stringify(INITIAL_COMMENTS));
      }
      if (!safeGetItem("isya_moderation_queue", "")) {
        safeSetItem("isya_moderation_queue", JSON.stringify(INITIAL_MODERATION_QUEUE));
      }
      isDbInitialized = true;
    } catch (e) {
      console.error("Database initialization failed:", e);
    }
  },

  // Webinars
  getWebinars(): Webinar[] {
    this.initialize();
    try {
      return JSON.parse(safeGetItem("isya_webinars", "[]"));
    } catch (e) {
      return INITIAL_WEBINARS;
    }
  },
  addWebinar(webinar: Omit<Webinar, "id">) {
    try {
      const webinars = this.getWebinars();
      const newWebinar = { ...webinar, id: webinars.length > 0 ? Math.max(...webinars.map(w => w.id)) + 1 : 1 };
      webinars.push(newWebinar);
      safeSetItem("isya_webinars", JSON.stringify(webinars));
      return newWebinar;
    } catch (e) {
      console.error("addWebinar failed:", e);
      throw new Error("Unable to write webinar entry to persistent terminal storage.");
    }
  },

  // FAQs
  getFAQs(): FAQ[] {
    this.initialize();
    try {
      return JSON.parse(safeGetItem("isya_faqs", "[]"));
    } catch (e) {
      return INITIAL_FAQS;
    }
  },
  addFAQ(faq: Omit<FAQ, "id">) {
    try {
      const faqs = this.getFAQs();
      const newFAQ = { ...faq, id: faqs.length > 0 ? Math.max(...faqs.map(f => f.id)) + 1 : 1 };
      faqs.push(newFAQ);
      safeSetItem("isya_faqs", JSON.stringify(faqs));
      return newFAQ;
    } catch (e) {
      console.error("addFAQ failed:", e);
      throw new Error("Unable to write FAQ entry to persistent terminal storage.");
    }
  },

  // Mentors
  getMentors(): Mentor[] {
    this.initialize();
    try {
      return JSON.parse(safeGetItem("isya_mentors", "[]"));
    } catch (e) {
      return INITIAL_MENTORS;
    }
  },
  addMentor(mentor: Omit<Mentor, "id">) {
    try {
      const mentors = this.getMentors();
      const newMentor = { ...mentor, id: mentors.length > 0 ? Math.max(...mentors.map(m => m.id)) + 1 : 1 };
      mentors.push(newMentor);
      safeSetItem("isya_mentors", JSON.stringify(mentors));
      return newMentor;
    } catch (e) {
      console.error("addMentor failed:", e);
      throw new Error("Unable to register mentor dossier. Storage sync failed.");
    }
  },
  updateMentor(id: number, updates: Partial<Mentor>) {
    try {
      const mentors = this.getMentors().map(m => m.id === id ? { ...m, ...updates } : m);
      safeSetItem("isya_mentors", JSON.stringify(mentors));
    } catch (e) {
      console.error("updateMentor failed:", e);
    }
  },

  // Podcasts
  getPodcasts(): Podcast[] {
    this.initialize();
    try {
      return JSON.parse(safeGetItem("isya_podcasts", "[]"));
    } catch (e) {
      return INITIAL_PODCASTS;
    }
  },
  addPodcast(podcast: Omit<Podcast, "id">) {
    try {
      const podcasts = this.getPodcasts();
      const newPodcast = { ...podcast, id: podcasts.length > 0 ? Math.max(...podcasts.map(p => p.id)) + 1 : 1 };
      podcasts.push(newPodcast);
      safeSetItem("isya_podcasts", JSON.stringify(podcasts));
      return newPodcast;
    } catch (e) {
      console.error("addPodcast failed:", e);
      throw new Error("Unable to store podcast episode.");
    }
  },

  // Announcements
  getAnnouncements(): Announcement[] {
    this.initialize();
    try {
      return JSON.parse(safeGetItem("isya_announcements", "[]"));
    } catch (e) {
      return INITIAL_ANNOUNCEMENTS;
    }
  },
  addAnnouncement(announcement: Omit<Announcement, "id">) {
    try {
      const announcements = this.getAnnouncements();
      const newAnn = { ...announcement, id: announcements.length > 0 ? Math.max(...announcements.map(a => a.id)) + 1 : 1 };
      announcements.push(newAnn);
      safeSetItem("isya_announcements", JSON.stringify(announcements));
      return newAnn;
    } catch (e) {
      console.error("addAnnouncement failed:", e);
      throw new Error("Unable to publish announcement.");
    }
  },

  // Blogs
  getBlogs(): BlogPost[] {
    this.initialize();
    try {
      return JSON.parse(safeGetItem("isya_blogs", "[]"));
    } catch (e) {
      return INITIAL_BLOGS;
    }
  },
  getBlogById(id: number): BlogPost | undefined {
    return this.getBlogs().find(b => b.id === id);
  },
  addBlogPost(blog: Omit<BlogPost, "id">) {
    try {
      const blogs = this.getBlogs();
      const newBlog = { ...blog, id: blogs.length > 0 ? Math.max(...blogs.map(b => b.id)) + 1 : 1 };
      blogs.push(newBlog);
      safeSetItem("isya_blogs", JSON.stringify(blogs));
      return newBlog;
    } catch (e) {
      console.error("addBlogPost failed:", e);
      throw new Error("Unable to save blog post.");
    }
  },

  // Blog Comments
  getBlogComments(postId: number): BlogComment[] {
    this.initialize();
    try {
      const allComments = JSON.parse(safeGetItem("isya_blog_comments", "[]")) as BlogComment[];
      return allComments.filter(c => c.postId === postId);
    } catch (e) {
      return INITIAL_COMMENTS.filter(c => c.postId === postId);
    }
  },
  addBlogComment(comment: Omit<BlogComment, "id" | "createdAt">) {
    try {
      const allComments = JSON.parse(safeGetItem("isya_blog_comments", "[]")) as BlogComment[];
      const newComment: BlogComment = {
        ...comment,
        id: Date.now(),
        createdAt: Date.now()
      };
      allComments.push(newComment);
      safeSetItem("isya_blog_comments", JSON.stringify(allComments));
      return newComment;
    } catch (e) {
      console.error("addBlogComment failed:", e);
      throw new Error("Unable to submit comment. Cache storage sync failed.");
    }
  },

  // Moderation Queue
  getModerationQueue(): ModerationItem[] {
    this.initialize();
    try {
      return JSON.parse(safeGetItem("isya_moderation_queue", "[]"));
    } catch (e) {
      return INITIAL_MODERATION_QUEUE;
    }
  },
  addToModerationQueue(item: Omit<ModerationItem, "id" | "status" | "createdAt">) {
    try {
      const queue = this.getModerationQueue();
      const newItem: ModerationItem = {
        ...item,
        id: `mod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        status: "PENDING",
        createdAt: Date.now(),
      };
      queue.push(newItem);
      safeSetItem("isya_moderation_queue", JSON.stringify(queue));
      toast.success("Content has been flagged and submitted to the moderation queue.");
      return newItem;
    } catch (e) {
      console.error("addToModerationQueue failed:", e);
      throw new Error("Reporting failure. Moderation stack is offline.");
    }
  },
  updateModerationStatus(id: string, status: "APPROVED" | "REMOVED") {
    try {
      const queue = this.getModerationQueue().map(item => {
        if (item.id === id) {
          return { ...item, status };
        }
        return item;
      });
      safeSetItem("isya_moderation_queue", JSON.stringify(queue));

      const item = queue.find(q => q.id === id);
      if (item && item.contentType === "post") {
        const postsStr = safeGetItem("isya_community_posts", "");
        if (postsStr) {
          const posts = JSON.parse(postsStr) as Post[];
          const updatedPosts = posts.map(p => {
            if (p.id === Number(item.contentId)) {
              return { ...p, status: status === "APPROVED" ? "PUBLISHED" as const : "FLAGGED" as const };
            }
            return p;
          });
          safeSetItem("isya_community_posts", JSON.stringify(updatedPosts));
        }
      }
    } catch (e) {
      console.error("updateModerationStatus failed:", e);
    }
  },

  // Analytics Logs
  logFAQView(id: number) {
    try {
      const views = JSON.parse(safeGetItem("isya_analytics_faq_views", "{}"));
      views[id] = (views[id] || 0) + 1;
      safeSetItem("isya_analytics_faq_views", JSON.stringify(views));
    } catch (e) {
      console.error("logFAQView failed:", e);
    }
  },
  logMentorBooking(id: number) {
    try {
      const bookings = JSON.parse(safeGetItem("isya_analytics_mentor_bookings", "{}"));
      bookings[id] = (bookings[id] || 0) + 1;
      safeSetItem("isya_analytics_mentor_bookings", JSON.stringify(bookings));
    } catch (e) {
      console.error("logMentorBooking failed:", e);
    }
  },
  getAnalyticsData() {
    try {
      const faqViews = JSON.parse(safeGetItem("isya_analytics_faq_views", "{}"));
      const mentorBookings = JSON.parse(safeGetItem("isya_analytics_mentor_bookings", "{}"));
      return { faqViews, mentorBookings };
    } catch (e) {
      return { faqViews: {}, mentorBookings: {} };
    }
  }
};
