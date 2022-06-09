import * as trpc from '@trpc/server'
import { z } from 'zod'
import { createNewsletterForm } from './create-contact'

/* index.ts, which will return simply as 'contact', is where we outline the exact type definitions of our contact router. Each router relates to adding contact information to our supabase database, specified to the table matching the type of contact. Donor contact function is also contained here, as it specific to interacting with our supabase database. */

export const contactRouter = trpc
  .router()

  .mutation('create-contact-newsletter', {
    input: z.object({
      email: z.string(),
    }),
    async resolve({ input }) {
      return await createNewsletterForm(input.email)
    },
  })
