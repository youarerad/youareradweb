import Link from 'next/link'

export default function DonateTwitchSub() {
	return (
		<Link href="https://www.twitch.tv/subs/youarerad" passHref>
			<a className="col-span-2 p-3 font-bold text-center text-black duration-100 border-2 border-gray-light rounded-xl hover:shadow-xl hover:bg-primary hover:text-white hover:border-primary hover:drop-shadow-sm">
				Donate With Twitch.tv
			</a>
		</Link>
	)
}
