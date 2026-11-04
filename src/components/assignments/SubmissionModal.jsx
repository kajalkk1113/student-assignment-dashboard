
import { useState } from "react";
import { AlertCircle, CheckCircle, X } from "lucide-react";
import Button from "../common/Button";

function SubmissionModal({ assignment, onClose, onConfirm }) {
  const [step, setStep] = useState(1);

  if (!assignment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-slate-800">
            Submit Assignment
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {step === 1 && (
          <>
            <div className="bg-indigo-50 rounded-xl p-4 mb-4">
              <h3 className="font-semibold text-indigo-800">
                {assignment.title}
              </h3>

              <p className="text-sm text-indigo-600 mt-2">
                Have you completed and submitted this assignment?
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500 mb-5">
              <AlertCircle size={16} />
              Please make sure your work is submitted.
            </div>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                onClick={() => setStep(2)}
                className="flex-1"
              >
                Yes, I have submitted
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="text-center py-4">
              <CheckCircle
                size={48}
                className="text-green-500 mx-auto mb-3"
              />

              <h3 className="text-lg font-semibold text-slate-800">
                Final Confirmation
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Are you sure you want to mark this assignment as submitted?
              </p>
            </div>

            <div className="flex gap-3 mt-4">
              <Button
                variant="secondary"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                Go Back
              </Button>

              <Button
                variant="success"
                onClick={() => onConfirm(assignment.id)}
                className="flex-1"
              >
                Confirm Submission
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SubmissionModal;
