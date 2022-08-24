import { AnimatePresence, Variants } from 'framer-motion'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import Image from 'next/image'

interface CareCardProps {
	icon: string
	title: string
	text: string
}

const cardVariants: Variants = {
	offscreen: {
		opacity: 0,
	},
	onscreen: {
		opacity: 1,
		transition: {
			type: 'spring',
			bounce: 0.4,
			duration: 0.8,
		},
	},
}

function CareCard({ icon, title, text }: CareCardProps) {
	return (
		<div className="h-[100vh]">
			<LazyMotion features={domAnimation}>
				<m.div
					initial="offscreen"
					whileInView="onscreen"
					viewport={{ amount: 1 }}
					exit={{ opacity: 0, y: -100 }}
					className="container sticky top-1/2 py-[5vh] -translate-y-1/2 max-w-2xl"
				>
					<m.div
						variants={cardVariants}
						className="relative z-30 flex flex-col items-center p-4 rounded-xl"
					>
						<Image src={icon} alt="" width={260} height={260} objectFit="contain" />
						<h3 className="text-2xl">{title}</h3>
						<p className="max-w-xl">{text}</p>
					</m.div>
				</m.div>
			</LazyMotion>
		</div>
	)
}

export default function CareCards() {
	return (
		<AnimatePresence>
			<div className={`relative space-y-60`}>
				<CareCard
					icon="https://res.cloudinary.com/df23ubjbb/image/upload/v1648590578/Health_Potion_2_ehjcqp.webp"
					title="The highest quality mental health care"
					text="We connect members of your community with their perfect therapist. Licensed, vetted, and practicing only scientifically proven methods of therapy."
				/>
				<CareCard
					icon="https://res.cloudinary.com/df23ubjbb/image/upload/v1648588376/Group_3321_akgpfr.webp"
					title="Avalible to anyone, anywhere"
					text="We have helped people start therapy in over 135 countries. Wherever your community members are, we are there to help!"
				/>
				<CareCard
					icon="https://res.cloudinary.com/df23ubjbb/image/upload/v1648591097/Alliance_2_fzx8va.webp"
					title="Free for those unable to afford mental health care."
					text="If someone has insurance or a budget; great, we'll work with that! For anyone in need, your donation helps us cover the cost of therapy."
				/>
			</div>
		</AnimatePresence>
	)
}
