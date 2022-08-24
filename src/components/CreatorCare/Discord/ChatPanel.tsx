import { ShowMembers } from './DiscordIcons'
import { z } from 'zod'
import React, { useState } from 'react'
import ChatGrid from './ChatGrid'

export default function ChatPanel({
	children,
	onClick,
}: {
	children: React.ReactNode
	onClick: () => void
}) {
	const [chatInput, setChatInput] = useState<string>('')
	const [commandSuccess, setCommandSuccess] = useState<boolean>(false)
	const handleTherapyCommands = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const schema = z
			.string()
			.refine((input) => input.includes('&therapy'), { message: 'Try typing &therapy' })
		const result = schema.safeParse(chatInput)
		if (result.success) {
			console.log('success!')
			setChatInput('')
			setCommandSuccess(true)
		}
		if (!result.success) setChatInput('')
	}

	const date = new Date().toLocaleTimeString()
	const formatDate = date.replace(/:\d+ /, ' ')

	return (
		<div className="bg-[#40424a] flex flex-col h-full">
			<div className="bg-[#37393f] p-5 flex items-center justify-between">
				<h1 className="flex items-center text-[#A2A3A8] text-base font-bold">
					<button type="button" onClick={onClick}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6 mr-10"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>

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
					<span className="flex items-center px-2 text-white">RadBot</span>
					<div className="pl-2 w-2 h-2 bg-green rounded-full ring-2 ring-[#37393f]" />
				</h1>
				<div className="flex items-center space-x-6">
					<ShowMembers />
				</div>
			</div>
			<div className="flex-1 p-5 overflow-y-auto no-scrollbar">
				{children}

				{commandSuccess && (
					<ChatGrid
						name="Radbot"
						nameColor="text-white"
						profilePicture="/rad.svg"
						time={`Today at ${formatDate}`}
					>
						Hey there! I&apos;d be happy to help you start therapy! I&apos;ll link the steps below
						😊. Once you&apos;ve completed the intake form, one of our mental health professionals
						will reach out to schedule a call with you. This call can be done with or without video.
						<br />
						<br />
						<div className="flex overflow-hidden rounded-md bg-black/40">
							<div className="w-1 h-auto mr-2 bg-primary" />
							<div className="flex flex-col py-4">
								<span className="mb-2 font-bold">How To Start Therapy With RAD:</span>
								<ol>
									<li>
										<span className="font-semibold">1. </span> Fill out our intake form.
									</li>
									<li>
										<span className="font-semibold">2. </span>Talk with one of our clinical social
										workers.
									</li>
									<li>
										<span className="font-semibold">3. </span>
										Start seeing a therapist local to you 💚.
									</li>
								</ol>
							</div>
						</div>
						<button className="flex px-3 py-2 bg-[#50545b] rounded-md mt-2 items-center hover:bg-gray-light/30 duration-200">
							<span>📝 Intake Form</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-5 h-5 ml-4 select-none"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								/>
							</svg>
						</button>
					</ChatGrid>
				)}
			</div>
			<form
				className="flex items-center w-full h-16 px-4 border-t border-t-black/20"
				onSubmit={handleTherapyCommands}
			>
				<label className="w-full">
					<input
						className="rounded-xl bg-[#37393f] px-3 py-2 placeholder-[#A2A3A8] w-full appearance-none outline-none text-white"
						placeholder="Message @RadBot"
						value={chatInput}
						onChange={(e) => setChatInput(e.target.value)}
					/>
				</label>
			</form>
		</div>
	)
}
