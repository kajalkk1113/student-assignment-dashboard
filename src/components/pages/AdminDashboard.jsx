
import { useState } from "react";
import {
  BookOpen,
  Users,
  CheckCircle,
  Plus,
  Sparkles,
  GraduationCap,
  ArrowUpRight,
  ClipboardList,
} from "lucide-react";

import AssignmentTable from "../assignments/AssignmentTable";
import AssignmentForm from "../assignments/AssignmentForm";
import { useAssignments } from "../context/AssignmentContext";
import DashboardLayout from "../layout/DashboardLayout";
import ProgressBar from "../common/ProgressBar";
import { students } from "../data/user";

function AdminDashboard({ user, onLogout }) {
  const {
    assignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
  } = useAssignments();

  const [showForm, setShowForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);

  const myAssignments = assignments.filter(
    (assignment) => assignment.createdBy === user.id
  );

  const totalAssigned = myAssignments.reduce(
    (total, assignment) =>
      total + (assignment.assignedTo?.length || 0),
    0
  );

  const totalSubmitted = myAssignments.reduce(
    (total, assignment) =>
      total +
      (assignment.assignedTo || []).filter(
        (studentId) =>
          assignment.submissions?.[studentId]?.status === "Submitted"
      ).length,
    0
  );

  const completion =
    totalAssigned > 0
      ? Math.round((totalSubmitted / totalAssigned) * 100)
      : 0;

  const handleCreate = (data) => {
    addAssignment({
      ...data,
      createdBy: user.id,
    });
    setShowForm(false);
  };

  const handleEdit = (data) => {
    updateAssignment(editingAssignment.id, data);
    setEditingAssignment(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      deleteAssignment(id);
    }
  };

  const stats = [
    {
      title: "My Assignments",
      value: myAssignments.length,
      icon: BookOpen,
      gradient: "from-blue-500 to-indigo-600",
      light: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "Total Students",
      value: students.length,
      icon: Users,
      gradient: "from-violet-500 to-purple-600",
      light: "bg-purple-50 dark:bg-purple-950",
    },
    {
      title: "Submitted",
      value: totalSubmitted,
      icon: CheckCircle,
      gradient: "from-emerald-400 to-green-600",
      light: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "Completion",
      value: `${completion}%`,
      icon: ClipboardList,
      gradient: "from-orange-400 to-amber-500",
      light: "bg-orange-50 dark:bg-orange-950",
    },
  ];

  const cardClass =
    "rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100";

  const mutedClass = "text-slate-500 dark:text-slate-400";

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <div className="admin-dashboard space-y-8 pb-8">

        {/* Welcome Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-7 text-white shadow-xl sm:p-10">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium">
                <Sparkles size={15} />
                Admin Dashboard
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome, {user.name}! 👋
              </h1>

              <p className="mt-3 text-base text-indigo-100 sm:text-lg">
                Manage assignments and track your students&apos; progress.
              </p>

              <button
                onClick={() => setShowForm(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50"
              >
                <Plus size={19} />
                Create New Assignment
              </button>
            </div>

            <div className="hidden h-28 w-28 rotate-3 items-center justify-center rounded-3xl border border-white/20 bg-white/15 sm:flex">
              <GraduationCap size={65} strokeWidth={1.5} />
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className={`${cardClass} group relative overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.light}`}>
                    <Icon size={24} className="text-slate-700 dark:text-slate-200" />
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="text-slate-400 transition group-hover:text-indigo-500"
                  />
                </div>

                <p className={`mt-5 text-sm font-medium ${mutedClass}`}>
                  {stat.title}
                </p>

                <h2 className="mt-1 text-4xl font-bold">
                  {stat.value}
                </h2>

                <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${stat.gradient}`} />
              </div>
            );
          })}
        </section>

        {/* Submission Progress */}
        <section className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm transition-colors sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                <ClipboardList size={24} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                  Submission Overview
                </h2>
                <p className={`text-sm ${mutedClass}`}>
                  Track your students&apos; assignment completion
                </p>
              </div>
            </div>

            <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              {completion}% Completed
            </span>
          </div>

          <ProgressBar percentage={completion} />

          <div className={`mt-4 flex justify-between text-sm ${mutedClass}`}>
            <span>{totalSubmitted} submitted</span>
            <span>{totalAssigned} total assigned</span>
          </div>
        </section>

        {/* Assignment Management */}
        <section>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                Assignment Management
              </h2>
              <p className={`mt-1 text-sm ${mutedClass}`}>
                Create, edit and manage your assignments
              </p>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Plus size={19} />
              Create Assignment
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <AssignmentTable
              assignments={myAssignments}
              onEdit={setEditingAssignment}
              onDelete={handleDelete}
            />
          </div>
        </section>
      </div>

      {/* Create Modal */}
      {showForm && (
        <AssignmentForm
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Edit Modal */}
      {editingAssignment && (
        <AssignmentForm
          initialData={editingAssignment}
          onSubmit={handleEdit}
          onClose={() => setEditingAssignment(null)}
        />
      )}
    </DashboardLayout>
  );
}

export default AdminDashboard;
