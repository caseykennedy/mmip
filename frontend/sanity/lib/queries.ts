import { defineQuery } from 'next-sanity'

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  postType,
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  region,
  category->{name, "slug": slug.current, description},
  topic->{name, "slug": slug.current, description},
  "tags": tags->[]{name, "slug": slug.current, description},
  excerpt[]{...},
  notes[]{...},
  authors[]->{firstName, lastName, picture},
  asset,
  metadata
`

const linkReference = /* groq */ `
  _type == "link" => {
    _type,
    linkType,
    label,
    openInNewTab,
    page->{
      name,
      "slug": slug.current
    },
    post->{
      title,
      "slug": slug.current
    },
    category->{
      name,
      "slug": slug.current
    }
  }
`

const linkFields = /* groq */ `
  link {
    ${linkReference}
  }
`

// Singletons
export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

export const navigationQuery = defineQuery(`
  *[_type == "navigation"][0]{
    mainNav[]{
      _key,
      _type,
      link{
        ${linkReference}
      },
      hasDropdown,
      menuLabel,
      dropdownMenu[]{
        ${linkReference}
      }
    },
    footerNav[]{
      ${linkReference}
    }
  }
`)

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const getPostsByTypeQuery = defineQuery(`
  *[_type == "post" && postType == $postType] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
      ...,
      markDefs[]{
        ...,
        ${linkReference}
      }
    },
    ${postFields}
  }
`)

export const getPostQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug && category->slug.current == $categorySlug][0] {
    content[]{
      ...,
      markDefs[]{
        ...,
        ${linkReference}
      }
    },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

// Categories

const categoryFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  description,
  image,
  order
`

export const allCategoriesQuery = defineQuery(`
  *[_type == "category" && defined(slug.current)] {
    ${categoryFields}
  }
`)

export const getCategoryQuery = defineQuery(`
  *[_type == 'category' && slug.current == $slug][0]{
    ${categoryFields}
  }
`)
