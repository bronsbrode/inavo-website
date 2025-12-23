import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Code, Compass, Cog, Rocket, BarChart3, Users, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getServiceBySlug } from '@/lib/database'

const iconMap = {
  rocket: Rocket,
  code: Code,
  compass: Compass,
  cog: Cog,
  chart: BarChart3,
  users: Users,
}

export function ServiceDetail() {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true)
      try {
        const data = await getServiceBySlug(slug)
        setService(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchService()
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-inavo-blue" />
        <span className="ml-2 text-muted-foreground">Loading service...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-8">{error}</p>
          <Button asChild>
            <Link to="/services">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const Icon = iconMap[service.icon] || Rocket

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/services"
            className="inline-flex items-center text-muted-foreground hover:text-inavo-blue mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-inavo-blue/10 rounded-xl">
                <Icon className="h-12 w-12 text-inavo-blue" />
              </div>
              <div>
                <span className="text-sm text-muted-foreground capitalize">
                  {service.category} Services
                </span>
                <h1 className="text-4xl md:text-5xl font-bold">{service.name}</h1>
              </div>
            </div>
          </header>

          <section className="mb-12">
            <p className="text-xl text-foreground/90 leading-relaxed">
              {service.description}
            </p>
          </section>

          <section className="mb-12 bg-inavo-dark/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Expert consultation and strategy development',
                'End-to-end implementation support',
                'Dedicated project management',
                'Ongoing support and optimization',
                'Knowledge transfer and training',
                'Measurable business outcomes',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-inavo-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-inavo-blue" />
                  </div>
                  <span className="text-foreground/90">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-gradient-to-r from-inavo-blue/20 to-inavo-terracotta/20 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Let's discuss how our {service.name.toLowerCase()} services can help your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">
                  Schedule Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/portfolio">View Case Studies</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
