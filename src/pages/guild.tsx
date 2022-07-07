import dynamic from 'next/dynamic'
import FeatureSection from '@components/FeatureSection'
import HeaderSection from '@components/HeaderSection'
import PageSEO from '@components/SEO/PageSEO'
import Image from 'next/image'

const DonateWidget = dynamic(() => import('@components/Donate/DonateMonthly'), {
	ssr: false,
})

export default function Guild() {
	return (
		<div>
			<PageSEO
				title="RAD Guild"
				description="Founded as a World of Warcraft guild dedicated to covering the cost of mental health care for members, our cause has always centered around our Guild. Become a guild member today and help thousands of people access mental health care all over the world."
			/>
			<section className="flex flex-col mt-10">
				<header>
					<h1 className="text-center">
						Join a community of monthly donors
						<span className="text-transparent bg-gradient-to-r to-secondary from-green bg-clip-text">
							{' '}
							making therapy possible for people around the world.
						</span>
					</h1>
				</header>
				<div className="max-w-md px-4 pt-4 pb-6 mx-auto mt-4 border-2 border-gray-light rounded-xl bg-gray-light bg-opacity-10">
					<DonateWidget />
				</div>
			</section>
			<section>
				<HeaderSection
					headerSubText="Our Guild"
					headerSubTextColor="text-secondary"
					headerText="You can be the reason"
					headerTextHighlight="someone starts therapy."
					headerTextHighlightColor="from-secondary-light to-primary-light"
				/>
				<FeatureSection
					headerText="A 10 year legacy of"
					headerTextHighlight="helping and healing."
					videoSrc="https://res.cloudinary.com/df23ubjbb/video/upload/v1640791445/General%20Media/TheGuildVid.mp4"
				>
					In 2012, our founder took what little was left from his disability check to pay for
					someone&apos;s therapy. Alone, he was able to pay for one therapy session each month.
					<span className="text-primary">
						{' '}
						As a guild member, you helps us cover thousands of therapy sessions for people in need.
					</span>
				</FeatureSection>
				<FeatureSection
					reverse
					headerText="A community of"
					headerTextHighlight="mental health heroes."
					videoSrc="https://res.cloudinary.com/df23ubjbb/video/upload/v1640791977/General%20Media/CommunityVid.mp4"
				>
					We are a community of people who are passionate about mental health, united in our support
					for healing others.
					<span className="text-primary">
						{' '}
						Your guild membership awards you with a unique title in our Discord community, which
						highlights the healing you make possible.
					</span>
				</FeatureSection>
			</section>
			<section className="relative grid justify-between grid-cols-1 gap-10 sm:grid-cols-2">
				<div className="absolute inset-0">
					<div className="relative grid items-center grid-cols-1 px-4 py-20 mx-auto overflow-hidden align-middle sm:grid-cols-2 bg-gradient-to-br from-secondary-light to-primary-light rounded-xl max-w-7xl sm:px-6 lg:px-8">
						<div className="px-4 sm:px-6 lg:px-8 max-w-prose">
							<h2 className="text-white">
								We look forward to seeing you
								<span className="text-transparent bg-highlight bg-clip-text"> in the guild!</span>
							</h2>
						</div>
						<div className="absolute top-0 right-0 hidden sm:w-2/3 translate-x-1/3 sm:flex">
							<Image
								alt="Health Potion"
								width={1920}
								height={1080}
								objectFit="scale-down"
								src="https://res.cloudinary.com/df23ubjbb/image/upload/v1647550690/Rectangle_egecsr.webp"
							/>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
