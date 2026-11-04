
import {
  LayoutDashboard,
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
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
  ];

  const userName = user?.name || "User";

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex h-screen w-64 shrink-0 flex-col
          border-r
          transition-transform duration-300 ease-in-out

          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}

          lg:sticky lg:top-0 lg:h-screen
          lg:translate-x-0

          ${
            darkMode
              ? "border-slate-800 bg-slate-950 text-white"
              : "border-slate-200 bg-white text-slate-800"
          }
        `}
      >
        <div
          className={`flex shrink-0 items-center justify-between border-b px-5 py-6 ${
            darkMode ? "border-slate-800" : "border-slate-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-600 p-2">
              <GraduationCap size={24} className="text-white" />
            </div>

            <div>
              <h1 className="text-lg font-bold">AssignHub</h1>
              <p className="text-xs text-slate-400">
                Assignment Portal
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={21} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase text-slate-400">
            Menu
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.name;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  setActivePage(item.name);
                  setMobileOpen(false);
                }}
                className={`
                  flex w-full items-center gap-3
                  rounded-xl px-4 py-3 text-sm font-medium
                  transition-colors

                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                      : darkMode
                      ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }
                `}
              >
                <Icon size={20} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div
          className={`shrink-0 border-b px-4 pb-4 ${
            darkMode ? "border-slate-800" : "border-slate-100"
          }`}
        >
          <button
            type="button"
            onClick={setDarkMode}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            className={`
              flex w-full items-center justify-between
              rounded-xl border px-4 py-3 transition

              ${
                darkMode
                  ? "border-slate-700 bg-slate-900 text-yellow-300"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-indigo-50"
              }
            `}
          >
            <span className="flex items-center gap-3 text-sm font-medium">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>

            <span
              className={`h-5 w-10 rounded-full p-0.5 ${
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

        <div className="shrink-0 p-4">
          <div className="mb-3 flex items-center gap-3 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {userName}
              </p>

              <p className="text-xs capitalize text-slate-400">
                {user?.role || "Student"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-500/10"
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
