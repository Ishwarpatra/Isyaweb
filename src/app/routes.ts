import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./components/layout/Root";
import { LandingPage } from "./pages/LandingPage";
import { BlogPage } from "./pages/BlogPage";
import { MediaPage } from "./pages/MediaPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CommunityPage } from "./pages/CommunityPage";
import { AdminPage } from "./pages/AdminPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: "blog", Component: BlogPage },
      { path: "media", Component: MediaPage },
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
      { path: "community", Component: CommunityPage },
      { path: "admin", Component: AdminPage },
      // Redirect utility routes to Home or NotFound for now to avoid broken links
      { path: "reset-password", element: <Navigate to="/login" replace /> },
      { path: "terms", element: <Navigate to="/" replace /> },
      { path: "privacy", element: <Navigate to="/" replace /> },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
