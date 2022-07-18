import BottomBar from './BottomBar'
import { useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { Messages } from './DiscordIcons'

export default function LeftPanel({ children }: { children: React.ReactNode }) {
	const controls = useAnimation()
	const { ref, inView } = useInView({
		threshold: 0.5,
	})

	useEffect(() => {
		if (inView) {
			controls.start('visible')
		}
		if (!inView) {
			controls.start('hidden')
		}
	}, [controls, inView])

	return (
		<div className="bg-[#37393F] flex flex-col h-full overflow-hidden" ref={ref}>
			<div className="flex h-full pt-5">
				<div className="flex w-20 h-full pt-2 space-x-2">
					<div className="w-1 h-10 bg-white rounded-r" />
					<div className="flex items-center justify-center w-10 h-10 text-white rounded-xl bg-[#6671ef]">
						<Messages />
					</div>
				</div>
				<div className="bg-[#40424a] flex flex-col w-full p-5 rounded-t-xl h-full mr-6">
					<div className="flex items-center justify-between font-bold text-white">
						<div className="w-full px-2">Direct Messages</div>

						<div className="relative w-6 h-6 rounded-full">
							<Messages />
							<div className="absolute w-4 h-4 rounded-full -right-1 -top-1 bg-[#37393F] flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-5 h-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
						</div>
					</div>
					{children}
				</div>
			</div>
			<BottomBar controls={controls} />
		</div>
	)
}
