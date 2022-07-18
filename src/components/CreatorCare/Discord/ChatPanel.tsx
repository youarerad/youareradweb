import { ShowMembers } from './DiscordIcons'

export default function ChatPanel({
	children,
	onClick,
}: {
	children: React.ReactNode
	onClick: () => void
}) {
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
			<div className="flex-1 p-5 overflow-y-auto no-scrollbar">{children}</div>
			<div className="flex items-center w-full h-16 px-4 border-t border-t-black/20">
				<label className="w-full">
					<input
						className="rounded-xl bg-[#37393f] px-3 py-2 placeholder-[#A2A3A8] w-full appearance-none outline-none text-white"
						placeholder="Message @RadBot"
					></input>
				</label>
			</div>
		</div>
	)
}
