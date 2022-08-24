import { LazyMotion, domAnimation, m } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

/* PrimaryButton contains a great deal of animations, all of which aid in drawing attention to our call to actions. This button is used for things like donating, sending forms, and otherwise exists at the end point of where we want someone to interact. In previous version of this button, the animation was all done with a lottie file; however, it meant any interaction or changes needed to be made to the animation required a great deal of effort. Here, each part of the animation is independently animated and open to adjustment. */

interface PrimaryButtonProps {
	buttonText: string | undefined
	type: 'button' | 'submit'
	onClick?: (e: React.MouseEvent<HTMLElement>) => void
	disabled?: boolean
	as?: 'button' | 'a'
	size?: 'max-w-sm' | 'max-w-md' | 'max-w-lg' | 'max-w-xl'
}

export default function PrimaryButton({
	buttonText,
	type,
	onClick,
	disabled,
	size,
}: PrimaryButtonProps) {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			type={type}
			className={`relative w-full px-3 py-2 overflow-hidden text-base font-bold transition-all duration-300 ease-linear bg-white border-2 border-black outline-none rounded-xl hover:shadow-none focus-within:shadow-none hover:bg-black hover:text-white shadow-deep focus:bg-green-light disabled:bg-green-light disabled:shadow-none disabled:pointer-events-none focus-within:text-black focus:ring-4 focus:ring-secondary-light ${size}`}
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
