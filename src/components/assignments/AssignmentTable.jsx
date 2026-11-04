
import { Pencil, Trash2, Users } from "lucide-react";

import ProgressBar from "../common/ProgressBar";
import StatusBadge from "../common/StatusBadge";
import { formatDate } from "../utils/dateUtils";

function AssignmentTable({ assignments, onEdit, onDelete }) {
  const cardStyle =
    "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800";

  const textStyle = "text-slate-800 dark:text-slate-100";

  const mutedStyle = "text-slate-500 dark:text-slate-400";

  if (assignments.length === 0) {
    return (
      <div
        className={`${cardStyle} rounded-2xl p-10 text-center`}
      >
        <h3 className={`font-semibold ${textStyle}`}>
          No assignments found
        </h3>

        <p className={`mt-2 text-sm ${mutedStyle}`}>
          Create your first assignment to get started.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`${cardStyle} overflow-hidden rounded-2xl`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">

          {/* Table Header */}
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-950 dark:text-slate-400">
            <tr>
              <th className="px-5 py-4">Assignment</th>
              <th className="px-5 py-4">Due Date</th>
              <th className="px-5 py-4">Students</th>
              <th className="px-5 py-4">Completion</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {assignments.map((assignment) => {
              const assignedStudents = assignment.assignedTo || [];

              const submittedCount = assignedStudents.filter(
                (studentId) =>
                  assignment.submissions?.[studentId]?.status ===
                  "Submitted"
              ).length;

              const totalStudents = assignedStudents.length;

              const percentage =
                totalStudents > 0
                  ? Math.round(
                      (submittedCount / totalStudents) * 100
                    )
                  : 0;

              return (
                <tr
                  key={assignment.id}
                  className="bg-white text-slate-800 transition hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {/* Assignment */}
                  <td className="min-w-52 px-5 py-4">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">
                      {assignment.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {assignment.description}
                    </p>
                  </td>

                  {/* Due Date */}
                  <td className="whitespace-nowrap px-5 py-4 text-slate-600 dark:text-slate-300">
                    {formatDate(assignment.dueDate)}
                  </td>

                  {/* Students */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <Users size={16} />
                      {totalStudents}
                    </div>
                  </td>

                  {/* Completion */}
                  <td className="min-w-44 px-5 py-4">
                    <div className="mb-2 flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">
                        {submittedCount}/{totalStudents} submitted
                      </span>

                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {percentage}%
                      </span>
                    </div>

                    <ProgressBar percentage={percentage} />
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge
                      status={
                        percentage === 100
                          ? "Submitted"
                          : "Pending"
                      }
                    />
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(assignment)}
                        className="rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950"
                        title="Edit assignment"
                        aria-label="Edit assignment"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => onDelete(assignment.id)}
                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                        title="Delete assignment"
                        aria-label="Delete assignment"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssignmentTable;
