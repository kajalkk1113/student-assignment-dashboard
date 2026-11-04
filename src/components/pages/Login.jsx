
import { useState } from "react";
import {
  GraduationCap,
  ArrowRight,
  UserRound,
  Sparkles,
  BookOpen,
} from "lucide-react";

import { users } from "../data/user";

function Login({ onLogin }) {
  const [selectedEmail, setSelectedEmail] = useState("");

  const selectedUser = users.find(
    (user) => user.email === selectedEmail
  );

  const handleLogin = () => {
    if (selectedUser) {
      onLogin(selectedUser);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-violet-900 to-slate-950 flex items-center justify-center px-4 py-10">

      {/* Background decorations */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

      {/* Login card */}
      <div className="relative w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-xl shadow-indigo-500/30 mb-4">
            <GraduationCap size={34} className="text-white" />
          </div>

          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Assignment Portal
          </h1>

          <p className="text-indigo-200 mt-3 text-base">
            Your learning journey starts here.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-7 sm:p-9 shadow-2xl">

          <div className="flex items-center gap-3 mb-7">
            <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center">
              <Sparkles className="text-violet-200" size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Welcome back!
              </h2>
              <p className="text-sm text-indigo-200">
                Select your account to continue
              </p>
            </div>
          </div>

          {/* User selection */}
          <label className="block text-sm font-semibold text-indigo-100 mb-2">
            Select Demo User
          </label>

          <div className="relative mb-5">
          
            
<select
  value={selectedEmail}
  onChange={(e) => setSelectedEmail(e.target.value)}
  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
>
  <option value="">Choose your account</option>

  {users.map((user) => (
    <option key={user.id} value={user.email}>
      {user.name} — {user.role}
    </option>
  ))}
</select>

          </div>

          {/* Selected user */}
          {selectedUser && (
            <div className="mb-5 flex items-center gap-3 rounded-xl bg-white/10 border border-white/10 p-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                {selectedUser.name.charAt(0)}
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  {selectedUser.name}
                </p>
                <p className="text-xs text-indigo-200 capitalize">
                  {selectedUser.role} account
                </p>
              </div>
            </div>
          )}

          {/* Login button */}
          <button
            onClick={handleLogin}
            disabled={!selectedUser}
            className="group w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-5 py-4 font-semibold text-white shadow-lg shadow-indigo-500/25 transition duration-300 hover:-translate-y-0.5 hover:from-violet-400 hover:to-indigo-400 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            Login to Dashboard

            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          {/* Footer */}
          <div className="mt-7 flex items-center justify-center gap-2 text-sm text-indigo-200">
            <BookOpen size={16} />
            Student Assignment Management System
          </div>
        </div>

        <p className="text-center text-xs text-indigo-300/70 mt-6">
          Demo Login • Choose your role and explore
        </p>
      </div>
    </div>
  );
}

export default Login;
