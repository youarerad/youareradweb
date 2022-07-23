import * as trpc from '@trpc/server'
import {
	createContactFormSchema,
	createContactPartnerSchema,
	createContactVolunteerSchema,
	createEventSignupFormSchema,
} from 'src/shared/ContactSchemas'
import { z } from 'zod'
import {
	createContactForm,
	createEventSignupForm,
	createNewsletterForm,
	createPartnerForm,
} from './create-contact'
import { createVolunteerForm } from './create-contact'

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
	.mutation('create-contact-volunteer', {
		input: createContactVolunteerSchema,
		async resolve({ input }) {
			return await createVolunteerForm({
				name: input.name,
				email: input.email,
				position: input.position,
				experience: input.experience,
				message: input.message,
			})
		},
	})
	.mutation('create-contact-partner', {
		input: createContactPartnerSchema,
		async resolve({ input }) {
			return await createPartnerForm(
				input.name,
				input.email,
				input.company,
				input.type,
				input.message
			)
		},
	})
	.mutation('create-contact-general', {
		input: createContactFormSchema,
		async resolve({ input }) {
			return await createContactForm(input.name, input.email, input.department, input.message)
		},
	})
	.mutation('create-event-signup', {
		input: createEventSignupFormSchema,
		async resolve({ input }) {
			return await createEventSignupForm(input.name, input.email)
		},
	})
