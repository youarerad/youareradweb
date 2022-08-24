import classNames from '@utils/classNames'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function DonationAlert() {
	const alertRef = useRef<HTMLVideoElement>(null)
	const [alertVisable, setAlertVisable] = useState(true)
	const { ref, inView } = useInView({
		threshold: 1,
	})

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
	return (
		<div
			ref={ref}
			className="bg-[url('https://res.cloudinary.com/df23ubjbb/image/upload/v1658359463/Frame_5_er9l7p.svg')] bg-no-repeat bg-center bg-contain p-4 aspect-video"
		>
			<div className={classNames(alertVisable ? 'opacity-100' : 'opacity-0', 'duration-500')}>
				<video
					ref={alertRef}
					muted
					autoPlay
					playsInline
					controls={false}
					className="w-1/3 mx-auto lg:mt-4"
					src="https://res.cloudinary.com/df23ubjbb/video/upload/v1658125586/UG_ZhIRUOH4PxRIQ_dp3bvo.mp4"
				/>
				<p className="max-w-sm px-4 mx-auto mt-1 font-bold text-center lg:max-w-md sm:text-xs md:text-lg lg:text-xl">
					<span className="text-red-dark">Trainwreckstv </span>just donated 12,000 therapy sessions.
				</p>
			</div>
		</div>
	)
}
