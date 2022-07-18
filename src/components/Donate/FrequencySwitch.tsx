import { Switch } from '@headlessui/react'

interface FrequencySwitchProps {
	checked: boolean
	onChange: (checked: boolean) => void
}

export default function FrequencySwitch({ checked, onChange }: FrequencySwitchProps) {
	return (
		<Switch.Group>
			<div className="relative flex justify-between w-full py-2 overflow-hidden text-lg font-bold focus-within:ring-secondary-light rounded-xl ring-4 ring-offset-1 ring-gray-light">
				<Switch.Label
					passive
					className={`${
						!checked ? 'text-white' : 'text-black'
					} w-1/2 text-center transition duration-200 ease-in`}
				>
					Give Once
				</Switch.Label>
				<Switch.Label
					passive
					className={`${
						checked ? 'text-white' : 'text-black'
					} w-1/2 text-center transition duration-200 ease-in`}
				>
					Monthly
				</Switch.Label>
				<Switch
					checked={checked}
					onChange={onChange}
					className="absolute inset-0 w-full h-full outline-none"
				>
					<span
						className={`${
							checked ? 'translate-x-full' : '-translate-x-0'
						} bg-primary absolute h-full w-1/2 inset-0 -z-10 transition duration-200 ease-in-out`}
					></span>
				</Switch>
			</div>
		</Switch.Group>
	)
}
