import { useState } from 'react'
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { FormField } from '@/components/FormField'
import { Label } from '@/components/Label'
import { validateContactForm, CONTACT_CATEGORIES } from '@/lib/validation'
import { submitContactForm } from '@/lib/database'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    category: '',
    message: '',
    terms: false,
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
      await submitContactForm(formData)
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        category: '',
        message: '',
        terms: false,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: null })
    }
  }

  const handleTermsChange = (checked) => {
    setFormData({ ...formData, terms: checked })
    if (fieldErrors.terms) {
      setFieldErrors({ ...fieldErrors, terms: null })
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
                  label="Date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  error={fieldErrors.date}
                  required
                  disabled={submitting}
                />

                <div>
                  <Label htmlFor="category" required>
                    Category
                  </Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    disabled={submitting}
                    className={`w-full px-4 py-2 bg-input border rounded-md focus:outline-none focus:ring-2 focus:ring-inavo-blue disabled:opacity-50 disabled:cursor-not-allowed ${
                      fieldErrors.category ? 'border-red-500' : 'border-border'
                    }`}
                  >
                    <option value="">Select a category</option>
                    {CONTACT_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.category && (
                    <p className="text-red-400 text-sm mt-1">{fieldErrors.category}</p>
                  )}
                </div>

                <div>
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
                  <p className="text-sm text-muted-foreground mt-1 text-right">
                    {formData.message.length} / 1000 characters
                  </p>
                </div>

                <div>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={formData.terms}
                      onCheckedChange={handleTermsChange}
                      disabled={submitting}
                      className={fieldErrors.terms ? 'border-red-500' : ''}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the terms and conditions
                        <span className="text-red-400 ml-1">*</span>
                      </label>
                      <p className="text-sm text-muted-foreground">
                        By submitting this form, you agree to our{' '}
                        <a href="/privacy" className="text-inavo-blue hover:underline">
                          Privacy Policy
                        </a>{' '}
                        and{' '}
                        <a href="/terms" className="text-inavo-blue hover:underline">
                          Terms of Service
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                  {fieldErrors.terms && (
                    <p className="text-red-400 text-sm mt-1">{fieldErrors.terms}</p>
                  )}
                </div>

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
