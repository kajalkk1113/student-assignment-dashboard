
function StatusBadge({ status }) {
  const styles = {
    Submitted: "bg-green-100 text-green-700",
    Pending: "bg-amber-100 text-amber-700",
    Overdue: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
