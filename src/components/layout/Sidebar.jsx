
import {
  LayoutDashboard,
  BookOpen,
  Users,
  LogOut,
  GraduationCap,
  X,
  Moon,
  Sun,
} from "lucide-react";

function Sidebar({
  user,
  onLogout,
  activePage,
  setActivePage,
  mobileOpen,
  setMobileOpen,
  darkMode,
  setDarkMode,
}) {
  const menuItems =
   [
          { name: "Dashboard", icon: LayoutDashboard },
        ];

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 flex flex-col border-r transition-all duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        ${
          darkMode
            ? "bg-slate-950 border-slate-800 text-white"
            : "bg-white border-slate-200 text-slate-800"
        }`}
      >
        {/* Logo */}
        <div
          className={`flex items-center justify-between px-6 py-6 border-b ${
            darkMode ? "border-slate-800" : "border-slate-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <GraduationCap className="text-white" size={24} />
            </div>

            <div>
              <h1 className="font-bold text-lg">AssignHub</h1>
              <p className="text-xs text-slate-400">
                Assignment Portal
              </p>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase px-3 mb-4">
            Menu
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.name;

            return (
              <button
                key={item.name}
                onClick={() => {
                  setActivePage(item.name);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : darkMode
                    ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div
          className={`px-4 pb-4 border-b ${
            darkMode ? "border-slate-800" : "border-slate-100"
          }`}
        >
          <button
            type="button"
            onClick={setDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition
            ${
              darkMode
                ? "bg-slate-900 border-slate-700 text-yellow-300"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-indigo-50"
            }`}
          >
            <span className="flex items-center gap-3 text-sm font-medium">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>

            <span
              className={`w-10 h-5 rounded-full p-0.5 ${
                darkMode ? "bg-indigo-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`block h-4 w-4 rounded-full bg-white transition-transform ${
                  darkMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </span>
          </button>
        </div>

        {/* Profile */}
        <div className="p-4">
          <div className="flex items-center gap-3 p-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">
                {user.name}
              </p>

              <p className="text-xs text-slate-400 capitalize">
                {user.role}
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-xl transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
