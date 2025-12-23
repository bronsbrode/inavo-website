import { useState, useEffect, useCallback, useMemo } from 'react'
import { Mail } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/admin/DataTable'
import { DataTableSkeleton } from '@/components/admin/DataTableSkeleton'
import { getColumns } from './messages/columns'
import { MessageDialog } from './messages/MessageDialog'
import { DeleteDialog } from './messages/DeleteDialog'
import { MessagesToolbar } from './messages/MessagesToolbar'
import {
  getContactSubmissions,
  deleteContactSubmission,
  bulkDeleteContactSubmissions,
} from '@/lib/database'
import { exportToCSV, formatContactsForExport } from '@/lib/export'

export function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState(null)
  const [bulkDeleteMode, setBulkDeleteMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchMessages = useCallback(async () => {
    try {
      const data = await getContactSubmissions()
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const handleView = useCallback((message) => {
    setSelectedMessage(message)
    setViewDialogOpen(true)
  }, [])

  const handleDeleteClick = useCallback((message) => {
    setMessageToDelete(message)
    setBulkDeleteMode(false)
    setDeleteDialogOpen(true)
  }, [])

  const handleBulkDeleteClick = useCallback((table) => {
    const selected = table.getFilteredSelectedRowModel().rows
    setSelectedIds(selected.map((row) => row.original.id))
    setBulkDeleteMode(true)
    setDeleteDialogOpen(true)
  }, [])

  const handleConfirmDelete = useCallback(async () => {
    setIsDeleting(true)
    try {
      if (bulkDeleteMode) {
        await bulkDeleteContactSubmissions(selectedIds)
        setMessages((prev) => prev.filter((m) => !selectedIds.includes(m.id)))
      } else if (messageToDelete) {
        await deleteContactSubmission(messageToDelete.id)
        setMessages((prev) => prev.filter((m) => m.id !== messageToDelete.id))
      }
      setDeleteDialogOpen(false)
    } catch (error) {
      console.error('Error deleting:', error)
      alert('Failed to delete: ' + error.message)
    } finally {
      setIsDeleting(false)
      setMessageToDelete(null)
      setSelectedIds([])
    }
  }, [bulkDeleteMode, selectedIds, messageToDelete])

  const handleExport = useCallback(() => {
    const formatted = formatContactsForExport(messages)
    const date = new Date().toISOString().split('T')[0]
    exportToCSV(formatted, `contact-submissions-${date}.csv`)
  }, [messages])

  const columns = useMemo(
    () => getColumns({ onView: handleView, onDelete: handleDeleteClick }),
    [handleView, handleDeleteClick]
  )

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>
        <DataTableSkeleton columns={7} rows={5} />
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>
        <Card className="p-8 text-center">
          <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No messages yet.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Contact form submissions will appear here.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Messages</h1>

      <DataTable
        columns={columns}
        data={messages}
        searchPlaceholder="Search messages..."
        toolbar={(table) => (
          <MessagesToolbar
            table={table}
            onBulkDelete={() => handleBulkDeleteClick(table)}
            onExport={handleExport}
          />
        )}
      />

      <MessageDialog
        message={selectedMessage}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        count={bulkDeleteMode ? selectedIds.length : 1}
        itemName={messageToDelete?.name}
      />
    </div>
  )
}
