import { RadioGroup } from '@headlessui/react'
import classNames from '@utils/classNames'

interface RadioOption {
	label: string
	value: number
}

interface RadioButtonProps {
	value: number
	onChange: (value: number) => void
	options: RadioOption[]
	className: string
	disabled?: boolean
}

export default function AppRadioGroup({
	value,
	onChange,
	options,
	disabled,
	...rest
}: RadioButtonProps) {
	return (
		<RadioGroup value={value} onChange={onChange} disabled={disabled} {...rest}>
			{options.map((option) => (
				<div key={option.value}>
					<RadioGroup.Label key={option.value} className="sr-only">
						{option.label}
					</RadioGroup.Label>
					<RadioGroup.Option
						value={option.value}
						className={({ active, checked, disabled }) =>
							classNames(
								active ? 'ring-4 ring-secondary-light ring-opacity-60' : '',
								checked ? 'bg-secondary border-secondary text-white shadow-xl ' : '',
								disabled
									? 'opacity-75'
									: 'opacity-100 hover:bg-secondary hover:border-secondary hover:text-white',
								'relative flex items-center justify-center w-full p-3 font-bold text-center transition-all duration-100 border-2 cursor-pointer border-gray-light rounded-xl focus:outline-none select-none'
							)
						}
					>
						{option.label}
					</RadioGroup.Option>
				</div>
			))}
		</RadioGroup>
	)
}
