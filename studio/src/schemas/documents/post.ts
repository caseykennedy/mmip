import { DocumentTextIcon, ComposeIcon, SearchIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import { region } from '../fields/region'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Content', icon: ComposeIcon },
    { name: 'seo', title: 'SEO', icon: SearchIcon },
  ],
  fields: [
    defineField({
      name: 'postType',
      title: 'Post Type',
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
      options: { search: { weight: 10 } },
      validation: Rule => Rule.required(),
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
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    region,

    // Taxonomy
    defineField({
      group: 'content',
      name: 'category',
      title: 'Pillar Category',
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
          if (!categoryRef) return { filter: '_id == $empty', params: { empty: '' } }
          return { filter: 'parentCategory._ref == $categoryRef', params: { categoryRef } }
        },
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      group: 'content',
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }], options: { disableNew: false } }],
      options: { layout: 'tags' },
      validation: Rule => Rule.max(3).required(),
    }),

    // Authors
    defineField({
      group: 'content',
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
      options: { layout: 'grid' },
      validation: Rule => Rule.required(),
    }),

    // Tool Asset
    defineField({
      group: 'content',
      name: 'toolFile',
      title: 'Downloadable asset',
      type: 'file',
      hidden: ({ parent }) => parent?.postType !== 'tool',
    }),

    // Content
    defineField({
      group: 'content',
      name: 'excerpt',
      title: 'Excerpt',
      type: 'blockContentBasic',
      validation: Rule => Rule.required(),
    }),
    defineField({
      group: 'content',
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: Rule => Rule.required(),
    }),
    defineField({
      group: 'content',
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    defineField({
      group: 'content',
      name: 'coverImage',
      title: 'Cover Image',
      type: 'imageWithAlt',
      // validation: Rule => Rule.required(),
    }),

    // SEO
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
