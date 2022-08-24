import { LazyMotion, domAnimation, m } from 'framer-motion'
import { ReactNode } from 'react'

{
	/* SectionHighlight is an ADHD tool used alongside general animation styling. The idea here is to breakdown areas heavy with text by modifying opacity while in/out of view. */
}

interface SectionHighlightProps {
	children: ReactNode
	threshold?: number
}

export default function SectionHighlight({ children, threshold }: SectionHighlightProps) {
	//
	//const prefersReducedMotion = useReducedMotion()
	/* Framer Motion detects if the browser is set to reduced motion, then we disable the animation all together. Not working in Chrome for some reason. */
	//const prefersReducedMotion = useReducedMotion()
	//if (prefersReducedMotion) {
	//return <div>{children}</div>
	//}

	return (
		<LazyMotion features={domAnimation}>
			<m.div
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ amount: threshold || 'all' }}
				initial={{ opacity: 0.2 }}
				exit={{
					opacity: 0.2,
				}}
				transition={{
					duration: 1,
				}}
			>
				{children}
			</m.div>
		</LazyMotion>
	)
}
