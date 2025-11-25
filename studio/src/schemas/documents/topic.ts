import { defineType, defineField } from 'sanity'
import { FolderIcon } from '@sanity/icons'

export const topic = defineType({
  name: 'topic',
  title: 'Topic',
  type: 'document',
  icon: FolderIcon,
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
      validation: Rule => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      title: 'Parent category',
      name: 'parentCategory',
      type: 'reference',
      to: [{ type: 'category' }],
      options: {
        disableNew: true,
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the category',
      validation: Rule => Rule.max(200),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      description: 'Optional image representing this category',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Optional numeric order to control listing position',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      image: 'image',
      subtitle: 'parentCategory.name',
    },
    prepare({ title, image, subtitle }) {
      return {
        title,
        subtitle,
        media: image || FolderIcon,
      }
    },
  },
})
