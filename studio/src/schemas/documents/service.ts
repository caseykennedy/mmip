import { DocumentTextIcon, ComposeIcon, SearchIcon } from '@sanity/icons'
import { de } from 'date-fns/locale'
import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Content', icon: ComposeIcon },
    { name: 'seo', title: 'SEO', icon: SearchIcon },
  ],
  fields: [
    defineField({
      group: 'content',
      name: 'name',
      title: 'Name',
      type: 'string',
      options: { search: { weight: 10 } },
      validation: Rule => Rule.required(),
    }),
    defineField({
      group: 'seo',
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
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
      name: 'serviceType',
      title: 'Service Type',
      type: 'reference',
      to: [{ type: 'serviceType' }],
      options: { disableNew: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      group: 'content',
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      options: { layout: 'tags' },
      description: 'Tag relevant topics for this service',
      validation: Rule => Rule.max(4).required(),
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
      name: 'shortDescription',
      title: 'Short Description',
      type: 'blockContentBasic',
      validation: Rule => Rule.max(140).required(),
      options: { search: { weight: 5 } },
    }),
    defineField({
      group: 'content',
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      validation: Rule => Rule.required(),
      options: { search: { weight: 5 } },
    }),
    defineField({
      group: 'content',
      name: 'notes',
      title: 'Notes',
      type: 'blockContent',
    }),
    defineField({
      group: 'content',
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({ name: 'address', title: 'Address', type: 'string' }),
        defineField({ name: 'city', title: 'City', type: 'string' }),
        defineField({ name: 'state', title: 'State', type: 'string' }),
        defineField({ name: 'zip', title: 'ZIP Code', type: 'string' }),
        defineField({ name: 'phone', title: 'Phone', type: 'string' }),
        defineField({ name: 'email', title: 'Email', type: 'string' }),
        defineField({ name: 'website', title: 'Website', type: 'url' }),
      ],
    }),
    defineField({
      group: 'content',
      name: 'hours',
      title: 'Operating Hours',
      type: 'object',
      fields: [
        defineField({
          name: 'days',
          title: 'Days',
          type: 'string',
          description: 'Monday – Friday',
        }),
        defineField({
          name: 'open',
          title: 'Open Time',
          type: 'string',
          description: '9:00 AM',
        }),
        defineField({
          name: 'close',
          title: 'Close Time',
          type: 'string',
          description: '5:00 PM',
        }),
      ],
    }),
    defineField({
      group: 'seo',
      name: 'metadata',
      title: 'Metadata',
      type: 'metadata',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      serviceType: 'serviceType.name',
      region: 'region',
      media: 'coverImage',
    },
    prepare({ title, serviceType, region, media }) {
      const subtitles = [
        serviceType && serviceType.charAt(0).toUpperCase() + serviceType.slice(1),
        region && region.charAt(0).toUpperCase() + region.slice(1),
      ].filter(Boolean)

      return {
        title,
        subtitle: subtitles.join(' – '),
        media,
      }
    },
  },
})
