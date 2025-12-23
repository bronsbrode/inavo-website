import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Mail, Building, Calendar } from 'lucide-react'

export function MessageDialog({ message, open, onOpenChange }) {
  if (!message) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{message.name}</DialogTitle>
          <DialogDescription className="flex items-center gap-4 pt-2">
            <span className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <a
                href={`mailto:${message.email}`}
                className="text-inavo-blue hover:underline"
              >
                {message.email}
              </a>
            </span>
            {message.company && (
              <span className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                {message.company}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <Calendar className="h-4 w-4" />
            {new Date(message.created_at).toLocaleString()}
          </div>
          <div className="bg-inavo-dark/50 rounded-lg p-4 border border-border max-h-[300px] overflow-y-auto">
            <p className="whitespace-pre-wrap">{message.message}</p>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            onClick={() => window.open(`mailto:${message.email}`)}
          >
            <Mail className="h-4 w-4 mr-2" />
            Reply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
