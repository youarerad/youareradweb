import { useState } from 'react'
import Talent from './Talent'

export default function ChampionTree() {
	const [firstActive, setFirstActive] = useState(false)
	const [cfActive, setCfActive] = useState(false)
	const [modActive, setModActive] = useState(false)
	const [botActive, setBotActive] = useState(false)

	return (
		<div className="border-4 border-gray-light rounded-xl min-h-[60vh] p-4 bg-[url('https://res.cloudinary.com/df23ubjbb/image/upload/v1659549831/End_Slide_kihkaq.webp')] bg-cover bg-no-repeat bg-right bg-black w-full max-w-lg mx-auto flex flex-col items-center justify-center bg-blend-overlay">
			<Talent
				icon="https://res.cloudinary.com/df23ubjbb/image/upload/v1659546587/Heart_a5dlhc.webp"
				name="Donate A Therapy Session"
				state={firstActive}
				onClick={() => {
					setFirstActive(!firstActive)
					{
						setCfActive(false)
						setModActive(false)
						setBotActive(false)
					}
				}}
				description="Cover your first therapy session for someone in your community."
			/>
			<div
				className={`w-1 h-12  ${
					firstActive
						? 'grayscale-0 bg-gradient-to-b from-[#d1af0a]/40 via-[#d1af0a] to-[#d1af0a]/40'
						: 'grayscale bg-gray'
				}`}
			/>
			<Talent
				icon="https://res.cloudinary.com/df23ubjbb/image/upload/v1647981700/Treasure_thmhac.webp"
				name="Community Fund"
				state={cfActive}
				onClick={() => {
					firstActive ? (setCfActive(!cfActive), setModActive(false), setBotActive(false)) : null
				}}
				requirement="Donate 100 therapy sessions"
				description="Start your own fund and provide free mental health care to your community."
			/>
			<div
				className={`w-1 h-12  ${
					cfActive
						? 'grayscale-0 bg-gradient-to-b from-[#d1af0a]/40 via-[#d1af0a] to-[#d1af0a]/40'
						: 'grayscale bg-gray'
				}`}
			/>
			<Talent
				icon="https://res.cloudinary.com/df23ubjbb/image/upload/v1648591097/Alliance_2_fzx8va.webp"
				name="Community Fund"
				state={modActive}
				onClick={() => {
					cfActive ? (setModActive(!modActive), setBotActive(false)) : null
				}}
				requirement="Donate 100 therapy sessions"
				description="Start your own fund and provide free mental health care to your community."
			/>
			<div
				className={`w-1 h-12  ${
					botActive
						? 'grayscale-0 bg-gradient-to-b from-[#d1af0a]/40 via-[#d1af0a] to-[#d1af0a]/40'
						: 'grayscale bg-gray'
				}`}
			/>
			<Talent
				icon="https://res.cloudinary.com/df23ubjbb/image/upload/v1659984128/discordbot.webp"
				name="Community Fund"
				state={botActive}
				onClick={() => {
					modActive ? setBotActive(!botActive) : null
				}}
				requirement="Donate 100 therapy sessions"
				description="Start your own fund and provide free mental health care to your community."
			/>
		</div>
	)
}
