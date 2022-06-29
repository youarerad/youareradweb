import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'

/* StyledLink is our take on GitHub's homepage links. They provide fairly clear indication that they are interactive, with simple animation to show when they're engaged. These links are entirely for internal linking, often only being used to guide visitors to an endpoint. */

const arrowAnimation = {
	initial: {
		scale: 1,
		x: 0,
	},
	hover: {
		x: 4,
		transition: {
			type: 'spring',
		},
	},
}

interface StyledLinkProps {
	href: string
	children: React.ReactNode
}

export default function StyledLink({ href, children }: StyledLinkProps) {
	return (
		<LazyMotion features={domAnimation}>
			<Link href={href} passHref>
				<m.a
					initial="initial"
					whileHover="hover"
					whileFocus="hover"
					className="relative inline-flex items-center space-x-2 text-base outline-none cursor-pointer group focus:ring-4 focus:ring-secondary-light rounded-xl"
				>
					<span className="relative font-semibold truncate">
						{children}
						<div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-light" />
						<div className="bottom-0 left-0 w-full h-0.5 transition-transform duration-300 ease-linear origin-bottom-right scale-x-0 bg-black group-hover:origin-bottom-left group-hover:scale-x-100 group-focus:origin-bottom-left group-focus:scale-x-100 motion-reduce:transition-none motion-reduce:hover:transform-none" />
					</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<m.path
							variants={arrowAnimation}
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M13 7l5 5m0 0l-5 5m5-5H0"
						/>
					</svg>
				</m.a>
			</Link>
		</LazyMotion>
	)
}
