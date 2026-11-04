
import { Menu, Bell, CalendarDays } from "lucide-react";

function Navbar({ user, activePage, setMobileOpen }) {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const userName = user?.name || "User";

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

      <div className="flex min-h-[68px] w-full items-center justify-between gap-2 px-3 sm:px-5 lg:px-8">

        <div className="flex min-w-0 items-center gap-2 sm:gap-4">

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex-shrink-0 rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-base font-bold text-slate-800 dark:text-white sm:text-xl lg:text-2xl">
              {activePage || "Dashboard"}
            </h1>

            <p className="mt-0.5 hidden truncate text-xs text-slate-500 sm:block sm:text-sm dark:text-slate-400">
              Welcome back, {userName}!
            </p>
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-3 lg:gap-5">

          <div className="hidden items-center gap-2 text-sm text-slate-500 md:flex dark:text-slate-400">
            <CalendarDays size={18} />
            <span>{today}</span>
          </div>

          <button
            type="button"
            className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Notifications"
          >
            <Bell size={19} />

            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="mx-1 hidden h-8 border-l border-slate-200 sm:block dark:border-slate-700" />

          <div className="flex min-w-0 items-center gap-2">

            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600 sm:h-9 sm:w-9">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className="hidden min-w-0 sm:block">
              <p className="max-w-[120px] truncate text-sm font-semibold text-slate-800 dark:text-white lg:max-w-[180px]">
                {userName}
              </p>

              <p className="text-xs capitalize text-slate-400">
                {user?.role || "Student"}
              </p>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
