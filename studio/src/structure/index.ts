import { CogIcon, FolderIcon } from '@sanity/icons'
import type { StructureBuilder, StructureResolver } from 'sanity/structure'
import pluralize from 'pluralize-esm'

const DISABLED_TYPES = [
  'home',
  'settings',
  'assist.instruction.context',
  'post',
  'category',
  'topic',
  'tag',
  'service',
  'serviceCategory',
]

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      S.listItem()
        .title('Home')
        .child(S.document().schemaType('home').documentId('home'))
        .icon(CogIcon),

      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),

      S.divider(),

      // Resources group
      S.listItem()
        .title('Resources')
        .icon(FolderIcon)
        .child(
          S.list()
            .title('Resources')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.documentTypeListItem('category').title('Pillar Categories'),
              S.documentTypeListItem('topic').title('Topics'),
              S.documentTypeListItem('tag').title('Tags'),
            ]),
        ),

      // Services group
      S.listItem()
        .title('Services')
        .icon(FolderIcon)
        .child(
          S.list()
            .title('Services')
            .items([
              S.documentTypeListItem('service').title('Services'),
              S.documentTypeListItem('serviceCategory').title('Service Categories'),
            ]),
        ),

      S.divider(),

      // All other types, except disabled and those already in Resources
      ...S.documentTypeListItems()
        // Remove the "assist.instruction.context" and "settings" content  from the list of content types
        .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()))
        // Pluralize the title of each document type.  This is not required but just an option to consider.
        .map(listItem => {
          return listItem.title(pluralize(listItem.getTitle() as string))
        }),
    ])
