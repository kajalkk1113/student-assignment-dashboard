
import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { assignments as initialAssignments } from "../data/assignments";
const AssignmentContext = createContext();

export function AssignmentProvider({ children }) {
  const [assignments, setAssignments] = useLocalStorage(
  "assignments",
  initialAssignments
);

  const addAssignment = (assignmentData) => {
    const newAssignment = {
      id: Date.now(),
      ...assignmentData,
      submissions: {},
    };

    setAssignments((prev) => [...prev, newAssignment]);
  };

  const updateAssignment = (id, updatedData) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === id
          ? { ...assignment, ...updatedData }
          : assignment
      )
    );
  };

  const deleteAssignment = (id) => {
    setAssignments((prev) =>
      prev.filter((assignment) => assignment.id !== id)
    );
  };

  const submitAssignment = (assignmentId, studentId) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === assignmentId
          ? {
              ...assignment,
              submissions: {
                ...assignment.submissions,
                [studentId]: {
                  status: "Submitted",
                  submittedAt: new Date().toISOString(),
                },
              },
            }
          : assignment
      )
    );
  };

  return (
    <AssignmentContext.Provider
      value={{
        assignments,
        addAssignment,
        updateAssignment,
        deleteAssignment,
        submitAssignment,
      }}
    >
      {children}
    </AssignmentContext.Provider>
  );
}

export function useAssignments() {
  return useContext(AssignmentContext);
}

export default AssignmentContext;
