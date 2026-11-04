
import { Menu, Bell, CalendarDays } from "lucide-react";

function Navbar({ user, activePage, setMobileOpen }) {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between gap-4">

        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
              {activePage}
            </h1>

            <p className="hidden sm:block text-sm text-slate-500 mt-1">
              Welcome back, {user.name}!
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-5">

          <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays size={18} />
            {today}
          </div>

          <button
            className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-500"
            aria-label="Notifications"
          >
            <Bell size={20} />

            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-3 sm:pl-5">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              {user.name.charAt(0)}
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {user.name}
              </p>

              <p className="text-xs text-slate-400 capitalize">
                {user.role}
              </p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
