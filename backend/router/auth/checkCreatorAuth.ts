import prisma from '@libs/prisma'

export default async function checkCreatorAuth(email: string) {
	const user = await prisma.cCSignup.findUnique({
		where: {
			email: email,
		},
	})

	if (user) {
		return user.id
	}

	if (!user) {
		return null
	}
}
