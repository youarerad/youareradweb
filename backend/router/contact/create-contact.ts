import prisma from '@libs/prisma'
import { CreateContactVolunteerSchema } from 'src/shared/ContactSchemas'

/* create-contact contains our core router functions for sending contact data to our database. Each function outlines what information is expected from the database, as well as what the type definition for this information is. To work correctly, the variable within the .insert function of supabase must match the name of the column contained within the targeted supabase database. For example, there is a table named contactform, which has the following columns: name, email, department, and message. Any mismatch of column name or type definition will result in an error. */

export async function createNewsletterForm(email: string) {
	const user = await prisma.user.findUnique({
		where: {
			email: email.toLowerCase(),
		},
	})
	if (user?.newsletter === true) {
		return {
			message: 'You are already subscribed!',
		}
	}

	if (!user) {
		await prisma.user.create({
			data: {
				email: email.toLowerCase(),
				newsletter: true,
			},
		})
		return {
			message: 'Subscribed!',
		}
	}

	if (user.newsletter === false) {
		await prisma.user.update({
			where: {
				email: email.toLowerCase(),
			},
			data: {
				newsletter: true,
			},
		})
		return {
			message: 'Subscribed!',
		}
	}
}

export async function createVolunteerForm(input: CreateContactVolunteerSchema) {
	const user = await prisma.user.findUnique({
		where: {
			email: input.email.toLowerCase(),
		},
	})
	if (user) {
		await prisma.user.update({
			where: { email: input.email.toLowerCase() },
			data: {
				name: input.name,
				Volunteer: {
					upsert: {
						where: {
							id: user.id,
						},
						create: {
							name: input.name,
							email: input.email.toLowerCase(),
							position: input.position,
							experience: input.experience,
							message: input.message,
						},
						update: {
							name: input.name,
							email: input.email.toLowerCase(),
							position: input.position,
							experience: input.experience,
							message: input.message,
						},
					},
				},
			},
		})
	}
	if (!user) {
		await prisma.user.create({
			data: {
				name: input.name,
				email: input.email.toLowerCase(),
				newsletter: true,
				Volunteer: {
					create: {
						name: input.name,
						email: input.email.toLowerCase(),
						position: input.position,
						experience: input.experience,
						message: input.message,
					},
				},
			},
		})
	}
	return { message: 'Form Sent!' }
}

export async function createPartnerForm(
	name: string,
	email: string,
	company: string,
	type: string,
	message: string
) {
	await prisma.partner.create({
		data: {
			name: name,
			email: email.toLowerCase(),
			company: company,
			type: type,
			message: message,
		},
	})
	return { message: 'Form Sent!' }
}

export async function createContactForm(
	name: string,
	email: string,
	department: string,
	message: string
) {
	await prisma.contact.create({
		data: {
			name: name,
			email: email.toLowerCase(),
			department: department,
			message: message,
		},
	})
	return { message: 'Form Sent!' }
}

export async function createEventSignupForm(name: string, email: string) {
	await prisma.eventSignup.create({
		data: {
			email: email.toLowerCase(),
			name: name,
		},
	})
}
