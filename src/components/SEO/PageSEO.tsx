import { NextSeo } from 'next-seo'
import { siteMetaData } from './siteMetaData'

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
