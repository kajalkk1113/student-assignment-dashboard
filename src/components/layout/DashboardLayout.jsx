
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ user, onLogout, children }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  // Apply dark mode to the entire HTML document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);

    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((previous) => !previous);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 transition-colors duration-300 dark:bg-[#020617] dark:text-slate-100">
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

      <div className="min-h-screen md:ml-[280px]">
        <Navbar
          user={user}
          setMobileOpen={setMobileOpen}
        />

        <main className="min-h-[calc(100vh-80px)] bg-slate-100 p-4 transition-colors duration-300 sm:p-6 dark:bg-[#020617]">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
