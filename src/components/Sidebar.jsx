import { NavLink } from "react-router-dom";
import { Users, LayoutDashboard } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-zinc-900 border-r min-h-screen p-5 text-zinc-200">
      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({
            isActive,
          }) => `flex items-center gap-3 px-4 py-2 rounded-lg transition 
            ${
              isActive
                ? "bg-zinc-800 text-white font-medium"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
        >
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>

        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition
            ${
              isActive
                ? "bg-zinc-800 text-white font-medium"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`
          }
        >
          <Users size={18} /> Employees
        </NavLink>
      </nav>
    </aside>
  );
}
