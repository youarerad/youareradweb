/* trpc is the magic behind our contact and donation routers. Here we're able to leverage React Query functionality with automatic typesaftey and no code generation. */

import type { AppRouter } from 'backend/router'
import { createReactQueryHooks } from '@trpc/react'

export const trpc = createReactQueryHooks<AppRouter>()
