import * as trpc from '@trpc/server'
import { z } from 'zod'
import {
  createContactForm,
  createPartnerForm,
  createVolunteerForm,
  createNewsletterForm,
  createOneTimeDonorContact,
  createMonthlyDonorContact,
} from './create-contact'

/* index.ts, which will return simply as 'contact', is where we outline the exact type definitions of our contact router. Each router relates to adding contact information to our supabase database, specified to the table matching the type of contact. Donor contact function is also contained here, as it specific to interacting with our supabase database. */

export const contactRouter = trpc
  .router()
  .mutation('create-contact-general', {
    input: z.object({
      name: z.string(),
      email: z.string(),
      department: z.string(),
      message: z.string(),
    }),
    async resolve({ input }) {
      return await createContactForm(input.name, input.email, input.department, input.message)
    },
  })
  .mutation('create-contact-partner', {
    input: z.object({
      name: z.string(),
      email: z.string(),
      company: z.string(),
      message: z.string(),
    }),
    async resolve({ input }) {
      return await createPartnerForm(input.name, input.email, input.company, input.message)
    },
  })
  .mutation('create-contact-volunteer', {
    input: z.object({
      name: z.string(),
      email: z.string(),
      volunteertype: z.string(),
      why: z.string(),
      experience: z.string(),
    }),
    async resolve({ input }) {
      return await createVolunteerForm(
        input.name,
        input.email,
        input.volunteertype,
        input.why,
        input.experience
      )
    },
  })
  .mutation('create-contact-newsletter', {
    input: z.object({
      email: z.string(),
    }),
    async resolve({ input }) {
      return await createNewsletterForm(input.email)
    },
  })
  .mutation('create-contact-oncedonor', {
    input: z.object({
      name: z.string(),
      email: z.string(),
      donation: z.number(),
      customer_id: z.string(),
    }),
    async resolve({ input }) {
      return await createOneTimeDonorContact(
        input.name,
        input.email,
        input.donation,
        input.customer_id
      )
    },
  })
  .mutation('create-contact-monthlydonor', {
    input: z.object({
      name: z.string(),
      email: z.string(),
      donation: z.number(),
      customer_id: z.string(),
    }),
    async resolve({ input }) {
      return await createMonthlyDonorContact(
        input.name,
        input.email,
        input.donation,
        input.customer_id
      )
    },
  })
