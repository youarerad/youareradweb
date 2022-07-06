import { checkoutRouter } from './checkout'
import { contactRouter } from './contact'
import { userRouter } from './user'
import { createRouter } from './createRouter'

/* This index.ts, which will return as simply as router, allows for combining both our checkout and contact router functions. See the individual routers for more information about their particular function. */

export const appRouter = createRouter()
	.merge('checkout.', checkoutRouter)
	.merge('contact.', contactRouter)
	.merge('user.', userRouter)

export type AppRouter = typeof appRouter
