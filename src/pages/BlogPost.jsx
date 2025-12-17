import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, User, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const API_URL = 'http://localhost:3001'

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function estimateReadTime(content) {
  if (!content) return '3 min read'
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}

export function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API_URL}/api/blog/${slug}`)
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Post not found')
          }
          throw new Error('Failed to fetch')
        }
        const data = await response.json()
        setPost(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-inavo-blue" />
        <span className="ml-2 text-muted-foreground">Loading post...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">{error}</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            to="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-inavo-blue mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(post.published_at || post.created_at)}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {estimateReadTime(post.content)}
              </span>
              {post.author && (
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {post.author}
                </span>
              )}
            </div>
          </header>

          {/* Content */}
          <article className="prose prose-invert prose-lg max-w-none">
            {post.content?.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-foreground/90 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </article>

          {/* CTA */}
          <div className="mt-16 bg-inavo-dark/50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help With Your Project?</h2>
            <p className="text-muted-foreground mb-6">
              Let's discuss how we can help you achieve your goals.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
