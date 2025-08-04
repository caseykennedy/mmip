import { DocumentTextIcon, ComposeIcon, SearchIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  icon: DocumentTextIcon,
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', icon: ComposeIcon },
    { name: 'service', title: 'Service', icon: ComposeIcon },
    { name: 'seo', title: 'SEO', icon: SearchIcon },
  ],
  fields: [
    // Content group fields
    defineField({
      group: 'content',
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      options: { search: { weight: 10 } },
    }),
    defineField({
      group: 'seo',
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      group: 'content',
      name: 'coverImage',
      title: 'Cover Image',
      type: 'imageWithAlt',
      validation: Rule => Rule.required(),
    }),
    // Region selector
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: 'Northern CA', value: 'north' },
          { title: 'Central CA', value: 'central' },
          { title: 'Southern CA', value: 'south' },
        ],
        layout: 'radio',
        direction: 'vertical',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      group: 'content',
      title: 'Pillar Category',
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }],
      options: { disableNew: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      group: 'content',
      title: 'Service Category',
      name: 'serviceCategory',
      type: 'reference',
      to: [{ type: 'serviceCategory' }],
      options: { disableNew: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      group: 'content',
      title: 'Tags',
      description: 'Tag the topics in the post.',
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }], options: { disableNew: true } }],
      options: { layout: 'tags' },
      validation: Rule => Rule.max(4).required(),
    }),
    defineField({
      group: 'content',
      title: 'Excerpt',
      name: 'excerpt',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.max(140).required(),
      options: { search: { weight: 5 } },
    }),
    defineField({
      group: 'content',
      title: 'Notes',
      description: 'Notes, references or credits.',
      name: 'notes',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    // Article/Tool shared content
    defineField({
      group: 'content',
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      hidden: ({ parent }) => parent?.postType === 'service',
    }),
    defineField({
      group: 'content',
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
      options: { layout: 'grid' },
      validation: Rule => Rule.required(),
      hidden: ({ parent }) => parent?.postType === 'service',
    }),

    // Tool-only field
    defineField({
      group: 'content',
      name: 'asset',
      title: 'Downloadable Asset',
      type: 'file',
      hidden: ({ parent }) => parent?.postType !== 'tool',
    }),

    // Service-specific group and fields
    defineField({
      group: 'service',
      name: 'location',
      title: 'Service Location',
      type: 'string',
      hidden: ({ parent }) => parent?.postType !== 'service',
    }),
    defineField({
      group: 'service',
      name: 'serviceType',
      title: 'Service Type',
      type: 'string',
      options: { list: ['Health', 'Legal', 'Emergency', 'Other'] },
      hidden: ({ parent }) => parent?.postType !== 'service',
    }),
    defineField({
      group: 'service',
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'website', title: 'Website', type: 'url' },
      ],
      hidden: ({ parent }) => parent?.postType !== 'service',
    }),

    // SEO group
    defineField({
      group: 'seo',
      name: 'metadata',
      title: 'Metadata',
      type: 'metadata',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      postType: 'postType',
      authors: 'authors',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, media, authors, date, postType }) {
      const authorName = authors?.length
        ? `${authors[0]?.firstName ?? ''} ${authors[0]?.lastName ?? ''}`.trim()
        : null

      const subtitles = [
        postType && postType.charAt(0).toUpperCase() + postType.slice(1),
        authorName && `by ${authorName}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return { title, media, subtitle: subtitles.join(' – ') }
    },
  },
})
