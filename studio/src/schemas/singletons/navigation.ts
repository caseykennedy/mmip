import { MenuIcon, LinkIcon } from '@sanity/icons'
import { defineType, defineField, defineArrayMember } from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Site Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'item',
          type: 'object',
          icon: LinkIcon,
          fields: [
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
              hidden: ({ parent }) => parent?.hasDropdown,
            }),
            defineField({
              name: 'hasDropdown',
              title: 'Has dropdown',
              type: 'boolean',
            }),
            defineField({
              name: 'menuLabel',
              title: 'Dropdown Menu Label',
              type: 'string',
              hidden: ({ parent }) => !(parent as any)?.hasDropdown,
              validation: Rule =>
                Rule.custom((value, context) => {
                  const parent = context.parent as any
                  if (parent?.hasDropdown && !value) {
                    return 'Menu Group Label is required when hasDropdown is true'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'dropdownMenu',
              title: 'Dropdown Menu',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'link',
                  type: 'link',
                }),
              ],
              hidden: ({ parent }) => !parent?.hasDropdown,
            }),
          ],
          preview: {
            select: {
              link: 'link',
              hasDropdown: 'hasDropdown',
              menuLabel: 'menuLabel',
            },
            prepare(selection) {
              const { link, hasDropdown, menuLabel } = selection
              return {
                title: hasDropdown ? `${menuLabel}` : `${link?.label || 'No label'}`,
                media: hasDropdown ? MenuIcon : undefined,
              }
            },
          },
        }),
      ],
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
      mainNav: 'mainNav',
      footerNav: 'footerNav',
    },
    prepare(selection) {
      const { mainNav, footerNav } = selection
      return {
        title: 'Navigation',
        subtitle: `${mainNav?.length || 0} main nav items, ${footerNav?.length || 0} footer nav items`,
      }
    },
  },
})
