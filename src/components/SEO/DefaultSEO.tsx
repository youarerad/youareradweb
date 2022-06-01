import { DefaultSeo } from 'next-seo'
import { siteMetaData } from './siteMetaData'
import { useRouter } from 'next/router'

interface DefaultSEOProps {
  title?: string
  description?: string
}

export default function DefaultSEO(props: DefaultSEOProps) {
  const router = useRouter()

  return (
    <DefaultSeo
      title={props.title || siteMetaData.title}
      description={props.description || siteMetaData.description}
      canonical={`${siteMetaData.siteUrl}${router.asPath}`}
      openGraph={{
        type: 'website',
        locale: 'en_US',
        url: `${siteMetaData.siteUrl}${router.asPath}`,
        title: props.title || siteMetaData.title,
        description: props.description || siteMetaData.description,
        images: [
          {
            url: 'https://youarerad.org/RADSeo.webp',
            width: 1280,
            height: 357,
          },
        ],
      }}
      twitter={{
        handle: siteMetaData.twitter,
        site: siteMetaData.twitter,
        cardType: 'summary_large_image',
      }}
      additionalMetaTags={[
        {
          httpEquiv: 'x-ua-compatible',
          content: 'IE=edge; chrome=1',
        },
        {
          property: 'keywords',
          content: 'mental health, wellness, nonprofit, charity, gaming, esports',
        },
      ]}
    />
  )
}
