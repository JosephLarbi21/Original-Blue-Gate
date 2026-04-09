import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#020617] border-r border-white/10 p-6">
        <h1 className="text-xl font-bold mb-10">Nelly Ange Pub & Grill</h1>

        <nav className="space-y-3">
          {[
            { name: "Dashboard", key: "dashboard" },
            { name: "Orders", key: "orders" },
            { name: "Reservations", key: "reservations" },
            { name: "Menu", key: "menu" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                activeTab === item.key
                  ? "bg-amber-400 text-black"
                  : "hover:bg-white/5 text-white/70"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <header className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-[#020617]">
          <h1 className="text-xl font-semibold capitalize">{activeTab}</h1>

          <div className="flex items-center gap-4">
            <input
              placeholder="Search..."
              className="bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-sm"
            />
            <div className="w-9 h-9 bg-amber-400 rounded-full"></div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-6 space-y-6 cursor-pointer">
          {activeTab === "dashboard" && <DashboardHome />}
          {activeTab === "orders" && <div>Orders coming here...</div>}
          {activeTab === "reservations" && <div>Reservations...</div>}
          {activeTab === "menu" && <div>Menu manager...</div>}
        </main>
      </div>
    </div>
  );
}

/* ---------------- DASHBOARD ---------------- */

function DashboardHome() {
  const [orders, setOrders] = useState([]);

  // ✅ FETCH FUNCTION FIRST
  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
    } else {
      setOrders(data || []);
    }
  };

  // ✅ REALTIME + INITIAL FETCH
  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel("dashboard-orders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  /* ---------------- CALCULATIONS ---------------- */

  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.price || 0) * (o.quantity || 1),
    0
  );

  const totalOrders = orders.length;

  const monthlyMap = {};
  orders.forEach((o) => {
    if (!o.created_at) return;

    const month = new Date(o.created_at).toLocaleString("default", {
      month: "short",
    });

    if (!monthlyMap[month]) monthlyMap[month] = 0;

    monthlyMap[month] += (o.price || 0) * (o.quantity || 1);
  });

  const revenueData = Object.keys(monthlyMap).map((month) => ({
    month,
    revenue: monthlyMap[month],
  }));

  const dishMap = {};
  orders.forEach((o) => {
    const name = o.item_name || "Unknown";

    if (!dishMap[name]) dishMap[name] = 0;

    dishMap[name] += o.quantity || 1;
  });

  const dishData = Object.keys(dishMap).map((name) => ({
    name,
    value: dishMap[name],
  }));

  const COLORS = ["#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"];

  return (
    <div className="space-y-6">

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Revenue" value={`GH₵ ${totalRevenue}`} />
        <StatCard title="Orders" value={totalOrders} />
        <StatCard
          title="Customers"
          value={new Set(orders.map((o) => o.phone)).size}
        />
        <StatCard
          title="Active Orders"
          value={orders.filter((o) => o.status !== "Delivered").length}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* BAR CHART */}
        <div className="lg:col-span-2 bg-white/5 p-6 rounded-2xl border border-white/10">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="revenue" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h2 className="text-lg font-semibold mb-4">Top Dishes</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={dishData} dataKey="value" nameKey="name" outerRadius={90}>
                {dishData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-2">
            {dishData.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span className="text-amber-400">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- UI ---------------- */

function StatCard({ title, value }) {
  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
      <p className="text-sm text-white/60">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}
