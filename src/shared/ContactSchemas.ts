import { z } from 'zod'

export const createContactVolunteerSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(2, 'Name must be at least 2 characters'),
	email: z.string().email({ message: 'Email invalid' }),
	experience: z
		.string({ required_error: 'Experience is required' })
		.min(10, { message: 'Experience must be at least 10 characters' }),
	message: z.string({ required_error: 'Message is required' }).min(20, {
		message: 'Message must be at least 20 characters',
	}),
	position: z.string().optional().default(''),
})

export type CreateContactVolunteerSchema = z.output<typeof createContactVolunteerSchema>

export const createContactPartnerSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(2, 'Name must be at least 2 characters'),
	email: z.string().email({ message: 'Email invalid' }),
	type: z.string().optional().default(''),
	company: z
		.string({ required_error: 'Company is required' })
		.min(2, 'Company must be at least 2 characters'),
	message: z
		.string({ required_error: 'Details are required' })
		.min(2, 'Details must be at least 2 characters'),
})

export type CreateContactPartnerSchema = z.output<typeof createContactPartnerSchema>

export const createContactFormSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(2, 'Name must be at least 2 characters'),
	email: z.string().email({ message: 'Email invalid' }),
	department: z.string().optional().default(''),
	message: z
		.string({ required_error: 'Message is required' })
		.min(10, 'Message must be at least 10 characters'),
})

export type CreateContactFormSchema = z.output<typeof createContactFormSchema>

export const createEventSignupFormSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(2, 'Name must be at least 2 characters'),
	email: z.string().email({ message: 'Email invalid' }),
})

export type CreateEventSignupFormSchema = z.output<typeof createEventSignupFormSchema>

export const createCommunityCareFormSchema = z.object({
	email: z.string().email({ message: 'Email invalid' }),
	discord: z
		.string({ required_error: 'Discord is required' })
		.min(4, 'Discord must be at least 4 characters'),
	twitter: z.string().optional().default(''),
	platform: z.string({ required_error: 'Platform username is required' }).min(2),
})

export type CreateCommunityCareFormSchema = z.output<typeof createCommunityCareFormSchema>
