import { motion, Variants } from 'framer-motion'
import SectionGrid from '@layouts/SectionGrid'
import Image from 'next/image'

interface FeatureCardProps {
	title: string
	children: React.ReactNode
	image: {
		src: string
		alt: string
	}
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
	},
	onscreen: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.8,
		},
	},
}

export function FeatureCard({ title, children, image }: FeatureCardProps) {
	return (
		<motion.div
			initial="offscreen"
			whileInView="onscreen"
			viewport={{ amount: 1, once: true }}
			className="backdrop-blur-3xl"
		>
			<SectionGrid>
				<motion.div variants={cardVariants}>
					<h3>{title}</h3>
					<p className="font-semibold">{children}</p>
				</motion.div>
				<motion.div variants={imageVariants} className="flex justify-center">
					<Image
						src={image.src}
						alt={image.alt}
						layout="intrinsic"
						width="200"
						height="200"
						objectFit="contain"
					/>
				</motion.div>
			</SectionGrid>
		</motion.div>
	)
}
