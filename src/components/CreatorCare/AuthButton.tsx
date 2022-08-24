import { DiscordIcon } from '@components/Footer/FooterIcons'
import { trpc } from '@libs/trpc'

import { signIn, signOut } from 'next-auth/react'

export default function AuthButton() {
	const query = trpc.useQuery(['next-auth.getSession'], {
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
	})
	const session = query.data?.user

	return (
		<button
			className="flex items-center px-3 py-2 text-lg font-bold rounded-md bg-[#5765f2] focus:ring-2 ring-white outline-none hover:bg-[#7983f5]"
			onClick={
				session
					? () => {
							signOut()
					  }
					: () => {
							signIn('discord')
					  }
			}
		>
			{session ? 'Signout' : 'Signup with Discord'}
			<span className="pl-2" aria-hidden>
				<DiscordIcon />
			</span>
		</button>
	)
}
