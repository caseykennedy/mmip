import { LuLoaderCircle } from 'react-icons/lu'

import { cn } from '@/lib/utils'

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <LuLoaderCircle
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin text-foreground-muted', className)}
      {...props}
    />
  )
}

export { Spinner }
