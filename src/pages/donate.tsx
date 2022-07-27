import {
	CareAgeChart,
	CareCountryChart,
	CareGenderChart,
	CareRaceChart,
	CareSexualityChart,
} from '@components/CareCharts'
import FeatureSection from '@components/FeatureSection'
import HeaderSection from '@components/HeaderSection'
import dynamic from 'next/dynamic'
import PageSEO from '@components/SEO/PageSEO'
import { Tab } from '@headlessui/react'
import classNames from '@utils/classNames'

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
				<Tab.Group vertical>
					<div className="grid items-center grid-cols-1 sm:grid-cols-4 sm:gap-x-2 lg:gap-x-0">
						<Tab.List className="grid order-2 grid-cols-2 gap-2 mt-10 sm:gap-x-0 sm:flex sm:flex-col sm:space-y-2 sm:order-1 sm:mt-0">
							<TabButton tabHeader="Gender" />
							<TabButton tabHeader="Sexuality" />
							<TabButton tabHeader="Race" />
							<TabButton tabHeader="Age Range" />
							<TabButton tabHeader="Country" />
						</Tab.List>
						<Tab.Panels className="order-1 col-span-3 sm:order-2">
							<TabPanel>
								<CareGenderChart />
							</TabPanel>
							<TabPanel>
								<CareSexualityChart />
							</TabPanel>
							<TabPanel>
								<CareRaceChart />
							</TabPanel>
							<TabPanel>
								<CareAgeChart />
							</TabPanel>
							<TabPanel>
								<CareCountryChart />
							</TabPanel>
						</Tab.Panels>
					</div>
				</Tab.Group>
			</section>
		</div>
	)
}

function TabButton({ tabHeader }: { tabHeader: string }) {
	return (
		<Tab
			className={({ selected }) =>
				classNames(
					selected ? 'bg-secondary text-white border-white' : 'hover:bg-black/10',
					'py-2 px-3 text-base font-bold w-full rounded-xl focus:bg-secondary focus:text-white transition-all duration-300 ease-linear outline-none focus:ring-4 focus:ring-secondary-light text-left border'
				)
			}
		>
			{tabHeader}
		</Tab>
	)
}

function TabPanel({ children }: { children: React.ReactNode }) {
	return (
		<Tab.Panel>
			<div className="max-w-lg mx-auto lg:max-w-2xl">{children}</div>
		</Tab.Panel>
	)
}
