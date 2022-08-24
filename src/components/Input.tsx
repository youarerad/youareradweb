import { InputHTMLAttributes, useEffect, useRef } from 'react'
import classNames from '@utils/classNames'
import { useField } from '@unform/core'

/* Input is a polymorphic component designed to work directly with our unform forms. We've explored several approaches to input and form components, with this approach both being the result of that exploration and simply not wanting to spend more time optimizing. With this current approach, the Input and its state are all managed by unform. Styling here may be better with a module.css approach, especially as much of the styling is the same.  */

interface Props {
	name: string
	label?: string
	variant:
		| 'text'
		| 'textarea'
		| 'radio'
		| 'email'
		| 'number'
		| 'phone'
		| 'zipcode'
		| 'alt-text'
		| 'alt-email'

	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	radioGroup?: string
	checked?: boolean
}
type InputProps = InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & Props

export default function Input({
	name,
	label,
	onChange,
	radioGroup,
	checked,
	...props
}: InputProps) {
	const inputRef = useRef(null)
	const { fieldName, defaultValue, registerField, error, clearError } = useField(name)
	const { variant = 'text', ...rest } = props

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef,
			getValue: (ref) => {
				return ref.current.value
			},
			setValue: (ref, value) => {
				ref.current.value = value
			},
			clearValue: (ref) => {
				ref.current.value = ''
			},
		})
	}, [fieldName, registerField])

	if (variant === 'email') {
		return (
			<div>
				{label && (
					<label className="font-semibold text-gray" htmlFor={fieldName}>
						{label}
					</label>
				)}
				<div className="relative group">
					<input
						id={fieldName}
						ref={inputRef}
						type="email"
						onFocus={clearError}
						disabled={props.disabled}
						defaultValue={defaultValue}
						{...rest}
						className={classNames(
							error ? 'border-red-light' : 'border-gray-light',
							'relative block w-full px-10 py-2 text-black transition-all duration-300 ease-in-out border-2 rounded-xl bg-secondary-light bg-opacity-10 focus-within:bg-white focus-within:shadow-sm hover:bg-white disabled:bg-gray-light disabled:bg-opacity-50 disabled:placeholder-transparent outline-none focus:ring-4 focus:ring-secondary-light'
						)}
					/>
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none select-none">
						<svg
							aria-hidden
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7 text-gray-light"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</div>
				</div>
				{error && <span className="text-sm text-red">{error}</span>}
			</div>
		)
	}

	if (variant === 'radio') {
		return (
			<div className="relative w-full group rounded-xl">
				<input
					className="w-full sr-only peer"
					type="radio"
					name={radioGroup}
					id={fieldName}
					ref={inputRef}
					{...rest}
					checked={checked}
					onChange={onChange}
				/>
				<label
					htmlFor={fieldName}
					className="relative z-10 flex items-center justify-center w-full p-3 font-bold text-center transition-all duration-100 border-2 cursor-pointer border-gray-light peer-checked:bg-secondary peer-checked:border-secondary peer-checked:text-white peer-checked:shadow-xl peer-checked:drop-shadow-sm rounded-xl hover:bg-secondary hover:border-secondary hover:text-white"
				>
					{name}
				</label>
			</div>
		)
	}

	if (variant === 'number') {
		return (
			<input
				className="relative z-10 flex items-center justify-center w-full p-3 font-bold transition-all duration-100 border-2 outline-none cursor-pointer border-gray-light rounded-xl hover:border-secondary"
				type="number"
				id={fieldName}
				ref={inputRef}
				defaultValue={defaultValue}
				{...rest}
				onChange={onChange}
			/>
		)
	}

	if (variant === 'textarea') {
		return (
			<div className="relative group">
				{label && (
					<label className="font-semibold text-gray" htmlFor={fieldName}>
						{label}
					</label>
				)}
				<textarea
					id={fieldName}
					rows={4}
					ref={inputRef}
					onFocus={clearError}
					defaultValue={defaultValue}
					{...rest}
					className={classNames(
						error ? 'border-red-light' : 'border-gray-light',
						'relative block w-full px-3 py-2 text-black transition-all duration-300 ease-in-out border-2 rounded-xl bg-secondary-light bg-opacity-10 focus-within:bg-white focus-within:shadow-sm hover:bg-white disabled:bg-gray-light disabled:bg-opacity-50 disabled:placeholder-transparent outline-none focus:ring-4 focus:ring-secondary-light'
					)}
				/>
				{error && <span className="text-sm text-red">{error}</span>}
			</div>
		)
	}

	if (variant === 'phone') {
		return (
			<div className="relative group">
				{label && (
					<label className="font-semibold text-gray" htmlFor={fieldName}>
						{label}
					</label>
				)}
				<input
					id={fieldName}
					ref={inputRef}
					onFocus={clearError}
					defaultValue={defaultValue}
					type="tel"
					{...rest}
					className={classNames(
						error ? 'border-red-light' : 'border-gray-light',
						'relative block w-full px-3 py-2 text-black transition-all duration-300 ease-in-out border-2 rounded-xl bg-secondary-light bg-opacity-10 focus-within:bg-white focus-within:shadow-sm hover:bg-white disabled:bg-gray-light disabled:bg-opacity-50 disabled:placeholder-transparent outline-none focus:ring-4 focus:ring-secondary-light'
					)}
				/>
				{error && <span className="text-sm text-red">{error}</span>}
			</div>
		)
	}

	if (variant === 'alt-text') {
		return (
			<div className="relative group">
				{label && (
					<label className="font-semibold" htmlFor={fieldName}>
						{label}
					</label>
				)}
				<input
					id={fieldName}
					ref={inputRef}
					onFocus={clearError}
					defaultValue={defaultValue}
					type="text"
					{...rest}
					className={classNames(
						error ? 'border-red-light' : 'border-gray-light',
						'relative block w-full px-3 py-2 transition-all duration-300 ease-in-out border-2 rounded-xl bg-secondary-light bg-opacity-10 focus-within:bg-white focus-within:shadow-sm hover:bg-white disabled:bg-gray-light disabled:bg-opacity-50 disabled:placeholder-transparent outline-none focus:ring-4 focus:ring-secondary-light hover:text-black focus-within:text-black'
					)}
				/>
				{error && <span className="text-sm text-red">{error}</span>}
			</div>
		)
	}

	if (variant === 'alt-email') {
		return (
			<div>
				{label && (
					<label className="font-semibold" htmlFor={fieldName}>
						{label}
					</label>
				)}
				<div className="relative group">
					<input
						id={fieldName}
						ref={inputRef}
						type="email"
						onFocus={clearError}
						disabled={props.disabled}
						defaultValue={defaultValue}
						{...rest}
						className={classNames(
							error ? 'border-red-light' : 'border-gray-light',
							'relative block w-full px-10 py-2 transition-all duration-300 ease-in-out border-2 rounded-xl bg-secondary-light bg-opacity-10 focus-within:bg-white focus-within:shadow-sm hover:bg-white disabled:bg-gray-light disabled:bg-opacity-50 disabled:placeholder-transparent outline-none focus:ring-4 focus:ring-secondary-light hover:text-black focus-within:text-black'
						)}
					/>
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none select-none">
						<svg
							aria-hidden
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7 text-gray-light"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</div>
				</div>
				{error && <span className="text-sm text-red">{error}</span>}
			</div>
		)
	}

	return (
		<div className="relative group">
			{label && (
				<label className="font-semibold text-gray" htmlFor={fieldName}>
					{label}
				</label>
			)}
			<input
				id={fieldName}
				ref={inputRef}
				onFocus={clearError}
				defaultValue={defaultValue}
				type="text"
				{...rest}
				className={classNames(
					error ? 'border-red-light' : 'border-gray-light',
					'relative block w-full px-3 py-2 text-black transition-all duration-300 ease-in-out border-2 rounded-xl bg-secondary-light bg-opacity-10 focus-within:bg-white focus-within:shadow-sm hover:bg-white disabled:bg-gray-light disabled:bg-opacity-50 disabled:placeholder-transparent outline-none focus:ring-4 focus:ring-secondary-light'
				)}
			/>
			{error && <span className="text-sm text-red">{error}</span>}
		</div>
	)
}
