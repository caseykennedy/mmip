import { PiMagnifyingGlassBold } from 'react-icons/pi'

import Link from 'next/link'

import { Button } from '@/app/components/ui/button'
import { SITE_NAME } from '@/lib/constants'

import Navigation from './navigation'

export default function Header() {
  return (
    <header className="fixed inset-0 z-50 flex h-20 items-center border-b bg-background">
      <div className="container">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex flex-1 items-center gap-2" href="/">
            <span className="text-lg">{SITE_NAME}</span>
          </Link>

          <Navigation />

          <div className="flex flex-1 justify-end">
            <Button asChild variant="outline" size="icon">
              <Link href="/get-started">
                <PiMagnifyingGlassBold className="size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
