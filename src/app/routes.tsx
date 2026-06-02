import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./components/layout/Root";

const LandingPage = lazy(() => import("./pages/LandingPage").then(m => ({ default: m.LandingPage })));
const BlogPage = lazy(() => import("./pages/BlogPage").then(m => ({ default: m.BlogPage })));
const BlogPostDetailPage = lazy(() => import("./pages/BlogPostDetailPage").then(m => ({ default: m.BlogPostDetailPage })));
const MediaPage = lazy(() => import("./pages/MediaPage").then(m => ({ default: m.MediaPage })));
const LoginPage = lazy(() => import("./pages/LoginPage").then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import("./pages/RegisterPage").then(m => ({ default: m.RegisterPage })));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage").then(m => ({ default: m.ResetPasswordPage })));
const CommunityPage = lazy(() => import("./pages/CommunityPage").then(m => ({ default: m.CommunityPage })));
const AdminPage = lazy(() => import("./pages/AdminPage").then(m => ({ default: m.AdminPage })));
const GuidelinesPage = lazy(() => import("./pages/GuidelinesPage").then(m => ({ default: m.GuidelinesPage })));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage").then(m => ({ default: m.NotFoundPage })));
const MentorPage = lazy(() => import("./pages/MentorPage").then(m => ({ default: m.MentorPage })));
const FAQPage = lazy(() => import("./pages/FAQPage").then(m => ({ default: m.FAQPage })));
const ModerationPage = lazy(() => import("./pages/ModerationPage").then(m => ({ default: m.ModerationPage })));

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
