
import { useState } from "react";
import { X, Plus, Users } from "lucide-react";

import Button from "../common/Button";
import { students } from "../data/user";

function AssignmentForm({ initialData, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    dueDate: initialData?.dueDate || "",
    driveLink: initialData?.driveLink || "",
    assignedTo: initialData?.assignedTo || [],
  });

  const [assignAll, setAssignAll] = useState(
    initialData
      ? initialData.assignedTo.length === students.length
      : true
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStudentChange = (studentId) => {
    setFormData((prev) => {
      const selected = prev.assignedTo.includes(studentId);

      return {
        ...prev,
        assignedTo: selected
          ? prev.assignedTo.filter((id) => id !== studentId)
          : [...prev.assignedTo, studentId],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      assignedTo: assignAll
        ? students.map((student) => student.id)
        : formData.assignedTo,
    };

    onSubmit(finalData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">

        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">
            {initialData ? "Edit Assignment" : "Create Assignment"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700"
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Assignment Title *
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter assignment title"
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description *
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the assignment"
              rows={4}
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Due Date *
            </label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Google Drive Link
            </label>

            <input
              type="url"
              name="driveLink"
              value={formData.driveLink}
              onChange={handleChange}
              placeholder="https://drive.google.com/..."
              className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users size={18} className="text-indigo-600" />

              <h3 className="font-semibold text-slate-800">
                Assign Students
              </h3>
            </div>

            <label className="flex items-center gap-2 text-sm mb-4">
              <input
                type="checkbox"
                checked={assignAll}
                onChange={(e) => setAssignAll(e.target.checked)}
              />
              Assign to all students
            </label>

            {!assignAll && (
              <div className="space-y-2">
                {students.map((student) => (
                  <label
                    key={student.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={formData.assignedTo.includes(student.id)}
                      onChange={() => handleStudentChange(student.id)}
                    />

                    <span>{student.name}</span>

                    <span className="text-slate-400">
                      ({student.email})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit" variant="primary">
              <span className="flex items-center gap-2">
                <Plus size={16} />
                {initialData ? "Update Assignment" : "Create Assignment"}
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignmentForm;
