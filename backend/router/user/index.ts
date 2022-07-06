import { z } from 'zod'
import { createRouter } from '../createRouter'
import {
	createUserMonthlyDonation,
	createUserOneTimeDonation,
	createUserOneTimePaypalDonation,
} from './create-user'

export const userRouter = createRouter()
	.mutation('create-user', {
		input: z.object({
			email: z.string(),
			name: z.string(),
			amount: z.number(),
			customer_id: z.string(),
		}),
		async resolve({ input, ctx }) {
			return await createUserOneTimeDonation(
				input.name,
				input.email,
				input.amount,
				input.customer_id
			)
		},
	})
	.mutation('create-monthly-user', {
		input: z.object({
			email: z.string(),
			name: z.string(),
			amount: z.number(),
			customer_id: z.string(),
		}),
		async resolve({ input }) {
			return await createUserMonthlyDonation(
				input.name,
				input.email,
				input.amount,
				input.customer_id
			)
		},
	})
	.mutation('create-paypal-user', {
		input: z.object({
			email: z.string(),
			name: z.string(),
			amount: z.number(),
			customer_id: z.string(),
		}),
		async resolve({ input }) {
			return await createUserOneTimePaypalDonation(
				input.name,
				input.email,
				input.amount,
				input.customer_id
			)
		},
	})
