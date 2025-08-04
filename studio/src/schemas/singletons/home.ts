import { defineArrayMember, defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const home = defineType({
  name: 'home',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Hero Heading',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'subheading',
          title: 'Hero Subheading',
          type: 'string',
        }),
        defineField({
          name: 'image',
          title: 'Hero Image',
          type: 'imageWithAlt', // swap to 'image' if you don't want alt text
          options: {
            hotspot: true,
          },
        }),
      ],
    }),

    // Uncomment and define if re-enabling featuredSections
    // defineField({
    //   name: 'featuredSections',
    //   title: 'Featured Sections',
    //   type: 'array',
    //   of: [
    //     defineArrayMember({ type: 'reference', to: [{ type: 'resource' }] }),
    //     defineArrayMember({ type: 'reference', to: [{ type: 'post' }] }),
    //     defineArrayMember({ type: 'callToAction' }),
    //   ],
    // }),

    defineField({
      name: 'sections',
      title: 'Homepage Sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Featured Resources',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'category',
              title: 'Section Category',
              type: 'reference',
              to: [{ type: 'category' }],
            }),
            defineField({
              name: 'items',
              title: 'Manual Selection',
              type: 'array',
              of: [defineArrayMember({ type: 'reference', to: [{ type: 'post' }] })],
            }),
            defineField({
              name: 'fallbackToLatest',
              title: 'Fallback to latest resources if empty?',
              type: 'boolean',
            }),
            defineField({
              name: 'limit',
              title: 'Max Items',
              type: 'number',
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      of: [defineArrayMember({ type: 'callToAction' }), defineArrayMember({ type: 'infoSection' })],
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: schemaTypeName =>
                `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
            },
          ],
        },
      },
    }),

    defineField({
      name: 'seo',
      title: 'SEO & Metadata',
      type: 'metadata',
    }),
  ],

  preview: {
    select: {
      title: 'hero.heading',
      media: 'hero.image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Homepage',
        subtitle: 'Singleton – Site Home',
        media,
      }
    },
  },
})
