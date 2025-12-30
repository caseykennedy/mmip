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
        'rounded-xl border bg-card p-6 transition-colors hover:border-strong',
        className,
      )}
    >
      {children}
    </div>
  )
}
