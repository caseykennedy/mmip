// schema/fields/region.ts
import { defineField } from 'sanity'
import { EarthGlobeIcon } from '@sanity/icons'
import { REGIONS } from '../../lib/constants'

export const region = defineField({
  name: 'region',
  title: 'Region',
  type: 'string',
  icon: EarthGlobeIcon,
  options: {
    list: REGIONS.map(r => ({
      ...r,
      description:
        r.value === 'north'
          ? 'Northern California tribal communities'
          : r.value === 'central'
            ? 'Central California tribal communities'
            : 'Southern California tribal communities',
    })),
    layout: 'radio',
    direction: 'vertical',
  },
  initialValue: 'south',
  validation: Rule => Rule.required(),
})
