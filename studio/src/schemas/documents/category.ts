import {defineType, defineField} from 'sanity'
import {FolderIcon} from '@sanity/icons'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(50),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the category (max 200 characters)',
      validation: (Rule) => Rule.max(200),
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
      description: 'Controls manual ordering of categories in lists',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      image: 'image',
      subtitle: 'description',
    },
    prepare({title, image, subtitle}) {
      return {
        title,
        subtitle: subtitle?.length > 100 ? subtitle.slice(0, 100) + '…' : subtitle,
        media: image || FolderIcon,
      }
    },
  },
})
