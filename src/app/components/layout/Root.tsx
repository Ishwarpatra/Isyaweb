import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const HIDE_FOOTER_PATHS = ["/login", "/register", "/admin"];

export function Root() {
  const location = useLocation();
  const showFooter = !HIDE_FOOTER_PATHS.some((p) => location.pathname.startsWith(p));

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0B0F19", color: "#FFFFFF" }}
    >
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
