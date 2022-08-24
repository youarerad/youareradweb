import AboutCards from '@components/CreatorCare/AboutCards'
import CareCards from '@components/CreatorCare/CareCards'
import PrimaryButton from '@components/PrimaryButton'
import TweetSlider from '@components/Tweet/TweetSlider'
import FullPageLayout from '@layouts/FullPageLayout.tsx'
import { ReactElement, useEffect, useState } from 'react'
import { NextPageWithLayout } from '../_app'
import { InView } from 'react-intersection-observer'
import Discord from '@components/CreatorCare/Discord'
import ModTraining from '@components/CreatorCare/ModTraining'
import ReverseButton from '@components/CreatorCare/ReverseButton'
import DataBlocks from '@components/CreatorCare/DataBlocks'

const Page: NextPageWithLayout = () => {
	const [backgroundColor, setBackgroundColor] = useState('bg-white')
	const [triggerBackgroundChange, setTriggerBackgroundChange] = useState(false)

	useEffect(() => {
		if (triggerBackgroundChange) {
			setBackgroundColor('bg-black')
		}
		if (!triggerBackgroundChange) setBackgroundColor('bg-white')
	}, [triggerBackgroundChange])

	return (
		<div className={`${backgroundColor} duration-1000`}>
			<section className="px-4 mt-6 text-center sm:grid-cols-2 sm:mt-10 max-w-7xl sm:px-6 lg:px-8">
				<header className="space-y-10">
					<h1 className="">
						Unlock mental health care for
						<span className="text-transparent bg-gradient-to-r from-primary to-secondary-light bg-clip-text sm:block">
							{' '}
							your community
						</span>
					</h1>
					<PrimaryButton buttonText="Get Started" type="button" size="max-w-md" />
				</header>
				<TweetSlider />
			</section>

			<section className="px-4 pt-0 mt-6 sm:grid-cols-2 sm:mt-10 max-w-7xl sm:px-6 lg:px-8">
				<header>
					<h2>
						How to empower your community with{' '}
						<span className="text-transparent sm:block bg-gradient-to-br from-primary-light to-secondary-light bg-clip-text">
							Rise Above The Disorder
						</span>
					</h2>
				</header>
				<div className="space-y-40">
					<AboutCards />
				</div>
			</section>

			<section className="flex flex-col items-center justify-center text-center">
				<header>
					<h2>
						What you unlock for{' '}
						<span className="text-transparent sm:block bg-gradient-to-br from-primary-light to-secondary-light bg-clip-text">
							your community.
						</span>
					</h2>
				</header>
				<div className="pt-[25vh]">
					<CareCards />
				</div>
			</section>
			<InView
				rootMargin="-100px"
				onChange={(inView) =>
					inView ? setTriggerBackgroundChange(true) : setTriggerBackgroundChange(false)
				}
			>
				{({ ref }) => (
					<div ref={ref}>
						<section className="flex flex-col px-4 sm:px-6 lg:px-8 max-w-7xl content">
							<header>
								<h2 className="text-white">
									Level up your community with{' '}
									<span className="text-transparent sm:block bg-gradient-to-br from-primary-light to-red-light bg-clip-text">
										powerful partner perks
									</span>
								</h2>
							</header>
							<Discord />
							<ModTraining />
							<ReverseButton buttonText="Get Started" type="button" />
						</section>

						<section className="flex flex-col px-4 sm:px-6 lg:px-8 max-w-7xl">
							<header>
								<h2 className="text-white">
									Our radical approach to{' '}
									<span className="text-transparent sm:block bg-gradient-to-br from-secondary-light to-primary-light bg-clip-text">
										transparency and privacy
									</span>
								</h2>
							</header>
							<DataBlocks />
						</section>
					</div>
				)}
			</InView>
		</div>
	)
}

Page.getLayout = function getLayout(page: ReactElement) {
	return <FullPageLayout>{page}</FullPageLayout>
}

export default Page
