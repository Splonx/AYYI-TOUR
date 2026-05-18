import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-obsidian text-ivory lg:grid lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <section className="min-w-0">{children}</section>
    </div>
  );
}
