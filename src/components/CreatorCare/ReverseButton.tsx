import { LazyMotion, domAnimation, m } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

interface ReverseButtonProps {
	buttonText: string | undefined
	type: 'button' | 'submit'
	onClick?: (e: React.MouseEvent<HTMLElement>) => void
	disabled?: boolean
}

export default function ReverseButton({ buttonText, type, onClick, disabled }: ReverseButtonProps) {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			type={type}
			className="relative max-w-md w-full px-3 py-2 mx-auto overflow-hidden text-base font-bold transition-all duration-300 ease-linear bg-white border-2 border-transparent outline-none rounded-xl hover:bg-primary hover:text-white focus:bg-primary focus:ring-4 focus:ring-secondary-light text-black focus:text-white"
		>
			<LazyMotion features={domAnimation}>
				<m.div
					aria-hidden
					className="absolute z-0 w-12 h-12 left-5 -top-4"
					animate={{ y: [70, -200], rotate: [45, -20, 40] }}
					transition={{ duration: 15, repeat: Infinity, type: 'spring' }}
				>
					<Image src="/air/Bubble1.webp" alt="" layout="fill" />
				</m.div>
				<m.div
					aria-hidden
					className="absolute top-0 z-0 w-16 h-20 left-4"
					animate={{ y: [100, -100], rotate: [0, -45, 40] }}
					transition={{ duration: 10, repeat: Infinity, type: 'spring' }}
				>
					<Image src="/air/Leaf2.svg" alt="" layout="fill" />
				</m.div>
				<m.div
					aria-hidden
					className="absolute top-0 z-0 w-20 h-10 left-15"
					animate={{ y: [100, -200] }}
					transition={{ duration: 15, repeat: Infinity, type: 'spring' }}
				>
					<Image src="/air/Bubble2.webp" alt="" layout="fill" />
				</m.div>
				<m.div
					aria-hidden
					className="absolute top-0 z-0 w-12 right-2 h-14"
					animate={{ y: [100, -100], x: [-100, 0, 100], rotate: [0, -10, 40] }}
					transition={{ duration: 14, repeat: Infinity, type: 'tween', ease: 'backOut' }}
				>
					<Image src="/air/Bubble3.webp" alt="" layout="fill" />
				</m.div>
				<m.div
					aria-hidden
					className="absolute top-0 z-0 w-16 h-5 left-40"
					animate={{ y: [100, -100], rotate: [0, -40, 0] }}
					transition={{ duration: 12, repeat: Infinity, type: 'spring' }}
				>
					<Image src="/air/Leaf3.svg" alt="" layout="fill" />
				</m.div>
				<m.div
					aria-hidden
					className="absolute z-0 w-10 h-5 -top-4 right-40"
					animate={{ y: [100, -100] }}
					transition={{ duration: 10, repeat: Infinity, type: 'spring' }}
				>
					<Image src="/air/Bubble4.webp" alt="" layout="fill" />
				</m.div>
				<m.div
					aria-hidden
					className="absolute top-0 z-0 w-16 h-10 right-20"
					animate={{ y: [100, -100], rotate: [0, -40, 0], x: [0, 100] }}
					transition={{ duration: 17, repeat: Infinity, type: 'spring' }}
				>
					<Image src="/air/Leaf4.svg" alt="" layout="fill" />
				</m.div>
				<m.div
					aria-hidden
					className="absolute top-0 z-0 h-20 right-4 w-14"
					animate={{ y: [100, -100], rotate: [0, -45, 60] }}
					transition={{ duration: 14, repeat: Infinity, type: 'spring' }}
				>
					<Image src="/air/Leaf1.svg" alt="" layout="fill" />
				</m.div>
				{buttonText}
			</LazyMotion>
		</button>
	)
}
