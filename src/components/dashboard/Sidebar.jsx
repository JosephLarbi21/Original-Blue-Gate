import { Home, ShoppingCart, Users, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-black/40 border-r border-white/10 p-5">
      <h2 className="text-xl font-bold mb-8 text-amber-400">
        Nelly Ange Admin
      </h2>

      <nav className="flex flex-col gap-4">
        <Link to="/admin" className="flex items-center gap-3 hover:text-amber-400">
          <Home size={18} /> Dashboard
        </Link>

        <Link to="/admin/orders" className="flex items-center gap-3 hover:text-amber-400">
          <ShoppingCart size={18} /> Orders
        </Link>

        <Link to="/admin/customers" className="flex items-center gap-3 hover:text-amber-400">
          <Users size={18} /> Customers
        </Link>

        <Link to="/admin/settings" className="flex items-center gap-3 hover:text-amber-400">
          <Settings size={18} /> Settings
        </Link>
      </nav>
    </div>
  );
}
