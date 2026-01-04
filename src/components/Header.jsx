import { Building2 } from "lucide-react";

export default function Header() {
  return (
    <header className="h-14 bg-white flex items-center justify-center border-b border-zinc-800">
      <div className="flex items-center gap-2 text-zinc-900">
        <Building2 size={25} />
        <span className="text-lg font-semibold tracking-wide">
          Employee Management System
        </span>
      </div>
    </header>
  );
}
