
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ user, onLogout, children }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);

    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen w-full overflow-x-clip bg-slate-100 dark:bg-slate-950">

      <Sidebar
        user={user}
        onLogout={onLogout}
        activePage={activePage}
        setActivePage={setActivePage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        darkMode={darkMode}
        setDarkMode={toggleDarkMode}
      />

      <div className="flex min-w-0 flex-1 flex-col">

        <Navbar
          user={user}
          activePage={activePage}
          setMobileOpen={setMobileOpen}
        />

        <main className="min-w-0 w-full flex-1 p-3 sm:p-5 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px] min-w-0">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;
