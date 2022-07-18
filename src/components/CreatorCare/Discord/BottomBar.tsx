import Image from 'next/image'
import { DiscordLogo, FriendIcon, Search } from './DiscordIcons'
import { AnimationControls, motion } from 'framer-motion'

interface BottomBarProps {
	controls: AnimationControls
}

export default function BottomBar({ controls }: BottomBarProps) {
	const variants = {
		hidden: { y: 100, transition: { duration: 0.2, delay: 0 } },
		visible: { y: 0, transition: { duration: 0.2 }, delay: 0 },
	}
	return (
		<motion.div
			initial="hidden"
			animate={controls}
			variants={variants}
			exit="hidden"
			className="flex w-full pt-6 h-20 px-6 text-white bg-[#1C1B20] justify-evenly items-start"
		>
			<DiscordLogo />
			<FriendIcon />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 text-[#A2A3A8]"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
				/>
			</svg>

			<Search />
			<div className="relative w-6 h-6 rounded-full">
				<Image
					src="/jason.webp"
					width={24}
					height={24}
					alt=""
					className="rounded-full"
					objectFit="cover"
				/>
				<div className="absolute bottom-0 right-0 w-2 h-2 bg-green rounded-full ring-2 ring-[#1C1B20]" />
			</div>
		</motion.div>
	)
}
