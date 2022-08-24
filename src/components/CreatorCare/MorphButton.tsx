interface MorphButtonProps {
	type: 'button' | 'submit'
	children: React.ReactNode
	disabled?: boolean
}

export default function MorphButton({ type, children, disabled }: MorphButtonProps) {
	return (
		<button
			type={type}
			className="w-full py-2 font-mono uppercase duration-300 border-2 border-transparent rounded-xl hover:bg-primary hover:text-white bg-white text-black outline-none disabled:bg-green disabled:pointer-events-none"
			disabled={disabled}
		>
			{children}
		</button>
	)
}
