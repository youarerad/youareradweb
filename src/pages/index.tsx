import Link from 'next/link'
import Image from 'next/image'
import type { NextPage } from 'next'
import StyledLink from '@components/StyledLink'
import dynamic from 'next/dynamic'
import { twitterFundraiserData, twitterTestimonialData } from '@components/Tweet/TweetData'
import { waysToSupport } from '@data/WaysToSupport'
import FeatureSection from '@components/FeatureSection'

const PrimaryButton = dynamic(() => import('@components/PrimaryButton'), { ssr: false })
const Tweet = dynamic(() => import('@components/Tweet'))

const Home: NextPage = () => {
	return (
		<div>
			<section className="mt-10">
				<header>
					<h1>
						Everyone deserves mental health care.{' '}
						<span className="text-rad">We are the non-profit making that possible.</span>
					</h1>
				</header>
				<Link href="/donate">
					<div className="sm:max-w-sm">
						<PrimaryButton type="button" buttonText="Donate Therapy" />
					</div>
				</Link>
			</section>

			<section>
				<header>
					<h2>RAD is on a mission to make mental health care accessible to everyone, everywhere</h2>
					<StyledLink href="/about">Learn more about RAD</StyledLink>
				</header>
				<FeatureSection
					headerText="RAD helps people find their perfect therapist"
					headerTextHighlight="and start healing."
					videoSrc="https://res.cloudinary.com/df23ubjbb/video/upload/v1642035630/Starttherapy.mp4"
				>
					Finding a therapist can be tough<span className="text-red">-</span> especially when
					you&apos;re not feeling well. We&apos;ll work together to find a therapist and get you
					feeling rad.
				</FeatureSection>
				<FeatureSection
					headerText="For those unable to afford mental health care"
					headerTextHighlight="we cover the cost."
					videoSrc="https://res.cloudinary.com/df23ubjbb/video/upload/v1630889981/RADHighlightTwo.mp4"
				>
					Unlimited sessions with fully licensed and vetted mental health professionals, practicing
					empirically researched therapy.
					<span className="font-semibold"> Entirely funded by donations.</span>
				</FeatureSection>
			</section>

			<section className="relative flex px-4 space-y-0 overflow-hidden text-white bg-black shadow-2xl rounded-xl sm:px-6 lg:px-8">
				<div className="absolute inset-0 flex justify-between">
					<div className="w-1/2 bg-black/5"></div>
					<div className="relative hidden w-1/3 sm:flex bg-sunset">
						<Image
							src="https://res.cloudinary.com/df23ubjbb/image/upload/v1648588376/Group_3321_akgpfr.webp"
							alt="A cartoonish style image of the world."
							layout="fill"
							objectFit="contain"
						/>
					</div>
				</div>
				<div className="relative z-30 sm:w-2/3">
					<h2 className="text-white">
						Universal mental health care<span className="text-rad">.</span>
					</h2>
					<div className="mt-2 text-white max-w-prose">
						<h3 className="font-medium text-white">
							The best way to summarize RAD is simply,
							<span className="italic">
								{' '}
								&quot;we are a universal mental health care system.&quot;
							</span>{' '}
							We help people regardless of health insurance or budget, because everyone deserves
							mental health care.
						</h3>
					</div>
					<div className="grid grid-cols-1 gap-10 mt-20 sm:grid-cols-2">
						<h3 className="font-medium text-transparent bg-gradient-to-br from-secondary to-green-light bg-clip-text">
							40k people helped
						</h3>
						<h3 className="font-medium text-transparent rounded-xl bg-gradient-to-br from-secondary to-green-light bg-clip-text">
							135 countries reached
						</h3>
						<h3 className="font-medium text-transparent rounded-xl bg-gradient-to-br from-secondary to-green-light bg-clip-text">
							97% success rate
						</h3>
						<h3 className="font-medium text-transparent rounded-xl bg-gradient-to-br from-secondary to-green-light bg-clip-text">
							$10m total spent
						</h3>
					</div>
				</div>
			</section>

			<section className="flex flex-col py-10">
				<header className="sticky z-10 block py-10 text-center bg-white -top-1">
					<h2>You can be the reason someone starts therapy</h2>
					<StyledLink href="/stream">Create a live stream fundraiser</StyledLink>
				</header>

				<div className="z-0 mx-auto space-y-20">
					<Tweet TwitterPostData={twitterFundraiserData} />
				</div>
			</section>

			<section>
				<header>
					<h2>More ways to support Rise Above The Disorder</h2>
				</header>
				<div className="grid grid-cols-1 gap-10 mx-auto sm:grid-cols-3">
					{waysToSupport.map((options) => (
						<Link key={options.link} href={options.link} passHref>
							<a className="relative flex mx-auto overflow-hidden transition-all duration-300 outline-none group rounded-xl focus:ring-4 focus:ring-secondary-light">
								<Image
									className="z-10 transition-all duration-300 scale-100 group-hover:scale-105 group-focus:scale-105"
									height="240"
									width="320"
									objectFit="cover"
									alt="support rad"
									src={options.bgImage}
								/>
								<h3 className="absolute left-0 z-30 flex items-center justify-center w-full h-20 font-bold text-center text-white bg-black bg-opacity-80 bottom-2">
									{options.linktext}
								</h3>
							</a>
						</Link>
					))}
				</div>
			</section>

			<section className="flex flex-col py-10">
				<header className="sticky z-10 block py-10 text-center bg-white -top-1">
					<h2>Whenever you&apos;re ready, we&apos;re here to help</h2>
					<StyledLink href="/stream">Learn more about therapy with RAD</StyledLink>
				</header>
				<div className="z-0 mx-auto space-y-20">
					<Tweet TwitterPostData={twitterTestimonialData} />
				</div>
			</section>
		</div>
	)
}

export default Home
