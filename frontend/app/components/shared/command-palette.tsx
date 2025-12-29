'use client'

import { useState } from 'react'
import { LuBookOpen, LuFileText, LuSearch, LuWrench } from 'react-icons/lu'

import { useRouter } from 'next/navigation'

import { Badge } from '@/app/components/ui/badge'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/app/components/ui/command'
import { useCommandPalette } from '@/lib/hooks/use-command-palette'
import { useSearch } from '@/lib/hooks/use-search'

const ICON_MAP = {
  article: LuFileText,
  guide: LuBookOpen,
  tool: LuWrench,
}

export default function CommandPalette() {
  const [query, setQuery] = useState('')
  const { isOpen, setIsOpen } = useCommandPalette()
  const { results, isLoading } = useSearch(query)
  const router = useRouter()

  const handleSelect = (url: string) => {
    setIsOpen(false)
    setQuery('')
    router.push(url)
  }

  const handleSearchPage = () => {
    setIsOpen(false)
    router.push(`/search?q=${encodeURIComponent(query)}`)
    setQuery('')
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput
        placeholder="Search articles, guides, tools..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        {isLoading && (
          <div className="p-4 text-center text-sm text-muted-foreground">Searching...</div>
        )}

        {!isLoading && query && results.length === 0 && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}

        {results.length > 0 && (
          <>
            <CommandGroup heading="Results">
              {results.map(result => {
                const Icon = result.postType
                  ? ICON_MAP[result.postType as keyof typeof ICON_MAP]
                  : LuFileText

                return (
                  <CommandItem
                    key={result.objectID}
                    value={result.title}
                    onSelect={() => handleSelect(result.url)}
                    className="flex items-start gap-3 p-3"
                  >
                    <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="truncate font-medium">{result.title}</span>
                        {result.postType && (
                          <Badge variant={result.postType as any} className="text-xs">
                            {result.postType}
                          </Badge>
                        )}
                      </div>
                      {result.category.name && (
                        <div className="text-xs text-muted-foreground">
                          in {result.category.name}
                        </div>
                      )}
                    </div>
                  </CommandItem>
                )
              })}
            </CommandGroup>

            {query && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={handleSearchPage} className="flex items-center gap-3">
                    <LuSearch className="size-4" />
                    <span>Search for {query} on search page</span>
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </>
        )}
      </CommandList>
    </CommandDialog>
  )
}
