import { cn } from '@/lib/utils'

export default function Tile({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'hover:border-strong bg-card rounded-lg border p-6 transition-colors',
        className,
      )}
    >
      {children}
    </div>
  )
}
