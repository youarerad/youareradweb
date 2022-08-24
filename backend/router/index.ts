import * as trpc from '@trpc/server'
import { checkoutRouter } from './checkout'
import { contactRouter } from './contact'
import { userRouter } from './user'
import { creatorRouter } from './creators'
import { authRouter } from './auth'
import { Context } from './context'

/* This index.ts, which will return as simply as router, allows for combining both our checkout and contact router functions. See the individual routers for more information about their particular function. */

export const appRouter = trpc
	.router<Context>()
	.merge(authRouter)
	.merge('checkout.', checkoutRouter)
	.merge('contact.', contactRouter)
	.merge('user.', userRouter)
	.merge('creators.', creatorRouter)

export type AppRouter = typeof appRouter
