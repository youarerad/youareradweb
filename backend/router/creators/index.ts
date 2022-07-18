import * as trpc from '@trpc/server'
import fetchCreators from './fetchCreators'

export const creatorRouter = trpc.router().query('creators', {
	async resolve() {
		return await fetchCreators()
	},
})
