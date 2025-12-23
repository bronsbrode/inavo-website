import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/FormField'
import { Label } from '@/components/Label'
import { getServiceById, createService, updateService } from '@/lib/database'

const iconOptions = [
  { value: 'rocket', label: 'Rocket' },
  { value: 'code', label: 'Code' },
  { value: 'compass', label: 'Compass' },
  { value: 'cog', label: 'Cog/Settings' },
  { value: 'chart', label: 'Chart' },
  { value: 'users', label: 'Users' },
]

const categoryOptions = [
  { value: 'technology', label: 'Technology' },
  { value: 'business', label: 'Business' },
]

export function ServiceForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: 'rocket',
    category: 'technology',
    featured: false,
    sort_order: 0,
  })
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isEditing) {
      const fetchService = async () => {
        try {
          const data = await getServiceById(id)
          setFormData({
            name: data.name || '',
            slug: data.slug || '',
            description: data.description || '',
            icon: data.icon || 'rocket',
            category: data.category || 'technology',
            featured: data.featured || false,
            sort_order: data.sort_order || 0,
          })
        } catch (err) {
          setError('Failed to load service')
        } finally {
          setLoading(false)
        }
      }
      fetchService()
    }
  }, [id, isEditing])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const handleNameChange = (e) => {
    const name = e.target.value
    setFormData({
      ...formData,
      name,
      slug: isEditing ? formData.slug : generateSlug(name),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSaving(true)

    try {
      if (isEditing) {
        await updateService(id, formData)
      } else {
        await createService(formData)
      }
      navigate('/admin/services')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
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
    <div className="p-8 max-w-2xl">
      <Link
        to="/admin/services"
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Services
      </Link>

      <h1 className="text-3xl font-bold mb-8">
        {isEditing ? 'Edit Service' : 'Add Service'}
      </h1>

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
          onChange={handleNameChange}
          required
          placeholder="e.g., Digital Transformation"
        />

        <FormField
          label="Slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          placeholder="e.g., digital-transformation"
        />

        <FormField
          label="Description"
          name="description"
          type="textarea"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe the service..."
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="icon">Icon</Label>
            <select
              id="icon"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-inavo-blue"
            >
              {iconOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-inavo-blue"
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Sort Order"
            name="sort_order"
            type="number"
            value={formData.sort_order}
            onChange={handleChange}
            placeholder="0"
          />

          <div className="flex items-center gap-3 pt-8">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 rounded border-border"
            />
            <Label htmlFor="featured" className="mb-0">Featured</Label>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {isEditing ? 'Saving...' : 'Creating...'}
              </>
            ) : (
              isEditing ? 'Save Changes' : 'Create Service'
            )}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/admin/services')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
