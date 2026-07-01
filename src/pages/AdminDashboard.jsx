import { useState, useEffect } from "react";
import { menuData } from "../data/menu.js";
import { supabase } from "../lib/supabase";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  MdDashboard, MdShoppingCart, MdTableRestaurant, MdRestaurantMenu,
  MdPeople, MdStar, MdBarChart, MdLocalOffer, MdPhotoLibrary,
  MdArticle, MdGroup, MdSettings, MdPages, MdExtension,
  MdNotifications, MdSearch, MdOpenInNew, MdTrendingUp,
  MdAttachMoney, MdAddCircle, MdSend, MdInventory2,
  MdDeliveryDining, MdCheckCircle, MdCancel, MdPending,
  MdAccessTime, MdChevronRight, MdMoreVert, MdCalendarMonth,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";

const SIDEBAR_NAV = [
  { key: "dashboard", label: "Dashboard", icon: MdDashboard },
  { key: "orders", label: "Orders", icon: MdShoppingCart, badge: null },
  { key: "reservations", label: "Reservations", icon: MdTableRestaurant },
  { key: "menu", label: "Menu Management", icon: MdRestaurantMenu },
  { key: "customers", label: "Customers", icon: MdPeople },
  { key: "reviews", label: "Reviews", icon: MdStar },
  { key: "analytics", label: "Analytics", icon: MdBarChart },
  { key: "coupons", label: "Coupons & Offers", icon: RiCoupon3Line },
  { key: "gallery", label: "Gallery", icon: MdPhotoLibrary },
  { key: "staff", label: "Staff Management", icon: MdGroup },
  { key: "settings", label: "Settings", icon: MdSettings },
];

const STATUS_CONFIG = {
  Pending:       { color: "text-amber-400",  bg: "bg-amber-400/10",  dot: "bg-amber-400" },
  Preparing:     { color: "text-orange-400", bg: "bg-orange-400/10", dot: "bg-orange-400" },
  "Out for Delivery": { color: "text-blue-400", bg: "bg-blue-400/10", dot: "bg-blue-400" },
  Delivered:     { color: "text-emerald-400", bg: "bg-emerald-400/10", dot: "bg-emerald-400" },
  Cancelled:     { color: "text-red-400",    bg: "bg-red-400/10",    dot: "bg-red-400" },
};

const PAYMENT_CONFIG = {
  Paid:    { color: "text-emerald-400", bg: "bg-emerald-400/10" },
  Unpaid:  { color: "text-red-400",     bg: "bg-red-400/10" },
  Pending: { color: "text-amber-400",   bg: "bg-amber-400/10" },
};

const CHART_COLORS = ["#f59e0b", "#8b5cf6", "#3b82f6", "#10b981", "#ec4899"];

function getInitials(name = "") {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "?";
}

function avatarColor(name = "") {
  const colors = ["bg-amber-500","bg-violet-500","bg-blue-500","bg-emerald-500","bg-pink-500","bg-orange-500"];
  let hash = 0;
  for (let c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffff;
  return colors[hash % colors.length];
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    const [{ data: ord }, { data: res }] = await Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("reservations").select("*").order("created_at", { ascending: false }),
    ]);
    setOrders(ord || []);
    setReservations(res || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
    const channel = supabase.channel("admin-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, fetchAll)
      .on("postgres_changes", { event: "*", schema: "public", table: "reservations" }, fetchAll)
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  const pendingCount = orders.filter(o => o.status === "Pending" || o.status === "Preparing").length;

  return (
    <div className="flex min-h-screen bg-[#0d0d1b] text-white font-sans">

      {/* ── SIDEBAR ── */}
      <aside className="w-56 shrink-0 bg-[#09091a] border-r border-white/5 flex flex-col sticky top-0 h-screen overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-black font-bold text-sm shrink-0">
            NA
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm leading-tight truncate">Nelly Ange</p>
            <p className="text-[10px] text-white/40 truncate">Taste. Elegance.</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {SIDEBAR_NAV.map(({ key, label, icon: Icon, badge }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                activeTab === key
                  ? "bg-amber-500/10 text-amber-400 font-semibold"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <Icon className="text-lg shrink-0" />
              <span className="truncate">{label}</span>
              {key === "orders" && pendingCount > 0 && (
                <span className="ml-auto bg-amber-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Upgrade box */}
        <div className="mx-3 mb-4 p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/20">
          <p className="text-xs font-semibold text-amber-400">Upgrade to Pro</p>
          <p className="text-[10px] text-white/40 mt-0.5 leading-snug">Unlock analytics & marketing tools</p>
          <button className="mt-2 w-full py-1.5 rounded-lg bg-amber-500 text-black text-xs font-bold hover:bg-amber-400 transition">
            Upgrade Now
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* TOP BAR */}
        <header className="sticky top-0 z-20 bg-[#0d0d1b]/90 backdrop-blur border-b border-white/5 px-6 py-3 flex items-center gap-4">
          <div className="flex-1 flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-3 py-2 max-w-xs">
            <MdSearch className="text-white/30 text-lg shrink-0" />
            <input
              placeholder="Search anything..."
              className="bg-transparent text-sm text-white placeholder-white/30 outline-none w-full"
            />
            <span className="text-[10px] text-white/20 shrink-0 hidden sm:block">⌘K</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/5 transition"
            >
              Visit Website <MdOpenInNew className="text-base" />
            </a>

            <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <MdNotifications className="text-xl text-white/70" />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-black text-xs font-bold">
                AN
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold leading-none">Admin Nelly</p>
                <p className="text-[10px] text-white/40 mt-0.5">Super Admin</p>
              </div>
              <MdKeyboardArrowDown className="text-white/30" />
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "dashboard"    && <DashboardTab orders={orders} reservations={reservations} loading={loading} />}
          {activeTab === "orders"       && <OrdersTab orders={orders} onRefresh={fetchAll} />}
          {activeTab === "reservations" && <ReservationsTab reservations={reservations} />}
          {activeTab === "menu"         && <MenuTab />}
          {!["dashboard","orders","reservations","menu"].includes(activeTab) && (
            <div className="flex items-center justify-center h-64 text-white/20 text-lg capitalize">
              {activeTab} — coming soon
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   DASHBOARD TAB
══════════════════════════════════════════ */
function DashboardTab({ orders, reservations, loading }) {
  const totalRevenue = orders.reduce((s, o) => s + (o.total_price || 0), 0);
  const totalOrders  = orders.length;
  const uniqueCustomers = new Set(orders.map(o => o.phone)).size;
  const totalReservations = reservations.length;
  const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

  const paidRevenue = orders
    .filter(o => o.payment_status === "Paid")
    .reduce((s, o) => s + (o.total_price || 0), 0);

  /* Revenue by day (last 14 days) */
  const dailyMap = {};
  const today = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
    dailyMap[key] = 0;
  }
  orders.forEach(o => {
    if (!o.created_at) return;
    const key = new Date(o.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
    if (key in dailyMap) dailyMap[key] += o.total_price || 0;
  });
  const revenueData = Object.entries(dailyMap).map(([date, revenue]) => ({ date, revenue }));

  /* Top selling items */
  const dishMap = {};
  orders.forEach(o => {
    const n = o.item_name || "Unknown";
    dishMap[n] = (dishMap[n] || 0) + (o.quantity || 1);
  });
  const topDishes = Object.entries(dishMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));
  const maxDish = topDishes[0]?.count || 1;

  /* Order status breakdown */
  const statusMap = {};
  orders.forEach(o => { statusMap[o.status] = (statusMap[o.status] || 0) + 1; });
  const statusData = Object.entries(statusMap).map(([name, value]) => ({ name, value }));

  /* Order type breakdown */
  const typeMap = {};
  orders.forEach(o => { typeMap[o.order_type || "Pickup"] = (typeMap[o.order_type || "Pickup"] || 0) + 1; });
  const typeData = Object.entries(typeMap).map(([name, value]) => ({ name, value }));

  /* Recent orders */
  const recentOrders = orders.slice(0, 6);

  /* Recent activity */
  const recentActivity = orders.slice(0, 5).map(o => ({
    text: `New order #${o.order_id} received`,
    sub: o.customer_name || o.item_name,
    time: timeAgo(o.created_at),
    icon: MdShoppingCart,
    color: "text-amber-400",
  }));

  const STATS = [
    {
      label: "Total Revenue", value: `GH₵ ${totalRevenue.toLocaleString("en-GH", { minimumFractionDigits: 2 })}`,
      sub: `GH₵ ${paidRevenue.toLocaleString("en-GH", { minimumFractionDigits: 2 })} paid`,
      icon: MdAttachMoney, grad: "from-amber-500 to-orange-400", trend: "+18.5%",
    },
    {
      label: "Total Orders", value: totalOrders.toLocaleString(),
      sub: `${orders.filter(o=>o.status==="Pending").length} pending`,
      icon: MdShoppingCart, grad: "from-blue-500 to-cyan-400", trend: "+12%",
    },
    {
      label: "Total Customers", value: uniqueCustomers.toLocaleString(),
      sub: "Unique phone numbers",
      icon: MdPeople, grad: "from-violet-500 to-purple-400", trend: "+8.3%",
    },
    {
      label: "Reservations", value: totalReservations.toLocaleString(),
      sub: `${reservations.filter(r=>r.status==="Confirmed").length} confirmed`,
      icon: MdTableRestaurant, grad: "from-emerald-500 to-teal-400", trend: "+15.2%",
    },
    {
      label: "Avg. Order Value", value: `GH₵ ${avgOrderValue.toFixed(2)}`,
      sub: "Per transaction",
      icon: MdBarChart, grad: "from-pink-500 to-rose-400", trend: "+6.8%",
    },
  ];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard <span>👋</span></h1>
          <p className="text-white/40 text-sm mt-1">Welcome back, Admin Nelly! Here's what's happening with Nelly Ange.</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white/60">
          <MdCalendarMonth />
          <span>{new Date().toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" })}</span>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {STATS.map((s, i) => (
          <div key={i} className="bg-[#13132a] border border-white/5 rounded-2xl p-4 flex flex-col gap-3 hover:border-white/10 transition">
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center`}>
                <s.icon className="text-white text-xl" />
              </div>
              <span className="text-emerald-400 text-xs font-semibold flex items-center gap-0.5">
                <MdTrendingUp /> {s.trend}
              </span>
            </div>
            <div>
              <p className="text-xl font-bold leading-tight">{s.value}</p>
              <p className="text-xs text-white/40 mt-1">{s.label}</p>
              <p className="text-[11px] text-white/25 mt-0.5 truncate">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ROW 2: Revenue Chart + Top Selling + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-[#13132a] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Revenue Overview</h2>
            <span className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-white/40">Last 14 Days</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#ffffff20" tick={{ fill: "#ffffff40", fontSize: 10 }} tickLine={false} axisLine={false} interval={3} />
              <YAxis stroke="#ffffff20" tick={{ fill: "#ffffff40", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `₵${v}`} />
              <Tooltip
                contentStyle={{ background: "#1e1e3a", border: "1px solid #ffffff10", borderRadius: 10, fontSize: 12 }}
                labelStyle={{ color: "#ffffff80" }}
                formatter={v => [`GH₵ ${v.toFixed(2)}`, "Revenue"]}
              />
              <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} fill="url(#revGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Selling Items */}
        <div className="bg-[#13132a] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm">Top Selling Items</h2>
            <button className="text-xs text-amber-400 hover:underline">View all</button>
          </div>
          {topDishes.length === 0 ? (
            <p className="text-white/20 text-sm text-center py-8">No orders yet</p>
          ) : (
            <div className="space-y-4">
              {topDishes.map((d, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/70 truncate max-w-[70%]">{d.name}</span>
                    <span className="text-white/40">{d.count}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${(d.count / maxDish) * 100}%`,
                        background: CHART_COLORS[i % CHART_COLORS.length],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ROW 3: Order Stats + By Type + Recent Orders + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Order Statistics Donut */}
        <div className="bg-[#13132a] border border-white/5 rounded-2xl p-5">
          <h2 className="font-semibold text-sm mb-4">Order Statistics</h2>
          {statusData.length === 0 ? (
            <p className="text-white/20 text-sm text-center py-8">No data yet</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={statusData} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={3}>
                    {statusData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#1e1e3a", border: "1px solid #ffffff10", borderRadius: 8, fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 space-y-2">
                {statusData.map((s, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                      <span className="text-white/60">{s.name}</span>
                    </div>
                    <span className="text-white/40">{s.value} ({Math.round(s.value/totalOrders*100)}%)</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Orders by Type Donut */}
        <div className="bg-[#13132a] border border-white/5 rounded-2xl p-5">
          <h2 className="font-semibold text-sm mb-4">Orders by Type</h2>
          {typeData.length === 0 ? (
            <p className="text-white/20 text-sm text-center py-8">No data yet</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={typeData} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={3}>
                    {typeData.map((_, i) => (
                      <Cell key={i} fill={["#f59e0b","#8b5cf6","#3b82f6","#10b981"][i % 4]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#1e1e3a", border: "1px solid #ffffff10", borderRadius: 8, fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 space-y-2">
                {typeData.map((t, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: ["#f59e0b","#8b5cf6","#3b82f6","#10b981"][i % 4] }} />
                      <span className="text-white/60 capitalize">{t.name}</span>
                    </div>
                    <span className="text-white/40">{t.value} ({Math.round(t.value/totalOrders*100)}%)</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-[#13132a] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm">Recent Activity</h2>
            <button className="text-xs text-amber-400 hover:underline">View all</button>
          </div>
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <p className="text-white/20 text-sm text-center py-8">No activity yet</p>
            ) : recentActivity.map((a, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-lg bg-amber-400/10 flex items-center justify-center shrink-0">
                  <a.icon className="text-amber-400 text-sm" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-white/80 leading-snug truncate">{a.text}</p>
                  <p className="text-[11px] text-white/30 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 4: Recent Orders table */}
      <div className="bg-[#13132a] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Recent Orders</h2>
          <button className="text-xs text-amber-400 hover:underline">View all</button>
        </div>
        <OrdersTable orders={recentOrders} compact />
      </div>

      {/* ROW 5: Quick Actions */}
      <div className="bg-[#13132a] border border-white/5 rounded-2xl p-5">
        <h2 className="font-semibold text-sm mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {[
            { label: "Add Menu Item",       icon: MdAddCircle,   color: "text-amber-400",  bg: "bg-amber-400/10" },
            { label: "Create Offer",         icon: RiCoupon3Line, color: "text-violet-400", bg: "bg-violet-400/10" },
            { label: "Add Product",          icon: MdInventory2,  color: "text-blue-400",   bg: "bg-blue-400/10" },
            { label: "Manage Reservations",  icon: MdTableRestaurant, color: "text-emerald-400", bg: "bg-emerald-400/10" },
            { label: "Send Notification",    icon: MdSend,        color: "text-pink-400",   bg: "bg-pink-400/10" },
            { label: "View Analytics",       icon: MdBarChart,    color: "text-orange-400", bg: "bg-orange-400/10" },
          ].map((a, i) => (
            <button key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/5 transition group">
              <div className={`w-10 h-10 rounded-xl ${a.bg} flex items-center justify-center group-hover:scale-110 transition`}>
                <a.icon className={`text-xl ${a.color}`} />
              </div>
              <span className="text-[10px] text-white/40 text-center leading-tight">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ORDERS TAB
══════════════════════════════════════════ */
function OrdersTab({ orders, onRefresh }) {
  const [filter, setFilter] = useState("All");
  const [payFilter, setPayFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState(null);

  const statuses = ["All", "Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];
  const payStatuses = ["All", "Paid", "Unpaid", "Pending"];

  const filtered = orders.filter(o => {
    const matchStatus = filter === "All" || o.status === filter;
    const matchPay = payFilter === "All" || o.payment_status === payFilter;
    const matchSearch = !search ||
      (o.customer_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (o.order_id || "").toLowerCase().includes(search.toLowerCase()) ||
      (o.item_name || "").toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchPay && matchSearch;
  });

  const updateStatus = async (id, status) => {
    setUpdating(id + status);
    await supabase.from("orders").update({ status }).eq("id", id);
    await onRefresh();
    setUpdating(null);
  };

  const updatePayment = async (id, payment_status) => {
    setUpdating(id + payment_status);
    await supabase.from("orders").update({ payment_status }).eq("id", id);
    await onRefresh();
    setUpdating(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
        <span className="text-white/40 text-sm">{filtered.length} of {orders.length} shown</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-3 py-2 flex-1 min-w-[180px] max-w-xs">
          <MdSearch className="text-white/30" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="bg-transparent text-sm outline-none text-white placeholder-white/30 w-full"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {statuses.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter===s ? "bg-amber-500 text-black" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {payStatuses.map(s => (
            <button key={s} onClick={() => setPayFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${payFilter===s ? "bg-violet-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
              {s === "All" ? "💳 All" : s === "Paid" ? "✅ Paid" : s === "Unpaid" ? "❌ Unpaid" : "🕐 Pending"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#13132a] border border-white/5 rounded-2xl overflow-hidden">
        <OrdersTable orders={filtered} onUpdateStatus={updateStatus} onUpdatePayment={updatePayment} updating={updating} />
      </div>
    </div>
  );
}

function OrdersTable({ orders, compact, onUpdateStatus, onUpdatePayment, updating }) {
  if (orders.length === 0) {
    return <p className="text-white/20 text-sm text-center py-10">No orders found</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5 text-white/30 text-xs uppercase tracking-wide">
            <th className="text-left px-4 py-3">Customer</th>
            <th className="text-left px-4 py-3">Order ID</th>
            <th className="text-left px-4 py-3">Item</th>
            <th className="text-left px-4 py-3">Total</th>
            <th className="text-left px-4 py-3">Type</th>
            <th className="text-left px-4 py-3">Payment</th>
            <th className="text-left px-4 py-3">Status</th>
            {!compact && <th className="text-left px-4 py-3">Time</th>}
            {!compact && <th className="text-left px-4 py-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => {
            const st = STATUS_CONFIG[o.status] || STATUS_CONFIG["Pending"];
            const pt = PAYMENT_CONFIG[o.payment_status] || PAYMENT_CONFIG["Pending"];
            return (
              <tr key={o.id || i} className="border-b border-white/5 hover:bg-white/3 transition last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full ${avatarColor(o.customer_name)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {getInitials(o.customer_name)}
                    </div>
                    <div>
                      <p className="font-medium text-white/90 leading-none">{o.customer_name || "—"}</p>
                      <p className="text-[11px] text-white/30 mt-0.5">{o.phone || ""}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-white/40 font-mono text-xs">{o.order_id || "—"}</td>
                <td className="px-4 py-3">
                  <p className="text-white/70 max-w-[120px] truncate">{o.item_name}</p>
                  <p className="text-[11px] text-white/30">Qty: {o.quantity || 1}</p>
                </td>
                <td className="px-4 py-3 font-semibold text-amber-400">
                  GH₵ {(o.total_price || 0).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-white/50 capitalize text-xs">{o.order_type || "Pickup"}</td>
                <td className="px-4 py-3">
                  {!compact && onUpdatePayment ? (
                    <select
                      value={o.payment_status || "Pending"}
                      onChange={e => onUpdatePayment(o.id, e.target.value)}
                      disabled={!!updating}
                      className={`text-xs px-2 py-1 rounded-lg border-0 outline-none cursor-pointer ${pt.bg} ${pt.color} bg-transparent`}
                    >
                      <option value="Paid">✅ Paid</option>
                      <option value="Unpaid">❌ Unpaid</option>
                      <option value="Pending">🕐 Pending</option>
                    </select>
                  ) : (
                    <span className={`text-xs px-2.5 py-1 rounded-lg ${pt.bg} ${pt.color}`}>
                      {o.payment_status || "Pending"}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {!compact && onUpdateStatus ? (
                    <select
                      value={o.status || "Pending"}
                      onChange={e => onUpdateStatus(o.id, e.target.value)}
                      disabled={!!updating}
                      className={`text-xs px-2 py-1 rounded-lg border-0 outline-none cursor-pointer ${st.bg} ${st.color} bg-transparent`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg ${st.bg} ${st.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                      {o.status || "Pending"}
                    </span>
                  )}
                </td>
                {!compact && (
                  <td className="px-4 py-3 text-white/30 text-xs">{timeAgo(o.created_at)}</td>
                )}
                {!compact && (
                  <td className="px-4 py-3">
                    {updating && updating.startsWith(o.id) ? (
                      <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    ) : null}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ══════════════════════════════════════════
   RESERVATIONS TAB
══════════════════════════════════════════ */
function ReservationsTab({ reservations }) {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Reservations</h1>
      {reservations.length === 0 ? (
        <div className="bg-[#13132a] border border-white/5 rounded-2xl p-10 text-center text-white/20">
          No reservations yet
        </div>
      ) : (
        <div className="bg-[#13132a] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-white/30 text-xs uppercase tracking-wide">
                  <th className="text-left px-4 py-3">Guest</th>
                  <th className="text-left px-4 py-3">Date & Time</th>
                  <th className="text-left px-4 py-3">Guests</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Notes</th>
                  <th className="text-left px-4 py-3">Booked</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r, i) => (
                  <tr key={r.id || i} className="border-b border-white/5 hover:bg-white/3 last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full ${avatarColor(r.name)} flex items-center justify-center text-white text-xs font-bold`}>
                          {getInitials(r.name)}
                        </div>
                        <div>
                          <p className="font-medium text-white/90">{r.name || "—"}</p>
                          <p className="text-[11px] text-white/30">{r.phone || r.email || ""}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-white/70">{r.date || "—"}</p>
                      <p className="text-[11px] text-white/30">{r.time || ""}</p>
                    </td>
                    <td className="px-4 py-3 text-white/60">{r.guests || r.party_size || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-lg ${
                        r.status === "Confirmed" ? "bg-emerald-400/10 text-emerald-400" :
                        r.status === "Cancelled" ? "bg-red-400/10 text-red-400" :
                        "bg-amber-400/10 text-amber-400"
                      }`}>
                        {r.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/30 text-xs max-w-[150px] truncate">{r.notes || r.special_requests || "—"}</td>
                    <td className="px-4 py-3 text-white/30 text-xs">{timeAgo(r.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   MENU TAB
══════════════════════════════════════════ */
function MenuTab() {
  const allItems = (Array.isArray(menuData) ? menuData : [])
    .flatMap(cat => (cat.items || []).map(item => ({ ...item, category: item.category || cat.category })));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Menu Management</h1>
        <span className="text-white/40 text-sm">{allItems.length} items</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allItems.map((item, i) => (
          <div key={i} className="bg-[#13132a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition">
            {item.image && (
              <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
            )}
            <div className="p-3">
              <p className="font-semibold text-sm text-white/90 truncate">{item.name}</p>
              <p className="text-xs text-white/30 mt-0.5 line-clamp-2">{item.description || ""}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-amber-400 text-sm font-bold">
                  {item.price ? `GH₵ ${item.price}` :
                   item.priceRange ? `GH₵ ${item.priceRange[0]}–${item.priceRange[1]}` : ""}
                </span>
                {item.category && (
                  <span className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded-full">{item.category}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
function timeAgo(ts) {
  if (!ts) return "—";
  const diff = (Date.now() - new Date(ts)) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return `${Math.floor(diff/86400)}d ago`;
}
