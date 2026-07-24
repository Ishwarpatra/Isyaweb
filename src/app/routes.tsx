import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./components/layout/Root";
import { ErrorBoundary } from "./components/ErrorBoundary";

const LandingPage = lazy(() => import("./pages/LandingPage").then(m => ({ default: m.LandingPage })));
const BlogPage = lazy(() => import("./pages/BlogPage").then(m => ({ default: m.BlogPage })));
const BlogPostDetailPage = lazy(() => import("./pages/BlogPostDetailPage").then(m => ({ default: m.BlogPostDetailPage })));
const MediaPage = lazy(() => import("./pages/MediaPage").then(m => ({ default: m.MediaPage })));
const LoginPage = lazy(() => import("./pages/LoginPage").then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import("./pages/RegisterPage").then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage").then(m => ({ default: m.ForgotPasswordPage })));
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
      { index: true, element: <ErrorBoundary><LandingPage /></ErrorBoundary> },
      { path: "blog", element: <ErrorBoundary><BlogPage /></ErrorBoundary> },
      { path: "blog/:id", element: <ErrorBoundary><BlogPostDetailPage /></ErrorBoundary> },
      { path: "media", element: <ErrorBoundary><MediaPage /></ErrorBoundary> },
      { path: "login", element: <ErrorBoundary><LoginPage /></ErrorBoundary> },
      { path: "register", element: <ErrorBoundary><RegisterPage /></ErrorBoundary> },
      { path: "forgot-password", element: <ErrorBoundary><ForgotPasswordPage /></ErrorBoundary> },
      { path: "reset-password", element: <ErrorBoundary><ResetPasswordPage /></ErrorBoundary> },
      { path: "reset-password/:token", element: <ErrorBoundary><ResetPasswordPage /></ErrorBoundary> },
      { path: "community", element: <ErrorBoundary><CommunityPage /></ErrorBoundary> },
      { path: "admin", element: <ErrorBoundary><AdminPage /></ErrorBoundary> },
      { path: "mentor", element: <ErrorBoundary><MentorPage /></ErrorBoundary> },
      { path: "faqs", element: <ErrorBoundary><FAQPage /></ErrorBoundary> },
      { path: "moderation", element: <ErrorBoundary><ModerationPage /></ErrorBoundary> },
      { path: "guidelines", element: <ErrorBoundary><GuidelinesPage /></ErrorBoundary> },
      { path: "terms", element: <Navigate to="/guidelines#terms" replace /> },
      { path: "privacy", element: <Navigate to="/guidelines#privacy" replace /> },
      { path: "*", element: <ErrorBoundary><NotFoundPage /></ErrorBoundary> },
    ],
  },
]);
