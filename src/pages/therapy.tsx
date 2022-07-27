import HeaderSection from '@components/HeaderSection'
import PageSEO from '@components/SEO/PageSEO'
import PrimaryButton from '@components/PrimaryButton'
import FeatureSection from '@components/FeatureSection'
import SectionHighlight from '@utils/SectionHighlight'
import SectionGrid from '@layouts/SectionGrid'
import Tweet from '@components/Tweet'
import { therapyTweetData } from '@components/Tweet/TweetData'
import TherapyFAQ from '@components/TherapyFaq'

export default function Therapy() {
	return (
		<div>
			<PageSEO
				title="Start Therapy"
				description="Ready to find your perfect therapist? The social workers at Rise Above The Disorder are here to help! Our entirely free service helps you start therapy with a therapist anywhere in the world. If you have healthcare or a budget, we'll work within those. If you're presently unable to afford mental health care, we'll cover the cost."
			/>
			<section className="mt-10">
				<header>
					<h1 className="text-center">
						You deserve to feel well.
						<span className="sm:block">You are worth it.</span>{' '}
						<span className="text-transparent bg-gradient-to-r from-secondary-light to-red-light bg-clip-text">
							You are rad ♡
						</span>
					</h1>
				</header>
			</section>

			<section>
				<HeaderSection
					headerSubText="The Process"
					headerSubTextColor="text-secondary"
					headerText="Ready to start therapy?"
					headerTextHighlightColor="from-secondary-light to-red-light"
					headerTextHighlight="You're just two steps away"
					headerTextHighlightBlock
				/>
				<SectionHighlight>
					<SectionGrid>
						<div className="space-y-2">
							<h3>
								We are here to help.{' '}
								<span className="text-transparent bg-gradient-to-r from-red-light to-primary-light bg-clip-text">
									Tell us what you&apos;re experiencing.
								</span>
							</h3>
							<p>
								The intake form is for you to share more about how you&apos;re feeling and what
								you&apos;d like to work on with RAD. Everything shared is 100% private.
							</p>
						</div>
						<Tweet TwitterPostData={therapyTweetData} />
					</SectionGrid>
				</SectionHighlight>
				<FeatureSection
					headerText="The path forward can seem unclear."
					headerTextHighlight="Let's map it out together."
					videoSrc="https://res.cloudinary.com/df23ubjbb/video/upload/v1642035630/Starttherapy.mp4"
					reverse
				>
					Connect directly with our social workers. We&apos;ll explore your intake and discuss
					finding you the perfect therapist.
				</FeatureSection>
			</section>

			<section className="max-w-lg mx-auto">
				<div>
					<PrimaryButton type="button" buttonText="Temporarily Closed" disabled />
				</div>
			</section>

			<section className="px-4 text-white bg-black rounded-3xl sm:px-6 lg:px-8">
				<header>
					<h2 className="text-center text-white">Frequently asked questions</h2>
				</header>
				<TherapyFAQ />
			</section>
		</div>
	)
}
