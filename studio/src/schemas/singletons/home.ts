import { defineArrayMember, defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const home = defineType({
  name: 'home',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Page Name',
      type: 'string',
    }),
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
          type: 'text',
          rows: 2,
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

    defineField({
      name: 'featuredPosts',
      title: 'Featured Resources',
      description:
        'Select up to three featured resources. Order determines layout: guide → tool → article.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
        },
      ],
      validation: Rule => Rule.max(3).required(),
    }),

    defineField({
      name: 'showFeaturedServices',
      title: 'Show featured services',
      type: 'boolean',
    }),

    defineField({
      name: 'featuredServices',
      title: 'Featured Services',
      description: 'Select six featured services.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }],
        },
      ],
      validation: Rule => Rule.min(6).max(6).required(),
      hidden: ({ parent }) => !parent?.showFeaturedServices,
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
