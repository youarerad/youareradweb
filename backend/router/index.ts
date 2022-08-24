import { createRouter } from './createRouter'
import { checkoutRouter } from './checkout'
import { contactRouter } from './contact'
import { userRouter } from './user'
import { creatorRouter } from './creators'
import { router as authRouter } from './auth'
import superjson from 'superjson'
import { auctionRouter } from './auction'

/* This index.ts, which will return as simply as router, allows for combining both our checkout and contact router functions. See the individual routers for more information about their particular function. */

export const appRouter = createRouter()
	.transformer(superjson)
	.merge(authRouter)
	.merge('checkout.', checkoutRouter)
	.merge('contact.', contactRouter)
	.merge('user.', userRouter)
	.merge('creators.', creatorRouter)
	.merge('auction', auctionRouter)

export type AppRouter = typeof appRouter
