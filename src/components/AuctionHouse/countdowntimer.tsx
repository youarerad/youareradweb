import { useEffect, useState } from 'react'

export const Countdown = () => {
	const [auctionEndDate, setAuctionEndDate] = useState(new Date('August 21, 22').getTime())
	const [daysLeft, setDaysLeft] = useState(0)
	const [hoursLeft, setHoursLeft] = useState(0)
	const [minutesLeft, setMinutesLeft] = useState(0)
	const [secondsLeft, setSecondsLeft] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			// Get today's date
			const today = new Date().getTime()

			// Get the difference
			const diff = auctionEndDate - today

			// Calculate
			setDaysLeft(Math.floor(diff / (1000 * 60 * 60 * 24)))
			setHoursLeft(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
			setMinutesLeft(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)))
			setSecondsLeft(Math.floor((diff % (1000 * 60)) / 1000))
		}, 1000)
		return () => clearInterval(interval)
	}, [])

	return (
		<div className="font-semibold text-base">
			{daysLeft}d {hoursLeft}h {minutesLeft}m
		</div>
	)
}
