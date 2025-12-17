import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const API_URL = 'http://localhost:3001'

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-inavo-blue" />
      <span className="ml-2 text-muted-foreground">Loading portfolio...</span>
    </div>
  )
}

function ErrorState({ error, onRetry }) {
  return (
    <div className="text-center py-20">
      <p className="text-red-400 mb-4">Failed to load portfolio: {error}</p>
      <Button variant="outline" onClick={onRetry}>Try Again</Button>
    </div>
  )
}

export function Portfolio() {
  const [portfolio, setPortfolio] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPortfolio = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/api/portfolio`)
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setPortfolio(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPortfolio()
  }, [])

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Work</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore how we've helped organizations transform and achieve their goals.
          </p>
        </div>

        {loading && <LoadingState />}
        {error && <ErrorState error={error} onRetry={fetchPortfolio} />}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {portfolio.map((item) => (
              <Link key={item.id} to={`/portfolio/${item.slug}`}>
                <Card className="h-full hover:border-inavo-blue/50 transition-colors cursor-pointer">
                  <CardHeader>
                    <span className="text-xs text-inavo-blue font-medium mb-2">
                      {item.service_name || 'Case Study'}
                    </span>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="text-sm">
                      Client: {item.client_name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      {item.description}
                    </p>
                    {item.results && (
                      <div className="bg-inavo-blue/10 rounded p-3">
                        <p className="text-sm font-medium text-inavo-blue">
                          Results: {item.results}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center bg-inavo-dark/50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-4">Want Results Like These?</h2>
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
  )
}
