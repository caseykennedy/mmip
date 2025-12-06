import ResolvedLink from '@/app/components/resolved-link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/app/components/ui/navigation-menu'
import { sanityFetch } from '@/sanity/lib/live'
import { navigationQuery } from '@/sanity/lib/queries'

export default async function Navigation() {
  const { data } = await sanityFetch({
    query: navigationQuery,
  })
  console.log('navigation data', data)
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {data?.mainNav?.map(({ menuLabel, link, hasDropdown, dropdownMenu }, i) => (
          <NavigationMenuItem key={i}>
            {hasDropdown && dropdownMenu ? (
              <>
                <NavigationMenuTrigger>{menuLabel}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-4">
                    {dropdownMenu.map((link, idx) => (
                      <li key={idx}>
                        <NavigationMenuLink asChild>
                          <ResolvedLink link={link}>
                            <div className="font-medium">{link.label}</div>
                            <div className="">Browse all components in the library.</div>
                          </ResolvedLink>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              link && (
                <NavigationMenuLink asChild>
                  <ResolvedLink link={link}>{link?.label}</ResolvedLink>
                </NavigationMenuLink>
              )
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
