import Input from '@components/Input'
import { Variants, motion } from 'framer-motion'
import AuthButton from './AuthButton'
import MorphButton from './MorphButton'

export const SignupStepOne = () => {
	return <AuthButton key="auth" />
}

export const SignupStepTwo = ({
	buttonText,
	disabled,
}: {
	buttonText: string
	disabled: boolean
}) => {
	const container: Variants = {
		hidden: {
			opacity: 0,
		},
		show: {
			opacity: 1,
			scale: 1,
			transformOrigin: 'center',
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.3,
				delayChildren: 0.3,
				duration: 0.8,
			},
		},
	}

	const itemA = {
		hidden: { scaleX: 1, scaleY: 1.1 },
		show: {
			scaleX: 0,
			transformOrigin: 'right',
			transition: {
				duration: 0.8,
			},
		},
	}

	return (
		<motion.div
			key="form"
			variants={container}
			initial="hidden"
			animate="show"
			className="space-y-4"
		>
			<div className="relative">
				<Input disabled={disabled} name="discord" variant="alt-text" label="Discord:" />
				<motion.div
					variants={itemA}
					className="absolute inset-0 h-full w-full bg-black"
				></motion.div>
			</div>
			<div className="relative">
				<Input disabled={disabled} name="email" variant="alt-email" label="Email:" />
				<motion.div
					variants={itemA}
					className="absolute inset-0 h-full w-full bg-black"
				></motion.div>
			</div>
			<div className="relative">
				<Input disabled={disabled} name="twitter" variant="alt-text" label="Twitter Page:" />
				<motion.div
					variants={itemA}
					className="absolute inset-0 h-full w-full bg-black"
				></motion.div>
			</div>
			<div className="relative">
				<Input
					disabled={disabled}
					name="platform"
					variant="alt-text"
					label="Twitch/YouTube Channel:"
				/>
				<motion.div
					variants={itemA}
					className="absolute inset-0 h-full w-full bg-black"
				></motion.div>
			</div>

			<div className="pt-4">
				<MorphButton type="submit" disabled={disabled}>
					{buttonText}
				</MorphButton>
			</div>
		</motion.div>
	)
}

export const SignupStepThree = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.8 } }}
			className="bg-black p-10 space-y-4"
		>
			<h2 className="text-white text-2xl">Thank you for signing up!</h2>
			<h3 className="text-white font-semibold text-base">Next Steps:</h3>
			<p>
				Our team will reach out to you via Discord. If you don&apos;t receive a response, please
				contact us at{' '}
				<a className="text-primary-light" href="mailto:hey@youarerad.org">
					hey@youarerad.org
				</a>
				.
			</p>
		</motion.div>
	)
}
