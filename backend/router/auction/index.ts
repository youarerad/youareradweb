import * as trpc from '@trpc/server'
import { z } from 'zod'
import getCurrentBid from './getCurrentBid'

export const auctionRouter = trpc.router().query('get-current-bid', {
	input: z.object({
		item: z.string(),
	}),
	async resolve({ input }) {
		return await getCurrentBid(input.item)
	},
})
