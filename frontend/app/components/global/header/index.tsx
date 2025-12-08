import { PiMagnifyingGlassBold } from 'react-icons/pi'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/app/components/ui/button'
import LogoMark from '@/public/logo-mark.svg'

import Navigation from './navigation'

export default function Header() {
  return (
    <header className="fixed inset-0 z-50 flex h-20 items-center bg-background">
      <div className="container">
        <div className="flex items-center justify-between gap-5">
          <Link
            className="flex flex-1 items-center gap-3"
            href="/"
            aria-label="Resilient Relatives Home"
          >
            <Image src={LogoMark} alt="Resilient Relatives logo" className="size-12" />
            <span className="text-lg font-medium leading-none">
              Resilient
              <br />
              Relatives
            </span>
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
