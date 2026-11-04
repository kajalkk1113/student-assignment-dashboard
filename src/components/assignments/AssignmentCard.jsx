
import {
  CalendarDays,
  ExternalLink,
  FileText,
  CheckCircle,
  Clock,
} from "lucide-react";

import StatusBadge from "../common/StatusBadge";
import Button from "../common/Button";
import { isOverdue } from "../utils/dateUtils";

function AssignmentCard({ assignment, studentId, onSubmit }) {
  const submission = assignment.submissions?.[studentId];

  const submitted = submission?.status === "Submitted";

  const overdue = !submitted && isOverdue(assignment.dueDate);

  const status = submitted
    ? "Submitted"
    : overdue
    ? "Overdue"
    : "Pending";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <FileText size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              {assignment.title}
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              Assignment #{assignment.id}
            </p>
          </div>
        </div>

        <StatusBadge status={status} />
      </div>

      <p className="text-sm text-slate-600 mt-4 leading-6">
        {assignment.description}
      </p>

      <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
        <CalendarDays size={16} />

        <span>
          Due: {assignment.dueDate}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-slate-100">
        {assignment.driveLink && (
          <a
            href={assignment.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:text-indigo-800"
          >
            View Files
            <ExternalLink size={14} />
          </a>
        )}

        {submitted ? (
          <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
            <CheckCircle size={16} />
            Completed
          </div>
        ) : overdue ? (
          <div className="flex items-center gap-1 text-red-600 text-sm">
            <Clock size={16} />
            Deadline Passed
          </div>
        ) : (
          <Button
            variant="primary"
            onClick={() => onSubmit(assignment)}
          >
            Submit Assignment
          </Button>
        )}
      </div>
    </div>
  );
}

export default AssignmentCard;
