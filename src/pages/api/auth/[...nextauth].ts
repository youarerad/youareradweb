/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import TwitchProvider from 'next-auth/providers/twitch'

export const authOptions: NextAuthOptions = {
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID!,
			clientSecret: process.env.DISCORD_CLIENT_SECRET!,
		}),
		TwitchProvider({
			clientId: process.env.TWITCH_CLIENT_ID!,
			clientSecret: process.env.TWITCH_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async jwt({ token, account, user, profile }) {
			if (account) {
				token.accountToken = account.access_token
			}

			return token
		},
		async session({ session, token, user }) {
			session.accessToken = token.accountToken
			return session
		},
	},
}

export default NextAuth(authOptions)
