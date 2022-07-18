import DiscordLayout from '@components/CreatorCare/Discord/DiscordLayout'
import PageSEO from '@components/SEO/PageSEO'
import LazyVideo from '@components/VideoPlayer'
import SectionGrid from '@layouts/SectionGrid'
import { trpc } from '@libs/trpc'
import { Creator } from '@prisma/client'
import classNames from '@utils/classNames'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

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
		alertRef.current?.addEventListener('ended', function () {
			setAlertVisable(false)
			setTimeout(() => {
				setAlertVisable(true)
				alertRef.current?.play()
			}, 5000)
		})
	})

	return (
		<div className="">
			<PageSEO title="Train" description="Train with Rise Above The Disorder" />
			<section className="grid items-center mt-6 sm:grid-cols-2 sm:mt-10">
				<header>
					<h1 className="">Community Care</h1>
					<h3 className="text-xl text-transparent sm:block bg-gradient-to-b from-gray-dark to-gray bg-clip-text">
						Your favorite creators from across Twitch and YouTube coming together to make therapy
						possible for their community.
					</h3>
				</header>
				<div className="relative w-full h-full">
					<Image
						src="https://res.cloudinary.com/df23ubjbb/image/upload/v1658007131/PC_1_l14ymk.webp"
						layout="fill"
						objectFit="fill"
						alt=""
					/>
					<div className="relative overflow-hidden -z-10" aria-hidden>
						<LazyVideo
							classnames="-skew-x-10 skew-y-12 p-2"
							src="https://res.cloudinary.com/df23ubjbb/video/upload/v1630889981/RADHighlightTwo.mp4"
						/>
					</div>
				</div>
			</section>

			<section className="relative flex flex-col items-center w-full overflow-hidden rounded-xl sm:max-w-xl">
				<div
					ref={ref}
					className={classNames(
						alertcanPlay ? 'visible' : 'opacity-0',
						' duration-700 flex flex-col items-center'
					)}
				>
					<video
						ref={alertRef}
						muted
						autoPlay
						playsInline
						controls={false}
						src="https://res.cloudinary.com/df23ubjbb/video/upload/v1658125586/UG_ZhIRUOH4PxRIQ_dp3bvo.mp4"
						className="w-full"
					/>
					<h2 className="text-center">
						<span className="text-red-dark">Trainwreckstv </span>just donated 12,000 therapy
						sessions.
					</h2>
				</div>
			</section>

			<section className="flex flex-col py-10">
				{/*
				<header className="sticky z-10 block py-10 text-center bg-white -top-1">
					<div role={'directory'}>
						<button onClick={handleBotClick} className="group">
							<span className="relative font-semibold truncate">
								Bot
								<div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-light" />
								<div
									className={`bottom-0 left-0 w-full h-0.5 transition-transform duration-300 ease-linear origin-bottom-right scale-x-0 bg-black group-hover:origin-bottom-left group-hover:scale-x-100 group-focus:origin-bottom-left group-focus:scale-x-100 motion-reduce:transition-none motion-reduce:hover:transform-none `}
								/>
							</span>
						</button>
					</div>
				</header>
					*/}

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
