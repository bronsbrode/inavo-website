import { Link, NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, Briefcase, FolderOpen, FileText, Mail, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

const adminNavItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Services', path: '/admin/services', icon: Briefcase },
  { name: 'Portfolio', path: '/admin/portfolio', icon: FolderOpen },
  { name: 'Blog', path: '/admin/blog', icon: FileText },
  { name: 'Messages', path: '/admin/messages', icon: Mail },
]

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-inavo-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-inavo-dark border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/admin" className="text-xl font-bold text-inavo-blue">
            INAVO Admin
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-inavo-blue/20 text-inavo-blue"
                    : "text-muted-foreground hover:bg-inavo-blue/10 hover:text-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
