import DiscordLayout from '@components/CreatorCare/Discord/DiscordLayout'
import PageSEO from '@components/SEO/PageSEO'
import LazyVideo from '@components/VideoPlayer'
import { trpc } from '@libs/trpc'
import { Creator } from '@prisma/client'
import classNames from '@utils/classNames'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import 'keen-slider/keen-slider.min.css'
import TweetSlider from '@components/Tweet/TweetSlider'
import { Variants, motion } from 'framer-motion'
import SectionGrid from '@layouts/SectionGrid'

export default function Train() {
	const [creators, setCreators] = useState<Creator[]>([])
	const alertRef = useRef<HTMLVideoElement>(null)
	const [alertVisable, setAlertVisable] = useState(true)
	const { isLoading } = trpc.useQuery(['creators.creators'], {
		onSuccess(data) {
			console.log(data)
			setCreators(data)
		},
		staleTime: Infinity,
		refetchOnReconnect: false,
		refetchOnMount: false,
	})
	const botRef = useRef<HTMLDivElement>(null)
	const handleBotClick = () => {
		botRef.current!.scrollIntoView({ behavior: 'smooth' })
	}
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

	const cardVariants: Variants = {
		offscreen: {
			y: 300,
		},
		onscreen: {
			y: 50,
			transition: {
				type: 'spring',
				bounce: 0.4,
				duration: 0.8,
			},
		},
	}

	return (
		<div className="">
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

			<section className="overflow-hidden">
				<h2 className="text-6xl">
					Empower your community with{' '}
					<span className="text-transparent bg-gradient-to-br from-primary-light to-secondary-light bg-clip-text lg:block">
						Rise Above The Disorder
					</span>
				</h2>
				<motion.div initial="offscreen" whileInView="onscreen" viewport={{ amount: 0.8 }}>
					<motion.div variants={cardVariants}>
						<SectionGrid>
							<div>
								<h3>The highest quality mental health care.</h3>
								<p>
									We connect your community with full licensed therapists, practicing only proven
									methods of therapy.
								</p>
							</div>
						</SectionGrid>
					</motion.div>
				</motion.div>
			</section>

			<section
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
						className="max-w-[200px] md:max-w-md lg:max-w-xl mx-auto"
						src="https://res.cloudinary.com/df23ubjbb/video/upload/v1658125586/UG_ZhIRUOH4PxRIQ_dp3bvo.mp4"
					/>
					<h3 className="mt-4 text-center lg:text-3xl lg:max-w-2xl sm:max-w-md">
						<span className="text-red-dark">Trainwreckstv </span>just donated 12,000 therapy
						sessions.
					</h3>
				</div>
			</section>

			<section className="flex flex-col py-10">
				<div className="grid grid-cols-1 mx-auto md:grid-cols-2">
					<h2 ref={botRef}>
						Starting therapy?
						<span> There&apos;s a bot for that.</span>
					</h2>
					<DiscordLayout />
				</div>

				<section>
					<div className="h-screen"></div>
				</section>
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

				<h2 className="w-full text-white">Empower your community with free mental health care.</h2>
			</section>
		</div>
	)
}
