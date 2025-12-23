import { useState } from 'react'
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { FormField } from '@/components/FormField'
import { validateContactForm } from '@/lib/validation'

const API_URL = 'http://localhost:3001'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setFieldErrors({})

    const { isValid, errors } = validateContactForm(formData)
    if (!isValid) {
      setFieldErrors(errors)
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: null })
    }
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to start your transformation journey? Get in touch and let's discuss
            how we can help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            {submitted ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-inavo-blue text-5xl mb-4">✓</div>
                  <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">
                    We've received your message and will get back to you soon.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-md p-4 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <FormField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={fieldErrors.name}
                  required
                  disabled={submitting}
                  placeholder="Your name"
                />

                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={fieldErrors.email}
                  required
                  disabled={submitting}
                  placeholder="you@company.com"
                />

                <FormField
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={fieldErrors.phone}
                  disabled={submitting}
                  placeholder="(123) 456-7890"
                />

                <FormField
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="Your company"
                />

                <FormField
                  label="Message"
                  name="message"
                  type="textarea"
                  value={formData.message}
                  onChange={handleChange}
                  error={fieldErrors.message}
                  required
                  disabled={submitting}
                  placeholder="Tell us about your project or challenge..."
                  rows={5}
                />

                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Mail className="h-8 w-8 text-inavo-blue mb-2" />
                <CardTitle>Email</CardTitle>
                <CardDescription>
                  <a href="mailto:hello@inavo.com" className="text-inavo-blue hover:underline">
                    hello@inavo.com
                  </a>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Phone className="h-8 w-8 text-inavo-blue mb-2" />
                <CardTitle>Phone</CardTitle>
                <CardDescription>
                  <a href="tel:+1234567890" className="text-inavo-blue hover:underline">
                    +1 (234) 567-890
                  </a>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <MapPin className="h-8 w-8 text-inavo-blue mb-2" />
                <CardTitle>Location</CardTitle>
                <CardDescription>
                  Remote-first company<br />
                  Serving clients worldwide
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
