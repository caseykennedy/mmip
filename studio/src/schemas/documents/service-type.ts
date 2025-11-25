import { defineType, defineField } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const serviceType = defineType({
  name: 'serviceType',
  title: 'Service Type',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required().min(3).max(50),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the service type (max 200 characters)',
      validation: Rule => Rule.max(200),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      image: 'image',
      subtitle: 'description',
    },
    prepare({ title, image, subtitle }) {
      return {
        title,
        subtitle: subtitle?.length > 100 ? subtitle.slice(0, 100) + '…' : subtitle,
        media: image || TagIcon,
      }
    },
  },
})
