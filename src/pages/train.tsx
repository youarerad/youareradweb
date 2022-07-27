import DiscordLayout from '@components/CreatorCare/Discord/DiscordLayout'
import PageSEO from '@components/SEO/PageSEO'
import LazyVideo from '@components/VideoPlayer'
import { trpc } from '@libs/trpc'
import classNames from '@utils/classNames'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import 'keen-slider/keen-slider.min.css'
import TweetSlider from '@components/Tweet/TweetSlider'
import CreatorProfile from '@components/CreatorCare/CreatorProfile'
import { useRouter } from 'next/router'
import SectionLinks from '@components/CreatorCare/SectionLinks'
import { FeatureCard } from '@components/CreatorCare/FeatureCard'
import { FilterCreators } from 'backend/router/creators/fetchCreators'

export default function Train() {
	const [creators, setCreators] = useState<FilterCreators[]>([])
	const [activeLink, setActiveLink] = useState<string>('')
	const updateOption = () => {
		setActiveLink(activeLink)
	}
	const alertRef = useRef<HTMLVideoElement>(null)
	const [alertVisable, setAlertVisable] = useState(true)
	const { status } = trpc.useQuery(['creators.creators'], {
		onSuccess(data) {
			setCreators(data)
			console.log(status)
		},
		staleTime: Infinity,
		refetchOnReconnect: false,
		refetchOnMount: false,
	})
	const botRef = useRef<HTMLDivElement>(null)
	const { ref, inView } = useInView({
		threshold: 0.5,
	})

	const alertcanPlay = alertVisable && inView

	useEffect(() => {
		if (!inView) {
			alertRef.current!.load()
		}
		if (inView)
			alertRef.current?.addEventListener('ended', function () {
				setAlertVisable(false)
				setTimeout(() => {
					setAlertVisable(true)
					alertRef.current?.play()
				}, 3000)
			})
		else {
			alertRef.current?.load()
		}
	}, [inView])

	const setSmoothScroll = (isSmooth: boolean) => {
		document.documentElement.style.scrollBehavior = isSmooth ? 'smooth' : 'auto'
	}

	const router = useRouter()

	useEffect(() => {
		setSmoothScroll(true)
		const handleStart = () => setSmoothScroll(false)
		const handleStop = () => setSmoothScroll(true)

		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleStop)
		router.events.on('routeChangeError', handleStop)

		return () => {
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleStop)
			router.events.off('routeChangeError', handleStop)
		}
	}, [router])

	return (
		<div style={{ scrollBehavior: 'smooth' }}>
			<PageSEO title="Train" description="Train with Rise Above The Disorder" />
			<section className="grid items-center mt-6 sm:grid-cols-2 sm:mt-10">
				<header>
					<h1 className="text-center sm:text-left">Community Care</h1>
					<h3 className="text-xl text-center text-transparent sm:text-left sm:block bg-gradient-to-b from-gray-dark to-gray bg-clip-text">
						Unlock life-saving mental health care for your community.
					</h3>
				</header>
				<div className="relative w-full h-full">
					<Image
						src="https://res.cloudinary.com/df23ubjbb/image/upload/v1658007131/PC_1_l14ymk.webp"
						layout="fill"
						objectFit="fill"
						alt=""
						priority={true}
					/>
					<div className="relative overflow-hidden -z-10" aria-hidden>
						<LazyVideo
							classnames="-skew-x-10 skew-y-12 p-2"
							src="https://res.cloudinary.com/df23ubjbb/video/upload/v1630889981/RADHighlightTwo.mp4"
						/>
					</div>
				</div>
			</section>

			<section className="space-y-0">
				<TweetSlider />
			</section>

			<div className="flex flex-col py-10">
				<nav className="sticky z-10 block bg-white -top-1 drop-shadow-sm">
					<div className="flex py-10 justify-evenly">
						<SectionLinks label="About" href="about" state={updateOption} />
						<SectionLinks label="Join" href="join" state={updateOption} />
						<SectionLinks label="Bot" href="bot" state={updateOption} />
						<SectionLinks label="Transparency" href="transparency" state={updateOption} />
					</div>
				</nav>

				<section
					className="px-4 pb-32 overflow-hidden lg:px-20 bg-gradient-to-b from-secondary-light/40 to-red-light/20 rounded-xl"
					id="about"
				>
					<h2 className="pt-10 text-6xl">
						Empower your community with{' '}
						<span className="text-transparent bg-gradient-to-br from-primary-light to-secondary-light bg-clip-text xl:block">
							Rise Above The Disorder
						</span>
					</h2>

					<FeatureCard
						title="The highest quality mental health care."
						image={{
							src: 'https://res.cloudinary.com/df23ubjbb/image/upload/v1648591097/Alliance_2_fzx8va.webp',
							alt: 'Two hands shaking in agreement',
						}}
					>
						We connect your community with full licensed therapists, practicing only proven methods
						of therapy.
					</FeatureCard>

					<FeatureCard
						title="Avalible to anyone, anywhere."
						image={{
							src: 'https://res.cloudinary.com/df23ubjbb/image/upload/v1648588376/Group_3321_akgpfr.webp',
							alt: 'A mini-globe with a sprawling castle infront of a sunset',
						}}
					>
						We have helped people start therapy in over 135 countries. Wherever your community
						members are, we are there to help!
					</FeatureCard>

					<FeatureCard
						title="Entirely free, thanks to you."
						image={{
							src: 'https://res.cloudinary.com/df23ubjbb/image/upload/v1648590578/Health_Potion_2_ehjcqp.webp',
							alt: 'Two health potions full of life saving liquid',
						}}
					>
						If they have insurance or a budget, we will help them find their perfect therapist at no
						cost. For those who have always wanted to start therapy, but have never been able to
						afford it-
						<span className="font-semibold text-primary">
							{' '}
							100% of your donation will be used to cover therapy sessions.
						</span>
					</FeatureCard>
				</section>

				<section
					id="join"
					ref={ref}
					className={` ${inView ? 'opacity-100' : 'opacity-0 hidden'}, duration-300 relative`}
				>
					<Image
						src="https://res.cloudinary.com/df23ubjbb/image/upload/v1658359463/Frame_5_er9l7p.svg"
						width={2560}
						height={1440}
						objectFit="cover"
						objectPosition="top"
						alt=""
					/>
					<div
						className={classNames(
							alertcanPlay ? 'visible' : 'opacity-0',
							'duration-700 absolute top-24 md:top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full items-center flex flex-col'
						)}
					>
						<video
							ref={alertRef}
							muted
							autoPlay
							playsInline
							controls={false}
							className="max-w-[150px] md:max-w-md lg:max-w-xl mx-auto"
							src="https://res.cloudinary.com/df23ubjbb/video/upload/v1658125586/UG_ZhIRUOH4PxRIQ_dp3bvo.mp4"
						/>
						<h3 className="max-w-xs mt-1 text-lg text-center sm:mt-4 lg:text-3xl lg:max-w-2xl sm:max-w-md">
							<span className="text-red-dark">Trainwreckstv </span>just donated 12,000 therapy
							sessions.
						</h3>
					</div>
				</section>

				<section className="flex justify-between w-full">
					<CreatorProfile creators={creators} />
				</section>

				<section className="flex flex-col" id="bot">
					<div className="grid items-start grid-cols-1 mt-20 gap-y-10 sm:gap-40 sm:grid-cols-2">
						<h2 ref={botRef}>
							Starting therapy?
							<span className="font-mono"> There&apos;s a bot for that.</span>
						</h2>
						<DiscordLayout />
					</div>

					<section id="transparency">
						<div className="h-screen"></div>
					</section>
				</section>

				<section id="faq">
					<div className="h-screen"></div>
				</section>

				<section className="flex flex-col items-center px-10 space-y-4 text-center text-white bg-black sm:space-y-0 sm:flex-row rounded-xl sm:text-left">
					<div className="relative w-full p-20 sm:w-1/4">
						<Image
							src="https://res.cloudinary.com/df23ubjbb/image/upload/v1648590578/Health_Potion_2_ehjcqp.webp"
							alt="a red health potion"
							layout="fill"
							objectFit="scale-down"
						/>
					</div>

					<h2 className="w-full text-white">
						Empower your community with free mental health care.
					</h2>
				</section>
			</div>
		</div>
	)
}
