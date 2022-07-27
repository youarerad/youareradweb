import SectionGrid from '@layouts/SectionGrid'
import SectionHighlight from '@utils/SectionHighlight'
import dynamic from 'next/dynamic'

const Video = dynamic(() => import('@components/VideoPlayer'))

interface FeatureSectionProps {
	children: React.ReactNode
	headerText: string
	headerTextHighlight: string
	reverse?: boolean
	videoSrc: string
}

export default function FeatureSection({
	children,
	headerText,
	headerTextHighlight,
	reverse,
	videoSrc,
}: FeatureSectionProps) {
	return (
		<div>
			<SectionHighlight>
				<SectionGrid>
					<div className={`space-y-2 ${reverse ? 'sm:order-1' : ''}`}>
						<h3>
							{headerText}{' '}
							<span className="text-transparent bg-gradient-to-r from-red-light to-primary-light bg-clip-text">
								{headerTextHighlight}
							</span>
						</h3>
						<p>{children}</p>
					</div>
					<Video src={videoSrc} />
				</SectionGrid>
			</SectionHighlight>
		</div>
	)
}
