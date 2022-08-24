import { PrismaClient } from '@prisma/client'
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { unstable_getServerSession } from 'next-auth'

import { authOptions as nextAuthOptions } from 'src/pages/api/auth/[...nextauth]'

const prisma = new PrismaClient({
	log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
})

export const createContext = async (opts?: trpcNext.CreateNextContextOptions) => {
	const req = opts?.req
	const res = opts?.res

	const session = opts && (await unstable_getServerSession(opts.req, opts.res, nextAuthOptions))

	return {
		req,
		res,
		session,
		prisma,
	}
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
