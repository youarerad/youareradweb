import FeatureSection from '@components/FeatureSection'
import HeaderSection from '@components/HeaderSection'
import dynamic from 'next/dynamic'
import PageSEO from '@components/SEO/PageSEO'

const CareCharts = dynamic(() => import('@components/CareCharts'))

const DonateWidget = dynamic(() => import('@components/Donate/DonateLayout'), {
	ssr: false,
})

export default function Doante() {
	return (
		<div>
			<PageSEO
				title="Donate To RAD"
				description="Donate to RAD and help someone start therapy today! Every $30 donated covers a week of therapy for someone in need. Join us in making mental health care possible for everyone, everywhere."
			/>
			<section className="mt-10">
				<header>
					<h1 className="text-center">
						<span className="text-transparent bg-gradient-to-r from-secondary-light to-primary-light bg-clip-text sm:block">
							You can be the reason{' '}
						</span>
						someone starts therapy today.
					</h1>
				</header>
				<DonateWidget />
			</section>
			<section>
				<HeaderSection
					headerSubText="Why Donate"
					headerSubTextColor="text-secondary"
					headerText="Everyone deserves mental health care."
					headerTextHighlight="You can make that possible."
					headerTextHighlightColor="from-secondary-light to-primary-light"
					headerTextHighlightBlock
				/>
				<FeatureSection
					headerText="The cost of therapy shouldn't stop someone from"
					headerTextHighlight="getting help."
					videoSrc="https://res.cloudinary.com/df23ubjbb/video/upload/v1628902398/General%20Media/BBN0%24.mp4"
				>
					Your donation removes one of the greatest barriers to mental health care: affordability.
					When you donate, you cover the cost of someone&apos;s medication or therapy session. You
					make healing possible.
				</FeatureSection>
				<FeatureSection
					headerText="100% of your donation goes to"
					headerTextHighlight="mental health care."
					videoSrc="https://res.cloudinary.com/df23ubjbb/video/upload/v1628974976/General%20Media/FeelsRAD.mp4"
					reverse
				>
					We believe your donation-
					<span className="font-medium"> every cent of it</span>, should go towards covering therapy
					for someone in need. Thanks to our partners, our operations are covered and your donation
					can have the most impact.
				</FeatureSection>
			</section>
			<section>
				<HeaderSection
					headerSubText="Who You Help"
					headerSubTextColor="text-primary"
					headerText="A glimpse into the lives of people"
					headerTextHighlight="supported by your donation."
					headerTextHighlightColor="from-primary to-secondary"
					headerTextHighlightBlock
				/>
				<CareCharts />
			</section>
		</div>
	)
}
