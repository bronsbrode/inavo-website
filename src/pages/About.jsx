import { Link } from 'react-router-dom'
import { Target, Lightbulb, Users, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const values = [
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'We focus on delivering measurable outcomes that drive real business value.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We embrace new technologies and approaches to solve complex challenges.',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'We work alongside our clients as trusted advisors and collaborators.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We maintain the highest standards in everything we deliver.',
  },
]

export function About() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Inavo</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're a team of consultants passionate about helping organizations
            transform and thrive in the digital age.
          </p>
        </div>

        {/* Story */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <div className="prose prose-invert text-muted-foreground space-y-4">
            <p>
              Founded with a vision to bridge the gap between technology and business strategy,
              Inavo brings together experts from diverse backgrounds to deliver comprehensive
              consulting services.
            </p>
            <p>
              We believe that successful transformation requires more than just technical
              expertise—it demands a deep understanding of business objectives, organizational
              culture, and the human elements that drive change.
            </p>
            <p>
              Our approach combines proven methodologies with innovative thinking to help
              clients navigate complex challenges and seize new opportunities.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title}>
                <CardHeader className="text-center">
                  <value.icon className="h-10 w-10 text-inavo-blue mx-auto mb-4" />
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-muted-foreground mb-6">
            Let's discuss how we can help your organization succeed.
          </p>
          <Button size="lg" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
