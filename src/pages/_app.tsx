import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { withTRPC } from '@trpc/next'
import { AppRouter } from './api/trpc/[trpc]'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import PageLayout from '@layouts/PageLayout'
import DefaultSEO from '@components/SEO/DefaultSEO'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PageLayout>
      <DefaultSEO />
      <Component {...pageProps} />
    </PageLayout>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = 'https://youarerad.org/'
      ? `https://https://youarerad.org/api/trpc`
      : 'http://localhost:3000/api/trpc'

    const ONE_DAY_SECONDS = 60 * 60 * 24
    ctx?.res?.setHeader('Cache-Control', `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`)
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url,
        }),
      ],
      headers: {
        'x-ssr': '1',
      },
    }
  },
  ssr: false,
})(MyApp)
