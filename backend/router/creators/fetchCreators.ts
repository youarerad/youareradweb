import prisma from '@libs/prisma'

export default async function fetchCreators() {
	return await prisma.creator.findMany({
		orderBy: {
			therapySessionsTotal: 'desc',
		},
		select: {
			discord: false,
			email: false,
			created_at: false,
			id: true,
			name: true,
			therapySessionsTotal: true,
			profilePhoto: true,
			therapySessionsPaid: true,
			therapySessionsRemaining: true,
			twitchChannel: true,
			twitterPage: true,
			youtubeChannel: true,
		},
	})
}

export type FilterCreators = {
	name: string | null
	profilePhoto: string | null
	therapySessionsTotal: number | null
	therapySessionsPaid: number | null
	therapySessionsRemaining: number | null
	twitchChannel: string | null
	twitterPage: string | null
	youtubeChannel: string | null
}
