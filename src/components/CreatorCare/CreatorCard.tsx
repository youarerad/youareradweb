import { creatorCarePart1 } from '@components/Tweet/TweetData'
import { Creator } from '@prisma/client'
import { motion, LayoutGroup } from 'framer-motion'
import Image from 'next/image'
type CreatorProfileProps = {
	creators: Array<Creator>
}

export default function CreatorCard({ creators }: CreatorProfileProps) {
	return (
		<LayoutGroup>
			<div></div>
		</LayoutGroup>
	)
}
