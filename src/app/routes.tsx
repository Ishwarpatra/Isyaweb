import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./components/layout/Root";
import { LandingPage } from "./pages/LandingPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostDetailPage } from "./pages/BlogPostDetailPage";
import { MediaPage } from "./pages/MediaPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { CommunityPage } from "./pages/CommunityPage";
import { AdminPage } from "./pages/AdminPage";
import { GuidelinesPage } from "./pages/GuidelinesPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { MentorPage } from "./pages/MentorPage";
import { FAQPage } from "./pages/FAQPage";
import { ModerationPage } from "./pages/ModerationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: "blog", Component: BlogPage },
      { path: "blog/:id", Component: BlogPostDetailPage },
      { path: "media", Component: MediaPage },
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
      { path: "reset-password", Component: ResetPasswordPage },
      { path: "community", Component: CommunityPage },
      { path: "admin", Component: AdminPage },
      { path: "mentor", Component: MentorPage },
      { path: "faqs", Component: FAQPage },
      { path: "moderation", Component: ModerationPage },
      { path: "guidelines", Component: GuidelinesPage },
      // Redirect utility routes to new guidelines page hashes to avoid broken links
      { path: "terms", element: <Navigate to="/guidelines#terms" replace /> },
      { path: "privacy", element: <Navigate to="/guidelines#privacy" replace /> },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
