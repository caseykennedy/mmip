import { MenuIcon } from '@sanity/icons'
import { defineType, defineField, defineArrayMember } from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Site Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'primaryNav',
      title: 'Primary Navigation',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'navItem',
        }),
      ],
      validation: Rule =>
        Rule.max(8).warning('Consider keeping primary navigation items under 8 for better UX'),
    }),
    defineField({
      name: 'footerNav',
      title: 'Footer Navigation',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'link',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      primaryNav: 'primaryNav',
      footerNav: 'footerNav',
    },
    prepare({ primaryNav, footerNav }) {
      return {
        title: 'Site Navigation',
        subtitle: `${primaryNav?.length || 0} primary items, ${footerNav?.length || 0} footer items`,
      }
    },
  },
})
