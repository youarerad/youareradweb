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

function getBaseUrl() {
  if (process.browser) return '' // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`

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
