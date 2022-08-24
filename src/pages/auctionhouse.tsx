import PrimaryButton from '@components/PrimaryButton'
import { Countdown } from '@components/AuctionHouse/countdowntimer'
import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import { trpc } from '@libs/trpc'
import { useState } from 'react'

export default function AuctionHouse() {
	const [currentBid, setCurrentBid] = useState(10)
	const query = trpc.useQuery(['next-auth.getSession'], { suspense: true })
	const session = query.data

	const { ...auctionRouter } = trpc.useQuery(
		['auctionget-current-bid', { item: 'blizzard-bear' }],
		{
			onSuccess(data) {
				console.log(data)
			},
		}
	)

	return (
		<div>
			<section>
				<div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center">
					<figure className="relative aspect-square h-full w-full sm:w-1/2">
						<Image
							src="https://res.cloudinary.com/df23ubjbb/image/upload/v1660928006/634955258852366054_ligadj.webp"
							alt=""
							layout="fill"
							objectFit="cover"
						/>
					</figure>
					<div className="space-y-4 w-full sm:w-1/2">
						<header>
							<figcaption className="font-extrabold text-xl">Blizzard Blizcon Bear</figcaption>
							<h2 className="font-semibold text-base">Current Bid: ${currentBid}</h2>
							<div className="flex space-x-2 items-baseline">
								<h3 className="font-semibold text-base">Remaning Time:</h3>
								<Countdown />
							</div>
						</header>
						<p>
							You can redeem the card for a US or EU server of your choice. The Bear Mount is bind
							to account, so you can get it on each of your characters. This is the original card
							from Blizzcon 2008.
						</p>
						<PrimaryButton
							type="button"
							buttonText="Place Bid"
							onClick={
								session
									? () => {
											signOut()
									  }
									: () => {
											signIn('twitch')
									  }
							}
						/>
					</div>
				</div>
			</section>
		</div>
	)
}
