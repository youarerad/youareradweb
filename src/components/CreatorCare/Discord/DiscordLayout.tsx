import { Tab } from '@headlessui/react'
import Image from 'next/image'
import { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import ChatGrid from './ChatGrid'
import ChatPanel from './ChatPanel'
import LeftPanel from './LeftPanel'

export default function DiscordLayout() {
	const [view, resetView] = useState({ index: 1 })
	const handleViewReset = (value: number) => {
		resetView({ index: value })
	}

	const handleViewChange = (index: number) => {
		resetView({ index })
	}

	const date = new Date().toLocaleTimeString()
	const formatDate = date.replace(/:\d+ /, ' ')

	return (
		<div className="sm:h-[70vh] h-[80vh] relative overflow-hidden rounded-xl">
			<SwipeableViews
				index={view.index}
				onChangeIndex={handleViewReset}
				enableMouseEvents
				containerStyle={{ height: '100%' }}
				className="h-full no-scrollbar"
			>
				<LeftPanel>
					<Tab.Group>
						<Tab.List className="py-4">
							<Tab
								className="flex w-full p-2 text-white rounded-md bg-white/20"
								onClick={() => handleViewChange(1)}
							>
								<div className="relative z-30 w-6 h-6 rounded-full">
									<Image
										src="/rad.svg"
										width={24}
										height={24}
										alt=""
										className="rounded-full"
										objectFit="cover"
									/>
									<div className="absolute bottom-0 right-0 w-2 h-2 bg-green rounded-full ring-2 ring-[#3f424a]" />
								</div>
								<span className="pl-4 text-base font-medium">RAD Bot</span>
							</Tab>
						</Tab.List>
					</Tab.Group>
				</LeftPanel>
				<ChatPanel onClick={() => handleViewChange(0)}>
					<ChatGrid
						name="Radbot"
						nameColor="text-white"
						profilePicture="/rad.svg"
						time={`Today at ${formatDate}`}
					>
						Hey there! I&apos;m Radbot, your friendly neighborhood Discord bot. You can find me in
						the Discord Channel&apos;s of Content Creators signed up with our Community Care
						program.
						<br />
						<br />I connect community members with mental health professionals and answer questions
						about therapy.
						<br />
						<br />
						Moderators of a community can react to a message with a ⚠️ emjoi to have me send it to
						our clinical social workers for review. I&apos;m also learning how to detect and flag
						concerning messages on my own.
						<br />
						<br />
					</ChatGrid>
				</ChatPanel>
			</SwipeableViews>
		</div>
	)
}
