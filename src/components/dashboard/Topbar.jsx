export default function Topbar() {
  return (
    <div className="h-16 border-b border-white/10 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="bg-black/30 px-3 py-2 rounded-lg text-sm outline-none"
        />

        <div className="w-8 h-8 bg-amber-400 rounded-full" />
      </div>
    </div>
  );
}
