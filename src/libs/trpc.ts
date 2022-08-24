/* trpc is the magic behind our contact and donation routers. Here we're able to leverage React Query functionality with automatic typesaftey and no code generation. */
import type { inferProcedureOutput } from '@trpc/server'
import type { AppRouter } from 'backend/router'
import { createReactQueryHooks } from '@trpc/react'

export const trpc = createReactQueryHooks<AppRouter>()

export type inferQueryOutput<TRouteKey extends keyof AppRouter['_def']['queries']> =
	inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>
