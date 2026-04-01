export default function StatsCard({ title, value, color }) {
  const colors = {
    green: "from-green-400 to-green-600",
    amber: "from-amber-400 to-amber-600",
    blue: "from-blue-400 to-blue-600",
    red: "from-red-400 to-red-600",
  };

  return (
    <div
      className={`p-5 rounded-2xl bg-gradient-to-r ${colors[color]} shadow-lg`}
    >
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}
