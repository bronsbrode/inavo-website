import { Link } from 'react-router-dom'
import { ArrowRight, Code, Compass, Cog, Rocket, BarChart3, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const featuredServices = [
  {
    icon: Rocket,
    name: 'Digital Transformation',
    description: 'End-to-end digital strategy and implementation to modernize your business.',
    slug: 'digital-transformation',
  },
  {
    icon: Code,
    name: 'Custom Software',
    description: 'Bespoke software solutions tailored to your unique requirements.',
    slug: 'custom-software',
  },
  {
    icon: Cog,
    name: 'Process Optimization',
    description: 'Streamline operations and improve efficiency across your organization.',
    slug: 'process-optimization',
  },
]

export function Home() {
  return (
    <div>
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/hero-bg.png)' }}
        />
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-inavo-dark/95 via-inavo-dark/80 to-inavo-dark/60" />
        {/* Additional gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-inavo-dark via-transparent to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transform Your Business with{' '}
              <span className="text-inavo-blue">Expert Consulting</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-10 leading-relaxed">
              We help organizations navigate digital transformation, optimize operations,
              and build custom solutions that drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/contact">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link to="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-inavo-blue/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-inavo-blue rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-inavo-dark/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions spanning technology and business consulting
              to help your organization thrive.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredServices.map((service) => (
              <Card key={service.slug} className="hover:border-inavo-blue/50 transition-all hover:-translate-y-1 duration-300">
                <CardHeader>
                  <service.icon className="h-12 w-12 text-inavo-blue mb-4" />
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-inavo-blue/20 to-inavo-terracotta/20 rounded-3xl p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Let's discuss how we can help you achieve your goals.
              Schedule a free consultation today.
            </p>
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
