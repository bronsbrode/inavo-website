import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Loader2, Rocket, Code, Compass, Cog, BarChart3, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getServices, deleteService } from '@/lib/database'

const iconMap = {
  rocket: Rocket,
  code: Code,
  compass: Compass,
  cog: Cog,
  chart: BarChart3,
  users: Users,
}

export function AdminServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  const fetchServices = async () => {
    try {
      const data = await getServices()
      setServices(data)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return

    setDeleting(id)
    try {
      await deleteService(id)
      setServices(services.filter(s => s.id !== id))
    } catch (error) {
      alert('Failed to delete service: ' + error.message)
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-inavo-blue" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Services</h1>
        <Button asChild>
          <Link to="/admin/services/new">
            <Plus className="h-4 w-4 mr-2" /> Add Service
          </Link>
        </Button>
      </div>

      {services.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">No services yet.</p>
          <Button asChild>
            <Link to="/admin/services/new">
              <Plus className="h-4 w-4 mr-2" /> Add Your First Service
            </Link>
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Rocket
            return (
              <Card key={service.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-inavo-blue/10 rounded-lg">
                      <Icon className="h-6 w-6 text-inavo-blue" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{service.name}</h3>
                        {service.featured && (
                          <span className="text-xs bg-inavo-blue/20 text-inavo-blue px-2 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {service.category} • /{service.slug}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/admin/services/${service.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(service.id, service.name)}
                      disabled={deleting === service.id}
                      className="text-red-400 hover:text-red-300 hover:border-red-400"
                    >
                      {deleting === service.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
