import { PiMagnifyingGlassBold } from 'react-icons/pi'

import Link from 'next/link'

import { SITE_NAME } from '@/lib/constants'
import { sanityFetch } from '@/sanity/lib/live'
import { navigationQuery } from '@/sanity/lib/queries'

import ResolvedLink from '../resolved-link'
import { Button } from '../ui/button'

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

async function Navigation() {
  const { data } = await sanityFetch({
    query: navigationQuery,
  })
  console.log('navigation data', data)
  return (
    <nav className="">
      <ul role="list" className="flex items-center gap-10 text-sm font-normal md:text-base">
        {data?.mainNav?.map(({ menuLabel, link, hasDropdown, dropdownMenu }, i) => (
          <li key={i}>
            {hasDropdown && dropdownMenu ? (
              <div className="group relative">
                <span className="cursor-pointer">{menuLabel}</span>
                <ul className="absolute left-0 top-full mt-2 hidden w-48 flex-col rounded-md border bg-white p-4 shadow-lg group-hover:flex">
                  {dropdownMenu.map((item, idx) => (
                    <li key={idx} className="py-1">
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              link && (
                <ResolvedLink link={link} className="hover:underline">
                  {link?.label}
                </ResolvedLink>
              )
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
