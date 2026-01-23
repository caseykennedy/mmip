import ResolvedLink from '@/app/components/shared/resolved-link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/app/components/ui/navigation-menu'
import { fetchNavigation } from '@/sanity/lib/fetch'

export default async function Navigation() {
  const data = await fetchNavigation()

  if (!data || !data.primaryNav || data.primaryNav.length === 0) {
    return null
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {data?.primaryNav?.map(({ dropdownLabel, link, type, dropdownItems }, i) => (
          <NavigationMenuItem key={i}>
            {type === 'dropdown' && dropdownItems ? (
              <>
                <NavigationMenuTrigger>{dropdownLabel}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[330px] gap-4">
                    {dropdownItems.map((link, idx) => (
                      <li key={idx}>
                        <NavigationMenuLink asChild>
                          <ResolvedLink link={link}>
                            <div className="font-medium">{link.label}</div>
                            {/* <div className="">Browse all components in the library.</div> */}
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
