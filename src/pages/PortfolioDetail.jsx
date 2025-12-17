import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const API_URL = 'http://localhost:3001'

export function PortfolioDetail() {
  const { slug } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API_URL}/api/portfolio/${slug}`)
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Case study not found')
          }
          throw new Error('Failed to fetch')
        }
        const data = await response.json()
        setItem(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-inavo-blue" />
        <span className="ml-2 text-muted-foreground">Loading case study...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
          <p className="text-muted-foreground mb-8">{error}</p>
          <Button asChild>
            <Link to="/portfolio">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            to="/portfolio"
            className="inline-flex items-center text-muted-foreground hover:text-inavo-blue mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
          </Link>

          {/* Header */}
          <header className="mb-12">
            <span className="text-sm text-inavo-blue font-medium mb-4 block">
              {item.service_name || 'Case Study'}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{item.title}</h1>
            <p className="text-xl text-muted-foreground">
              Client: {item.client_name}
            </p>
          </header>

          {/* Overview */}
          <section className="mb-12">
            <p className="text-lg text-foreground/90 leading-relaxed">
              {item.description}
            </p>
          </section>

          {/* Challenge, Solution, Results */}
          <div className="grid md:grid-cols-1 gap-8 mb-12">
            {item.challenge && (
              <Card className="bg-inavo-dark/50">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4 text-inavo-terracotta">The Challenge</h2>
                  <p className="text-foreground/90">{item.challenge}</p>
                </CardContent>
              </Card>
            )}

            {item.solution && (
              <Card className="bg-inavo-dark/50">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4 text-inavo-blue">Our Solution</h2>
                  <p className="text-foreground/90">{item.solution}</p>
                </CardContent>
              </Card>
            )}

            {item.results && (
              <Card className="bg-gradient-to-r from-inavo-blue/20 to-inavo-terracotta/20 border-inavo-blue/30">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-inavo-blue" />
                    Results Achieved
                  </h2>
                  <p className="text-lg font-medium text-foreground">{item.results}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* CTA */}
          <div className="bg-inavo-dark/50 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Want Similar Results?</h2>
            <p className="text-muted-foreground mb-6">
              Let's discuss how we can help your organization achieve similar success.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">
                Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
