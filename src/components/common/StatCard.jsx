
import { TrendingUp } from "lucide-react";

function StatCard({
  title,
  value,
  icon: Icon,
  color = "indigo",
  subtitle,
}) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
    blue: "bg-blue-50 text-blue-600",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-3">
            {value}
          </h2>

          {subtitle && (
            <p className="text-xs text-slate-400 mt-2">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`p-3 rounded-xl ${colors[color] || colors.indigo}`}>
          {Icon ? <Icon size={22} /> : <TrendingUp size={22} />}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
