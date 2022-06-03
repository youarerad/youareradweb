import { DefaultSeo } from 'next-seo'
import { siteMetaData } from './siteMetaData'
import { useRouter } from 'next/router'

/* DefaultSEO contains a modular component that emebeds information in Next/Head. We import this directly into _app.tsx, which should allow for all of the meta data to be shared across each page. I believe there may be a lot of redundancies, especially in the way of combining it with the PageSEO.tsx component in the SEO folder. It's worth exploring further what additional meta date is worth adding to this; as well as, exploring deeper how it interacts with PageSEO.tsx. */

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
