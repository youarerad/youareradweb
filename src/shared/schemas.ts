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
	// TODO -- update to not be optional once added in frontend
	position: z.string().optional().default(''),
})

export type CreateContactVolunteerSchema = z.output<typeof createContactVolunteerSchema>
