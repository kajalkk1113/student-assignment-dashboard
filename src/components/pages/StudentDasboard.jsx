
import { useState } from "react";
import {
  BookOpen,
  CheckCircle,
  Clock,
  TrendingUp,
  Search,
  Sparkles,
  GraduationCap,
  Target,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";

import ProgressBar from "../common/ProgressBar";
import SubmissionModal from "../assignments/SubmissionModal";
import { useAssignments } from "../context/AssignmentContext";
import DashboardLayout from "../layout/DashboardLayout";
import AssignmentCard from "../assignments/AssignmentCard";

function StudentDashboard({ user, onLogout }) {
  const { assignments, submitAssignment } = useAssignments();

  const [search, setSearch] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [filter, setFilter] = useState("All");
  const [dueFilter, setDueFilter] = useState("All Dates");
  const [sortOrder, setSortOrder] = useState("earliest");

  const card =
    "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100";

  const muted = "text-slate-500 dark:text-slate-400";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const myAssignments = assignments.filter((assignment) =>
    assignment.assignedTo?.includes(user.id)
  );


  const isSubmitted = (assignment) =>
    assignment.submissions?.[user.id]?.status === "Submitted";


  const isOverdue = (assignment) =>
    !isSubmitted(assignment) &&
    new Date(assignment.dueDate) < today;


  const submittedCount = myAssignments.filter(isSubmitted).length;

  const pendingCount = myAssignments.filter(
    (assignment) =>
      !isSubmitted(assignment) && !isOverdue(assignment)
  ).length;

  const overdueCount = myAssignments.filter(isOverdue).length;

  const progress =
    myAssignments.length > 0
      ? Math.round((submittedCount / myAssignments.length) * 100)
      : 0;


  const filteredAssignments = myAssignments
    .filter((assignment) => {
      const title = assignment.title || "";

      const matchesSearch = title
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      const submitted = isSubmitted(assignment);
      const overdue = isOverdue(assignment);

      let matchesStatus = true;

      if (filter === "Submitted") matchesStatus = submitted;
      if (filter === "Pending") matchesStatus = !submitted && !overdue;
      if (filter === "Overdue") matchesStatus = overdue;

      const dueDate = new Date(assignment.dueDate);

      let matchesDueDate = true;

      if (dueFilter === "Today") {
        matchesDueDate =
          dueDate.toDateString() === today.toDateString();
      }

      if (dueFilter === "This Week") {
        const weekEnd = new Date(today);
        weekEnd.setDate(today.getDate() + 7);

        matchesDueDate =
          dueDate >= today && dueDate <= weekEnd;
      }

      if (dueFilter === "Upcoming") {
        matchesDueDate = dueDate > today;
      }

      if (dueFilter === "Past Due") {
        matchesDueDate = dueDate < today;
      }

      return matchesSearch && matchesStatus && matchesDueDate;
    })
    .sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();

      return sortOrder === "earliest"
        ? dateA - dateB
        : dateB - dateA;
    });


  const handleConfirmSubmission = (assignmentId) => {
    submitAssignment(assignmentId, user.id);
    setSelectedAssignment(null);
  };

  const resetFilters = () => {
    setSearch("");
    setFilter("All");
    setDueFilter("All Dates");
    setSortOrder("earliest");
  };

  const stats = [
    {
      title: "Total Assignments",
      value: myAssignments.length,
      icon: BookOpen,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Submitted",
      value: submittedCount,
      icon: CheckCircle,
      color: "from-emerald-400 to-green-600",
    },
    {
      title: "Pending",
      value: pendingCount,
      icon: Clock,
      color: "from-amber-400 to-orange-500",
    },
    {
      title: "Overdue",
      value: overdueCount,
      icon: TrendingUp,
      color: "from-rose-500 to-red-600",
    },
  ];

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <div className="min-h-screen rounded-2xl p-2 sm:p-4 transition-colors duration-300">
        <div className="space-y-8 pb-8">

          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-7 sm:p-10 text-white shadow-xl shadow-indigo-200/30">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium">
                  <Sparkles size={15} />
                  Student Dashboard
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Hey, {user.name}! 👋
                </h1>

                <p className="mt-3 text-base text-indigo-100 sm:text-lg">
                  Keep learning, keep growing. Let's make today productive!
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm">
                  <Target size={17} />
                  {pendingCount} assignments waiting for you
                </div>
              </div>

              <div className="hidden h-28 w-28 rotate-3 items-center justify-center rounded-3xl border border-white/20 bg-white/15 transition hover:rotate-0 hover:scale-105 sm:flex">
                <GraduationCap size={65} strokeWidth={1.5} />
              </div>
            </div>
          </section>


          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className={`group relative overflow-hidden rounded-2xl border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${card}`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-md`}
                    >
                      <Icon size={24} />
                    </div>

                    <ArrowUpRight
                      size={20}
                      className="text-slate-400 transition group-hover:text-indigo-500"
                    />
                  </div>

                  <p className={`mt-5 text-sm font-medium ${muted}`}>
                    {stat.title}
                  </p>

                  <h2 className="mt-1 text-4xl font-bold">
                    {stat.value}
                  </h2>

                  <div
                    className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${stat.color}`}
                  />
                </div>
              );
            })}
          </section>

          <section
            className={`rounded-2xl border p-6 shadow-sm transition-colors sm:p-8 ${card}`}
          >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                  <Target size={24} />
                </div>

                <div>
                  <h2 className="text-lg font-bold">
                    Learning Progress
                  </h2>

                  <p className={`text-sm ${muted}`}>
                    Your assignment completion journey
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {progress}% Completed
              </span>
            </div>

            <ProgressBar percentage={progress} />

            <div className={`mt-4 flex justify-between text-sm ${muted}`}>
              <span>{submittedCount} completed</span>
              <span>{myAssignments.length} total assignments</span>
            </div>
          </section>

       
          <section className={`rounded-2xl border p-5 shadow-sm ${card}`}>
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"
              />

              <input
                aria-label="Search assignments by title"
                type="search"
                placeholder="Search assignments by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-indigo-950"
              />
            </div>

      
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

         
              <label className="flex flex-col gap-2 text-sm font-medium">
                <span className={muted}>Filter by Status</span>

                <select
                  aria-label="Filter assignments by status"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option>All</option>
                  <option>Pending</option>
                  <option>Submitted</option>
                  <option>Overdue</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                <span className={muted}>Filter by Due Date</span>

                <select
                  aria-label="Filter assignments by due date"
                  value={dueFilter}
                  onChange={(e) => setDueFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option>All Dates</option>
                  <option>Today</option>
                  <option>This Week</option>
                  <option>Upcoming</option>
                  <option>Past Due</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                <span className={muted}>Sort by Due Date</span>

                <select
                  aria-label="Sort assignments by due date"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="earliest">Earliest First</option>
                  <option value="latest">Latest First</option>
                </select>
              </label>
            </div>
          </section>


          <section>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  My Assignments
                </h2>

                <p className={`mt-1 text-sm ${muted}`}>
                  {filteredAssignments.length} assignments found
                </p>
              </div>

              <button
                onClick={resetFilters}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <RotateCcw size={16} />
                Reset Filters
              </button>
            </div>

            {filteredAssignments.length === 0 ? (
              <div
                className={`rounded-3xl border border-dashed p-12 text-center ${card}`}
              >
                <BookOpen size={40} className="mx-auto mb-3 text-indigo-400" />

                <h3 className="text-lg font-bold">
                  No assignments found
                </h3>

                <p className={`mt-2 text-sm ${muted}`}>
                  Try changing your search or filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                {filteredAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className={`relative rounded-2xl transition duration-300 hover:-translate-y-1 ${
                      isOverdue(assignment)
                        ? "ring-2 ring-red-400 ring-offset-2 ring-offset-red-50 dark:ring-offset-slate-950"
                        : ""
                    }`}
                  >
                    {isOverdue(assignment) && (
                      <div className="absolute -top-3 right-4 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                        OVERDUE
                      </div>
                    )}

                    <AssignmentCard
                      assignment={assignment}
                      studentId={user.id}
                      onSubmit={setSelectedAssignment}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

 
      {selectedAssignment && (
        <SubmissionModal
          assignment={selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
          onConfirm={handleConfirmSubmission}
        />
      )}
    </DashboardLayout>
  );
}

export default StudentDashboard;
