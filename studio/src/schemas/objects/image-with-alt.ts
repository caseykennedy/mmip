import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  icon: ImageIcon,
  options: {
    hotspot: true, // Enables cropping and responsive support
  },
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessibility. Describes what’s in the image.',
      validation: Rule => Rule.max(72).required().error('Alt text is required'),
    }),
  ],
  preview: {
    select: {
      image: '', // selects the whole image
      title: 'alt',
    },
    prepare({ image, title }) {
      return {
        title,
        media: image || ImageIcon,
      }
    },
  },
})
