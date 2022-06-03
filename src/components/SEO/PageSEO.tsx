import { NextSeo } from 'next-seo'
import { siteMetaData } from './siteMetaData'

/* The PageSEO component injects page specific meta data, which should combine with the DefaultSEO.tsx metadata already added to the page. As an example, any created page will, by default, be named Rise Above The Disorder. When importing PageSEO into the page file, we can change that title and description, which will reflect both in the browser tab name, any sharing of said page, and search engine results. */

interface PageSEOProps {
  title?: string
  description?: string
}

export default function PageSEO(props: PageSEOProps) {
  return (
    <NextSeo
      title={props.title || siteMetaData.title}
      description={props.description || siteMetaData.description}
    />
  )
}
