import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { withTRPC } from '@trpc/next'
import { AppRouter } from './api/trpc/[trpc]'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import PageLayout from '@layouts/PageLayout'
import { useAnalytics } from '@utils/hooks/useAnalytics'
import DefaultSEO from '@components/SEO/DefaultSEO'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import superjson from 'superjson'
import { AppType } from 'next/dist/shared/lib/utils'

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
	useAnalytics()
	const getLayout = Component.getLayout ?? ((page) => <PageLayout>{page}</PageLayout>)

	return getLayout(
		<>
			<DefaultSEO />
			<Component {...pageProps} />
		</>
	)
}) as AppType

function getBaseUrl() {
	if (typeof window !== 'undefined') {
		return ''
	}

	if (process.env.NEXT_PUBLIC_VERCEL_URL) {
		return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
	}

	return `http://localhost:${process.env.PORT ?? 3000}`
}

export default withTRPC<AppRouter>({
	config() {
		return {
			links: [
				loggerLink({
					enabled: () => true,
				}),
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
			transformer: superjson,
		}
	},
	ssr: true,
	responseMeta({ ctx, clientErrors }) {
		if (clientErrors.length) {
			// propagate http first error from API calls
			return {
				status: clientErrors[0].data?.httpStatus ?? 500,
			}
		}

		// cache request for 1 day + revalidate once every second
		const ONE_DAY_IN_SECONDS = 60 * 60 * 24
		return {
			headers: {
				'cache-control': `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
			},
		}
	},
})(MyApp)
