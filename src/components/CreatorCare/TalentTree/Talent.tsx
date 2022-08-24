import * as HoverCard from '@radix-ui/react-hover-card'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import classNames from '@utils/classNames'

interface TalentProps {
	name: string
	requirement?: string
	description: string
	icon: string
	onClick?: () => void
	state: boolean
	rounded?: boolean
}

const Talent = ({ onClick, state, name, requirement, icon, description, rounded }: TalentProps) => {
	const [activeTalent, setActiveTalent] = useState(false)

	useEffect(() => {
		if (state) {
			setActiveTalent(true)
		} else {
			setActiveTalent(false)
		}
	}, [state])

	return (
		<HoverCard.Root openDelay={0} closeDelay={0}>
			<HoverCard.Trigger>
				<button className="relative z-20 flex flex-col items-center" onClick={onClick}>
					<div
						className={classNames(
							activeTalent ? 'grayscale-0 border-[#d1af0a]' : 'grayscale border-gray',
							'select-none border-4 h-16 w-16 overflow-hidden relative',
							rounded ? 'rounded-full' : ''
						)}
					>
						<Image src={icon} alt="" layout="fill" objectFit="contain" draggable="false" />
					</div>
				</button>
			</HoverCard.Trigger>
			<HoverCard.Content
				side="right"
				sideOffset={20}
				className="z-50 p-2 my-auto text-white border-2 w-80 bg-secondary/20 border-gray backdrop-blur"
			>
				<div className="flex flex-col">
					<h4 className="text-base font-semibold text-left">{name}</h4>
					{requirement && <h5 className="text-sm font-semibold text-left">{requirement}</h5>}
					<p className="text-[#d5af05] text-sm font-bold">{description}</p>
				</div>
			</HoverCard.Content>
		</HoverCard.Root>
	)
}

export default Talent
