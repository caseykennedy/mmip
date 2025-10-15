import Link from 'next/link'

import { SITE_NAME } from '@/lib/constants'

export default function Header() {
  return (
    <header className="fixed inset-0 z-50 flex h-24 items-center bg-white/80 backdrop-blur-lg">
      <div className="container">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2" href="/">
            <span className="text-lg">{SITE_NAME}</span>
          </Link>

          <nav className="">
            <ul
              role="list"
              className="flex items-center gap-4 text-sm font-normal leading-5 tracking-tight md:gap-6 md:text-base"
            >
              <li>
                <Link href="/about" className="">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
