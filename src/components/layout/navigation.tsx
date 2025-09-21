import { useState } from "react"
import { NavLink } from "react-router-dom"
import { 
  Activity, 
  BarChart3, 
  Bell, 
  Building2, 
  FlaskConical, 
  Home, 
  Settings, 
  Shield, 
  Users,
  Menu,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Real-time Monitor", href: "/monitor", icon: Activity },
  { name: "Quality Testing", href: "/testing", icon: FlaskConical },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Hospitals", href: "/hospitals", icon: Building2 },
  { name: "Compliance", href: "/compliance", icon: Shield },
  { name: "Users", href: "/users", icon: Users },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Navigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const NavItem = ({ item }: { item: typeof navigationItems[0] }) => (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-medical",
          isActive
            ? "bg-gradient-primary text-primary-foreground shadow-medical"
            : "text-muted-foreground hover:bg-accent/10 hover:text-accent"
        )
      }
      onClick={() => setIsMobileOpen(false)}
    >
      <item.icon className="h-4 w-4" />
      {item.name}
    </NavLink>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-medical">
              <FlaskConical className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">AID-MQAN</h1>
              <p className="text-xs text-muted-foreground">Quality Assurance</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigationItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="text-xs text-muted-foreground">
            <p>Version 2.1.0</p>
            <p className="mt-1">© 2024 AID-MQAN</p>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}