import Image from 'next/image'
import PrimaryButton from '@components/PrimaryButton'

interface AuctionItemProps {
	id: number
	image: string
	name: string
	description: string
	currentBid: number
	timeRemaining: React.ReactNode
	onClick: () => void
}

export default function AuctionItem({ ...props }: AuctionItemProps) {
	return (
		<div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center">
			<figure className="relative aspect-square h-full w-full sm:w-1/2">
				<Image src={props.image} alt="" layout="fill" objectFit="cover" />
			</figure>
			<div className="space-y-4 w-full sm:w-1/2">
				<header>
					<figcaption className="font-extrabold text-xl">{props.name}</figcaption>
					<div className="flex space-x-2 items-baseline">
						<h2 className="font-semibold text-base">Current Bid:</h2>
						<div className="text-base">{props.currentBid}</div>
					</div>
					<div className="flex space-x-2 items-baseline">
						<h3 className="font-semibold text-base">Remaning Time:</h3>
					</div>
				</header>
				<p>{props.description}</p>
				<PrimaryButton type="button" buttonText="Place Bid" onClick={props.onClick} />
			</div>
		</div>
	)
}
