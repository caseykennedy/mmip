import { MenuIcon, LinkIcon } from '@sanity/icons'
import { defineType, defineField, defineArrayMember } from 'sanity'

export const navItem = defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Navigation Type',
      type: 'string',
      options: {
        list: [
          { title: 'Simple Link', value: 'link' },
          { title: 'Dropdown Menu', value: 'dropdown' },
        ],
        layout: 'radio',
      },
      initialValue: 'link',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      hidden: ({ parent }) => parent?.type === 'dropdown',
      validation: Rule =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          if (parent?.type === 'link' && !value) {
            return 'Link is required for simple navigation items'
          }
          return true
        }),
    }),
    defineField({
      name: 'dropdownLabel',
      title: 'Dropdown Label',
      type: 'string',
      description: 'The text that appears in the main navigation for this dropdown',
      hidden: ({ parent }) => parent?.type !== 'dropdown',
      validation: Rule =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          if (parent?.type === 'dropdown' && !value) {
            return 'Dropdown label is required for dropdown menus'
          }
          return true
        }),
    }),
    defineField({
      name: 'dropdownItems',
      title: 'Dropdown Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'link',
        }),
      ],
      hidden: ({ parent }) => parent?.type !== 'dropdown',
      validation: Rule =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          if (parent?.type === 'dropdown' && (!value || value.length === 0)) {
            return 'At least one dropdown item is required'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      type: 'type',
      linkLabel: 'link.label',
      dropdownLabel: 'dropdownLabel',
      dropdownCount: 'dropdownItems.length',
    },
    prepare({ type, linkLabel, dropdownLabel, dropdownCount }) {
      if (type === 'dropdown') {
        return {
          title: dropdownLabel || 'Dropdown Menu',
          subtitle: `Dropdown (${dropdownCount || 0} items)`,
          media: MenuIcon,
        }
      }

      return {
        title: linkLabel || 'Navigation Link',
        subtitle: 'Link',
        media: LinkIcon,
      }
    },
  },
})
