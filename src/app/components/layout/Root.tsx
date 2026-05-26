import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const HIDE_FOOTER_PATHS = ["/login", "/register", "/admin", "/ets"];
const HIDE_NAVBAR_PATHS = ["/ets"];

export function Root() {
  const location = useLocation();
  const showFooter = !HIDE_FOOTER_PATHS.some((p) => location.pathname.startsWith(p));
  const showNavbar = !HIDE_NAVBAR_PATHS.some((p) => location.pathname.startsWith(p));

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0B0F19", color: "#FFFFFF" }}
    >
      {showNavbar && <Navbar />}
      <main className={`flex-1 ${showNavbar ? 'pt-16' : ''}`}>
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
