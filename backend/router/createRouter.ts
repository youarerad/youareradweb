import * as trpc from '@trpc/server'
import { Context } from './context'

export const createRouter = () => trpc.router<Context>()
