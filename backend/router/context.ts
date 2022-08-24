import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { unstable_getServerSession } from 'next-auth'

import { authOptions as nextAuthOptions } from 'src/pages/api/auth/[...nextauth]'

export const createContext = async (opts?: trpcNext.CreateNextContextOptions) => {
	const res = opts?.res
	const req = opts?.req

	const session = opts && (await unstable_getServerSession(opts.req, opts.res, nextAuthOptions))

	return {
		req,
		res,
		session,
	}
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
