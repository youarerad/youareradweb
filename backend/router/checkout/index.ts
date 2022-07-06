import { createMonthlyDonation, createOneTimeDonation } from './create-checkout'
import getSessionById from './getSessionById'
import { z } from 'zod'
import { createRouter } from '../createRouter'

/* index.ts, which will return simply as 'checkout', is where we outline the exact type definitions of our checkout router. Each router feature, here including get-session, create-one-time-donation, and create-monthly-donation will expect 'input' followed by the their respective definition of input. */

export const checkoutRouter = createRouter()
	.query('get-session', {
		input: z.object({
			session_id: z
				.string()
				.refine((id) => id.startsWith('cs_'), { message: 'Session ID must start with "cs_"' }),
		}),
		async resolve({ input }) {
			return await getSessionById(input.session_id)
		},
	})
	.mutation('create-onetime-donation', {
		input: z.object({
			priceId: z.number(),
		}),
		async resolve({ input }) {
			return await createOneTimeDonation(input.priceId)
		},
	})
	.mutation('create-monthly-donation', {
		input: z.object({
			priceId: z.string(),
		}),
		async resolve({ input }) {
			return await createMonthlyDonation(input.priceId)
		},
	})
