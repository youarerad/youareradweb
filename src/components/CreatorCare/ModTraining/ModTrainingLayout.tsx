import Image from 'next/image'
import { AboutCard } from '../AboutCards'

export default function ModTrainingLayout() {
	return (
		<div className="pt-20 text-white">
			<AboutCard
				sectionColor="bg-red"
				sectionTitle="Mental health care for your mods"
				sectionHeader="Support the frontlines of your community"
				textWhite={true}
				sectionHeaderColor="from-red-light to-secondary-light "
				sectionText="Priority therapy support, stress management training, and crisis response."
				threshold={0.5}
				direction="sm:order-2"
			>
				<div className="select-none">
					<Image
						src="https://res.cloudinary.com/df23ubjbb/image/upload/v1660070506/Group_3422_1_ugp8lo.webp"
						width="900"
						height={716}
						objectFit="scale-down"
						alt=""
						draggable={false}
					/>
				</div>
			</AboutCard>
		</div>
	)
}
