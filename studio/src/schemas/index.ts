import { blockContent } from './objects/block-content'
import { callToAction } from './objects/call-to-action'
import { category } from './documents/category'
import { home } from './singletons/home'
import { imageWithAlt } from './objects/image-with-alt'
import { infoSection } from './objects/info-section'
import { link } from './objects/link'
import { metadata } from './objects/metadata'
import { page } from './documents/page'
import { person } from './documents/person'
import { post } from './documents/post'
import { service } from './documents/service'
import { serviceCategory } from './documents/service-category'
import { settings } from './singletons/settings'
import { tag } from './documents/tag'
import { topic } from './documents/topic'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  home,
  settings,
  // Documents
  category,
  page,
  person,
  post,
  serviceCategory,
  service,
  tag,
  topic,
  // Objects
  blockContent,
  callToAction,
  imageWithAlt,
  infoSection,
  link,
  metadata,
]
