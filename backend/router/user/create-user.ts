import prisma from '@libs/prisma'

export async function createUserOneTimeDonation(
	amount: number,
	customer_id: string,
	name?: string,
	email?: string,
	honor?: string,
	message?: string
) {
	await prisma.donation.create({
		data: {
			amount: amount / 100,
			customer_id: customer_id,
			name: name,
			email: email,
			payment_status: 'SUCCESS',
			payment_method: 'STRIPE',
			payment_type: 'ONETIME',
			honor: honor,
			message: message,
			User: {
				connectOrCreate: {
					where: {
						email: email!.toLowerCase(),
					},
					create: {
						name: name,
						email: email!.toLowerCase(),
					},
				},
			},
		},
	})
}

export async function createUserMonthlyDonation(
	amount: number,
	customer_id: string,
	name?: string,
	email?: string,
	honor?: string,
	message?: string
) {
	await prisma.donation.create({
		data: {
			name: name,
			email: email!.toLowerCase(),
			amount: amount / 100,
			payment_status: 'SUCCESS',
			payment_method: 'STRIPE',
			payment_type: 'MONTHLY',
			customer_id: customer_id,
			honor: honor,
			message: message,
			User: {
				connectOrCreate: {
					where: {
						email: email!.toLowerCase(),
					},
					create: {
						name: name,
						email: email!.toLowerCase(),
						is_monthly: true,
					},
				},
			},
		},
	})
}

export async function createUserOneTimePaypalDonation(
	name: string,
	email: string,
	amount: number,
	customer_id: string,
	honor?: string,
	message?: string
) {
	await prisma.donation.create({
		data: {
			name: name,
			email: email,
			amount: amount,
			payment_status: 'SUCCESS',
			payment_method: 'PAYPAL',
			payment_type: 'ONETIME',
			customer_id: customer_id,
			honor: honor,
			message: message,
			User: {
				connectOrCreate: {
					where: {
						email: email.toLowerCase(),
					},
					create: {
						name: name,
						email: email.toLowerCase(),
					},
				},
			},
		},
	})
}
