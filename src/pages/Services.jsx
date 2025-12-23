import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Code, Compass, Cog, Rocket, BarChart3, Users, Loader2, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getServices } from '@/lib/database'

const iconMap = {
  rocket: Rocket,
  code: Code,
  compass: Compass,
  cog: Cog,
  chart: BarChart3,
  users: Users,
}

function ServiceCard({ service }) {
  const Icon = iconMap[service.icon] || Rocket

  return (
    <Link to={`/services/${service.slug}`}>
      <Card className={cn(
        "h-full hover:border-inavo-blue/50 transition-all hover:-translate-y-1 duration-300 cursor-pointer",
        service.featured && "ring-1 ring-inavo-blue/30"
      )}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <Icon className="h-10 w-10 text-inavo-blue" />
            {service.featured && (
              <span className="text-xs bg-inavo-blue/20 text-inavo-blue px-2 py-1 rounded">
                Featured
              </span>
            )}
          </div>
          <CardTitle className="mt-4">{service.name}</CardTitle>
          <CardDescription>{service.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="inline-block text-xs bg-inavo-olive/30 text-foreground/70 px-2 py-1 rounded capitalize">
              {service.category}
            </span>
            <span className="text-inavo-blue text-sm flex items-center">
              Learn More <ArrowRight className="ml-1 h-3 w-3" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-inavo-blue" />
      <span className="ml-2 text-muted-foreground">Loading services...</span>
    </div>
  )
}

function ErrorState({ error, onRetry }) {
  return (
    <div className="text-center py-20">
      <p className="text-red-400 mb-4">Failed to load services: {error}</p>
      <Button variant="outline" onClick={onRetry}>Try Again</Button>
    </div>
  )
}

export function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchServices = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getServices()
      setServices(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const technologyServices = services.filter(s => s.category === 'technology')
  const businessServices = services.filter(s => s.category === 'business')

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions spanning technology and business consulting
            to help your organization achieve its goals.
          </p>
        </div>

        {loading && <LoadingState />}
        {error && <ErrorState error={error} onRetry={fetchServices} />}

        {!loading && !error && (
          <>
            {technologyServices.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Code className="mr-2 text-inavo-blue" />
                  Technology Services
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {technologyServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            )}

            {businessServices.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Cog className="mr-2 text-inavo-terracotta" />
                  Business Services
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {businessServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className="text-center bg-inavo-dark/50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-4">Not sure which service you need?</h2>
          <p className="text-muted-foreground mb-6">
            Let's discuss your challenges and find the right solution together.
          </p>
          <Button size="lg" asChild>
            <Link to="/contact">Schedule a Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
