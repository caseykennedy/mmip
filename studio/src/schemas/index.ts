import { blockContent } from './objects/block-content'
import { callToAction } from './objects/call-to-action'
import { category } from './documents/category'
import { home } from './singletons/home'
import { imageWithAlt } from './objects/image-with-alt'
import { infoSection } from './objects/info-section'
import { link } from './objects/link'
import { metadata } from './objects/metadata'
import { navigation } from './singletons/navigation'
import { page } from './documents/page'
import { person } from './documents/person'
import { post } from './documents/post'
import { service } from './documents/service'
import { serviceType } from './documents/service-type'
import { settings } from './singletons/settings'
import { tag } from './documents/tag'
import { topic } from './documents/topic'
import { blockContentBasic } from './objects/block-content-basic'
import { navItem } from './objects/nav-item'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  home,
  navigation,
  settings,
  // Documents
  category,
  page,
  person,
  post,
  serviceType,
  service,
  tag,
  topic,
  // Objects
  blockContent,
  blockContentBasic,
  callToAction,
  imageWithAlt,
  infoSection,
  link,
  metadata,
  navItem,
]
