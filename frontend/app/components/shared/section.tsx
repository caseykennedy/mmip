import { cn } from '@/lib/utils'

export default function Section({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <section className={cn('py-8 sm:py-16 lg:py-20', className)}>{children}</section>
}
