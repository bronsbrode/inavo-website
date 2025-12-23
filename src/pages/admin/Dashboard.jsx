import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, FolderOpen, FileText, Mail, Loader2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const API_URL = 'http://localhost:3001'

export function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [services, portfolio, blog, messages] = await Promise.all([
          fetch(`${API_URL}/api/services`).then(r => r.json()),
          fetch(`${API_URL}/api/portfolio`).then(r => r.json()),
          fetch(`${API_URL}/api/blog?published=all`).then(r => r.json()),
          fetch(`${API_URL}/api/contact`).then(r => r.json()),
        ])

        setStats({
          services: services.length,
          portfolio: portfolio.length,
          blog: blog.length,
          messages: messages.length,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-inavo-blue" />
      </div>
    )
  }

  const cards = [
    { title: 'Services', count: stats?.services || 0, icon: Briefcase, path: '/admin/services', color: 'text-inavo-blue' },
    { title: 'Portfolio', count: stats?.portfolio || 0, icon: FolderOpen, path: '/admin/portfolio', color: 'text-inavo-terracotta' },
    { title: 'Blog Posts', count: stats?.blog || 0, icon: FileText, path: '/admin/blog', color: 'text-green-400' },
    { title: 'Messages', count: stats?.messages || 0, icon: Mail, path: '/admin/messages', color: 'text-purple-400' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link key={card.path} to={card.path}>
            <Card className="hover:border-inavo-blue/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{card.count}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
