
function ProgressBar({ percentage = 0, color = "indigo" }) {
  const colors = {
    indigo: "bg-indigo-600",
    green: "bg-green-500",
    blue: "bg-blue-500",
    orange: "bg-orange-500",
  };

  const progress = Math.min(100, Math.max(0, percentage));

  return (
    <div className="w-full">
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${colors[color] || colors.indigo}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
