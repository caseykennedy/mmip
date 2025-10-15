import { DocumentTextIcon, ComposeIcon, SearchIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  icon: DocumentTextIcon,
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', icon: ComposeIcon },
    { name: 'seo', title: 'SEO', icon: SearchIcon },
  ],
  fields: [
    // ─────────────────────────────
    // Post settings
    // ─────────────────────────────
    defineField({
      name: 'postType',
      title: 'Post type',
      type: 'string',
      options: {
        list: [
          { title: 'Article', value: 'article' },
          { title: 'Guide', value: 'guide' },
          { title: 'Tool', value: 'tool' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: Rule => Rule.required(),
    }),
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
    defineField({
      group: 'content',
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    // ─────────────────────────────
    // Taxonomy
    // ─────────────────────────────
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
      hidden: ({ parent }) => parent?.postType !== 'tool',
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
      name: 'topic',
      title: 'Topic',
      type: 'reference',
      to: [{ type: 'topic' }],
      options: {
        filter: ({ document }: any) => {
          const categoryRef = document.category?._ref
          if (!categoryRef) {
            return {
              filter: '_id == $empty',
              params: { empty: '' },
            }
          }
          return {
            filter: 'parentCategory._ref == $categoryRef',
            params: { categoryRef },
          }
        },
      },
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

    // ─────────────────────────────
    // Body content
    // ─────────────────────────────
    defineField({
      group: 'content',
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
      options: { layout: 'grid' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      group: 'content',
      title: 'Excerpt',
      name: 'excerpt',
      type: 'text',
    }),
    defineField({
      group: 'content',
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      group: 'content',
      title: 'Notes',
      description: 'Notes, references or credits.',
      name: 'notes',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    // ─────────────────────────────
    // Tool-specific Fields
    // ─────────────────────────────
    defineField({
      group: 'content',
      name: 'asset',
      title: 'Downloadable Asset',
      type: 'file',
      hidden: ({ parent }) => parent?.postType !== 'tool',
    }),

    // ─────────────────────────────
    // SEO
    // ─────────────────────────────
    defineField({
      group: 'seo',
      name: 'metadata',
      title: 'Metadata',
      type: 'metadata',
    }),
  ],

  // ─────────────────────────────
  // Preview
  // ─────────────────────────────
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
