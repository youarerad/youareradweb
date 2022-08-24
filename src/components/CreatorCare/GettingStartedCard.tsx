import Image from 'next/image'
import SectionHighlight from '@utils/SectionHighlight'
import { ReactNode } from 'react'

interface CardProps {
	step: 'Step 1' | 'Step 2' | 'Step 3'
	title: string
	children: ReactNode
	image: string
	colorOption?: 'to-secondary' | 'to-red' | 'to-green'
}

export default function GettingStartedCard({
	step,
	title,
	children,
	image,
	colorOption,
}: CardProps) {
	return (
		<SectionHighlight>
			<div className="flex flex-col items-center justify-center h-[50vh] max-w-lg align-middle mx-auto">
				<div className="select-none">
					<Image
						src={image}
						alt=""
						width="140"
						height="140"
						objectFit="scale-down"
						draggable={false}
					/>
				</div>
				<div>
					<h3>
						{step}:{' '}
						<span
							className={`text-transparent bg-gradient-to-br from-primary-light bg-clip-text ${colorOption}`}
						>
							{title}
						</span>
					</h3>
					<p className="mt-2">{children}</p>
				</div>
			</div>
		</SectionHighlight>
	)
}
