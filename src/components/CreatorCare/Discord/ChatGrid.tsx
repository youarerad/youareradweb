import Image from 'next/image'

interface ChatGridProps {
	profilePicture: string
	name: string
	nameColor: string
	time: string
	children: React.ReactNode
}

export default function ChatGrid({ ...props }: ChatGridProps) {
	return (
		<div className="flex items-start space-x-4 overflow-y-scroll no-scrollbar">
			<div>
				<Image
					src={props.profilePicture}
					alt=""
					width={48}
					height={48}
					layout="fixed"
					objectFit="fill"
				/>
			</div>

			<div className="text-[#E1E2E6] overflow-y-scroll no-scrollbar">
				<h3 className={`${props.nameColor} text-base font-bold flex items-center`}>
					{props.name} <span className="ml-2 text-[#AFB0B7] text-xs">{props.time}</span>
				</h3>
				{props.children}
			</div>
		</div>
	)
}
