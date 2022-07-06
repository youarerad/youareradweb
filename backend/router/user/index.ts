import * as trpc from '@trpc/server'
import { z } from 'zod'
import {
	createUserMonthlyDonation,
	createUserOneTimeDonation,
	createUserOneTimePaypalDonation,
} from './create-user'

export const userRouter = trpc
	.router()
	.mutation('create-user', {
		input: z.object({
			email: z.string(),
			name: z.string(),
			amount: z.number(),
			customer_id: z.string(),
			honor: z.string(),
			message: z.string(),
		}),
		async resolve({ input }) {
			return await createUserOneTimeDonation(
				input.name,
				input.email,
				input.amount,
				input.customer_id,
				input.honor,
				input.message
			)
		},
	})
	.mutation('create-monthly-user', {
		input: z.object({
			email: z.string(),
			name: z.string(),
			amount: z.number(),
			customer_id: z.string(),
			honor: z.string(),
			message: z.string(),
		}),
		async resolve({ input }) {
			return await createUserMonthlyDonation(
				input.name,
				input.email,
				input.amount,
				input.customer_id,
				input.honor,
				input.message
			)
		},
	})
	.mutation('create-paypal-user', {
		input: z.object({
			email: z.string(),
			name: z.string(),
			amount: z.number(),
			customer_id: z.string(),
			honor: z.string(),
			message: z.string(),
		}),
		async resolve({ input }) {
			return await createUserOneTimePaypalDonation(
				input.name,
				input.email,
				input.amount,
				input.customer_id,
				input.honor,
				input.message
			)
		},
	})
