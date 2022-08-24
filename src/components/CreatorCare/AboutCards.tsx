import LazyVideo from '@components/VideoPlayer'
import SectionHighlight from '@utils/SectionHighlight'
import { Variants } from 'framer-motion'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import Image from 'next/image'
import DonationAlert from './DonationAlert'

interface AboutCardProps {
	sectionColor: string
	sectionTitle: string
	sectionHeader: string
	sectionHeaderColor: string
	sectionText: string
	children: React.ReactNode
	direction?: 'sm:order-1' | 'sm:order-2'
	textWhite?: boolean
	threshold?: number
}

const cardVariants: Variants = {
	offscreen: {
		x: -10,
		opacity: 0,
	},
	onscreen: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.8,
		},
	},
}

const imageVariants: Variants = {
	offscreen: {
		y: -10,
		opacity: 0,
		transition: {
			duration: 0.8,
		},
	},
	onscreen: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.8,
		},
	},
}

export function AboutCard({
	sectionColor,
	sectionTitle,
	sectionHeader,
	sectionHeaderColor,
	sectionText,
	children,
	direction,
	textWhite,
	threshold,
}: AboutCardProps) {
	return (
		<SectionHighlight threshold={threshold}>
			<LazyMotion features={domAnimation}>
				<m.div
					initial="offscreen"
					whileInView="onscreen"
					viewport={{ amount: threshold || 1, once: true }}
					className={`grid items-start grid-cols-1 gap-y-10 sm:gap-40 sm:grid-cols-2 ${
						textWhite ? 'text-white' : ''
					}`}
				>
					<m.div variants={cardVariants} className={`flex flex-col ${direction}`}>
						<div className="flex">
							<div className={`w-1 h-auto ${sectionColor}`} />
							<h2 className={`pl-2 text-sm ${textWhite ? 'text-white' : 'text-gray-dark'}`}>
								{sectionTitle}
							</h2>
						</div>
						<h2 className="pl-2 text-2xl sm:text-left">
							<span
								className={`text-transparent bg-gradient-to-br ${sectionHeaderColor} bg-clip-text`}
							>
								{sectionHeader}
							</span>
						</h2>
						<p className="pl-2">{sectionText}</p>
					</m.div>
					<m.div variants={imageVariants}>{children}</m.div>
				</m.div>
			</LazyMotion>
		</SectionHighlight>
	)
}

export default function AboutCards() {
	return (
		<>
			<AboutCard
				sectionColor="bg-red-light"
				sectionTitle="Start your community fund"
				sectionHeader="Donate therapy sessions"
				sectionHeaderColor="to-primary-light from-red-light"
				sectionText="100% of your donation will be used to cover the cost of therapy sessions for your community."
			>
				<DonationAlert />
			</AboutCard>
			<AboutCard
				direction="sm:order-1"
				sectionColor="bg-primary-light"
				sectionTitle="Connect your community to RAD"
				sectionHeader="Our team is here to help"
				sectionHeaderColor="from-primary-light to-secondary-light"
				sectionText="Our mental health professionals will begin seeing members of your community and helping them start therapy."
			>
				<LazyVideo src="https://res.cloudinary.com/df23ubjbb/video/upload/v1642035630/Starttherapy.mp4" />
			</AboutCard>

			<AboutCard
				sectionColor="bg-secondary-light"
				sectionTitle="Fundraise for your community fund"
				sectionHeader="You make healing possible"
				sectionHeaderColor="from-secondary-light to-green-light"
				sectionText="Fundraising is a great way to help us cover more therapy sessions for more members of your community."
			>
				<div className="relative w-full h-full">
					<Image
						src="https://res.cloudinary.com/df23ubjbb/image/upload/v1658007131/PC_1_l14ymk.webp"
						layout="fill"
						objectFit="fill"
						alt=""
						className="z-10"
					/>
					<div className="relative overflow-hidden" aria-hidden>
						<LazyVideo
							classnames="-skew-x-10 skew-y-11"
							src="https://res.cloudinary.com/df23ubjbb/video/upload/v1630889981/RADHighlightTwo.mp4"
						/>
					</div>
				</div>
			</AboutCard>
		</>
	)
}
