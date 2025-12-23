import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/admin/DataTableColumnHeader'
import { DataTableRowActions } from '@/components/admin/DataTableRowActions'

export function getColumns({ onView, onDelete }) {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => (
        <a
          href={`mailto:${row.getValue('email')}`}
          className="text-inavo-blue hover:underline"
        >
          {row.getValue('email')}
        </a>
      ),
    },
    {
      accessorKey: 'category',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => {
        const category = row.getValue('category')
        const labels = {
          general: 'General Inquiry',
          project: 'Project Discussion',
          partnership: 'Partnership',
          support: 'Support',
          other: 'Other',
        }
        return (
          <span className="capitalize">{labels[category] || category || '-'}</span>
        )
      },
    },
    {
      accessorKey: 'contact_date',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Contact Date" />
      ),
      cell: ({ row }) => {
        const date = row.getValue('contact_date')
        return date ? (
          <div className="text-muted-foreground">
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        ) : (
          <span className="text-muted-foreground">-</span>
        )
      },
    },
    {
      accessorKey: 'terms_accepted',
      header: 'Terms',
      cell: ({ row }) => {
        const accepted = row.getValue('terms_accepted')
        return accepted ? (
          <span className="text-green-400">Yes</span>
        ) : (
          <span className="text-red-400">No</span>
        )
      },
    },
    {
      accessorKey: 'message',
      header: 'Message',
      cell: ({ row }) => {
        const message = row.getValue('message')
        const truncated =
          message.length > 50 ? message.slice(0, 50) + '...' : message
        return (
          <div className="max-w-[300px] truncate text-muted-foreground">
            {truncated}
          </div>
        )
      },
    },
    {
      accessorKey: 'created_at',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue('created_at'))
        return (
          <div className="text-muted-foreground">
            {date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DataTableRowActions row={row} onView={onView} onDelete={onDelete} />
      ),
    },
  ]
}
