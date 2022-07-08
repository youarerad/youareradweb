/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ComponentPropsWithoutRef, ReactNode } from 'react'

interface UnControlledInputProps {
	label?: string
	variant: 'text' | 'textarea'
	value: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
	children?: ReactNode
	name: string
}

export default function UncontrolledInput({
	label,
	value,
	name,
	children,
	onChange,
	...props
}: UnControlledInputProps & ComponentPropsWithoutRef<'input'>) {
	const { variant = 'text' } = props
	if (variant === 'textarea') {
		return (
			<label className="relative font-semibold text-gray">
				{label}
				<textarea
					aria-describedby={label}
					onChange={onChange}
					name={name}
					value={value}
					rows={4}
					className="relative w-full px-3 py-2 text-black transition-all duration-300 ease-in-out border-2 outline-none border-gray-light rounded-xl bg-secondary-light/10 focus-within:bg-white focus-within:shadow-sm hover:bg-white disabled:bg-gray-light disabled:bg-opacity-50 disabled:placeholder-transparent focus:ring-4 focus:ring-secondary-light"
				/>
				{children}
			</label>
		)
	}
	return (
		<label className="font-semibold text-gray">
			{label}
			<input
				aria-describedby={label}
				onChange={onChange}
				placeholder="Logan Woods"
				name={name}
				value={value}
				type="text"
				className="w-full px-3 py-2 text-black transition-all duration-300 ease-in-out border-2 outline-none w border-gray-light rounded-xl bg-secondary-light/10 focus-within:bg-white focus-within:shadow-sm hover:bg-white disabled:bg-gray-light disabled:bg-opacity-50 disabled:placeholder-transparent focus:ring-4 focus:ring-secondary-light"
			/>
		</label>
	)
}
