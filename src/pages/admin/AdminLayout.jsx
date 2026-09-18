import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, FileText, Briefcase, CalendarDays, Inbox, Receipt, Store, ShieldAlert, LogOut } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const NAV = [
  { to: "/admin", end: true, label: "Genel Bakış", icon: LayoutDashboard },
  { to: "/admin/blog", label: "Blog Yazıları", icon: FileText },
  { to: "/admin/vakalar", label: "İz Bıraktıklarımız", icon: Briefcase },
  { to: "/admin/isletmeler", label: "İşletme Rehberi", icon: Store },
  { to: "/admin/talepler", label: "Müşteri Talepleri", icon: Inbox },
  { to: "/admin/teklifler", label: "Teklifler", icon: Receipt },
  { to: "/admin/randevular", label: "Randevular", icon: CalendarDays },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 inset-x-0 z-40 h-16 border-b border-white/15 bg-[#0A0A0B]/90 backdrop-blur-xl flex items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 bg-primary" />
          <span className="font-heading font-extrabold tracking-tight text-sm">
            DİJİTRAK <span className="text-primary">/ PANEL</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground hidden sm:block">{user?.email}</span>
          <button onClick={() => logout()} className="inline-flex items-center gap-2 text-xs border border-white/20 px-3 py-2 hover:border-destructive hover:text-destructive transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Çıkış
          </button>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        <aside className="hidden lg:flex flex-col w-60 fixed bottom-0 top-16 left-0 border-r border-white/15 bg-[#0A0A0B] p-4 gap-1">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isActive ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-[#101010]"
                }`
              }
            >
              <n.icon className="w-4 h-4" /> {n.label}
            </NavLink>
          ))}
        </aside>

        <main className="flex-1 lg:pl-64 p-6 max-w-full overflow-x-auto">
          {user?.role !== "admin" ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <ShieldAlert className="w-12 h-12 text-destructive mb-4" />
              <h1 className="font-heading text-2xl font-bold">Yetkisiz erişim</h1>
              <p className="text-muted-foreground text-sm mt-2">
                Bu panele erişim için admin yetkisi gerekiyor.
              </p>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>

      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/15 bg-[#0A0A0B]/95 backdrop-blur flex">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-1 py-3 text-[10px] ${isActive ? "text-primary" : "text-muted-foreground"}`
            }
          >
            <n.icon className="w-5 h-5" /> {n.label.split(" ")[0]}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}