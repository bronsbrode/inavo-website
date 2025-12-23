/**
 * Export data to CSV and trigger download
 */
export function exportToCSV(data, filename = 'export.csv') {
  if (!data || data.length === 0) {
    console.warn('No data to export')
    return
  }

  // Get headers from first object
  const headers = Object.keys(data[0])

  // Convert data to CSV rows
  const csvRows = [
    headers.join(','), // Header row
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header]
          // Escape quotes and wrap in quotes if contains comma, quote, or newline
          if (value === null || value === undefined) return ''
          const stringValue = String(value)
          if (
            stringValue.includes(',') ||
            stringValue.includes('"') ||
            stringValue.includes('\n')
          ) {
            return `"${stringValue.replace(/"/g, '""')}"`
          }
          return stringValue
        })
        .join(',')
    ),
  ]

  // Create blob and download
  const csvString = csvRows.join('\n')
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Format contact submissions for export
 */
export function formatContactsForExport(contacts) {
  const categoryLabels = {
    general: 'General Inquiry',
    project: 'Project Discussion',
    partnership: 'Partnership',
    support: 'Support',
    other: 'Other',
  }

  return contacts.map((contact) => ({
    Name: contact.name,
    Email: contact.email,
    Phone: contact.phone || '',
    Category: categoryLabels[contact.category] || contact.category || '',
    'Contact Date': contact.contact_date
      ? new Date(contact.contact_date).toLocaleDateString()
      : '',
    Message: contact.message,
    'Terms Accepted': contact.terms_accepted ? 'Yes' : 'No',
    'Submitted At': new Date(contact.created_at).toLocaleString(),
  }))
}
