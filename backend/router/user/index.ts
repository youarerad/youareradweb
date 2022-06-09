import * as trpc from '@trpc/server'
import { z } from 'zod'
import { createUserOneTimeDonation } from './create-user'

export const userRouter = trpc.router().mutation('create-user', {
  input: z.object({
    email: z.string(),
    name: z.string(),
    amount: z.number(),
    customer_id: z.string(),
  }),
  async resolve({ input }) {
    return await createUserOneTimeDonation(input.name, input.email, input.amount, input.customer_id)
  },
})
