import { Download, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function MessagesToolbar({ table, onBulkDelete, onExport }) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length

  return (
    <div className="flex items-center gap-2">
      {selectedCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={onBulkDelete}
          className="text-red-400 hover:text-red-300 hover:border-red-400"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete ({selectedCount})
        </Button>
      )}
      <Button variant="outline" size="sm" onClick={onExport}>
        <Download className="h-4 w-4 mr-2" />
        Export CSV
      </Button>
    </div>
  )
}
