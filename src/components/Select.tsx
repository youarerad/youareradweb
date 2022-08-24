import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

interface SelectOptions {
	label: string
}

type SelectProps = {
	ariaLabel?: string
	options: Array<SelectOptions>
	disabled?: boolean
	state: Dispatch<SetStateAction<string>>
}

export default function Select({ ariaLabel, options, disabled, state }: SelectProps) {
	const [selected, setSelected] = useState(options[0].label)

	useEffect(() => {
		state(selected)
	})

	return (
		<div className="relative space-y-1 group">
			<span className="font-semibold group-focus-within:text-secondary ">{ariaLabel}</span>
			<Listbox value={selected} onChange={setSelected} disabled={disabled}>
				<Listbox.Button
					className={({ open }) =>
						`relative w-full px-3 py-2 border-2 bg-white-light rounded-xl border-gray-light 
            focus:ring-4 focus:ring-secondary-light
            disabled:select-none disabled:bg-gray-light disabled:bg-opacity-50 disabled:placeholder-transparent focus-within:border-secondary flex items-center ${
							open ? 'border-secondary-light' : 'border-gray-light'
						}`
					}
				>
					<span className="block truncate min-w-[130px] text-left">{selected}</span>
					<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7 text-gray-light group-focus:text-gray group-hover:text-gray"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8 9l4-4 4 4m0 6l-4 4-4-4"
							/>
						</svg>
					</span>
				</Listbox.Button>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Listbox.Options className="absolute z-10 w-full overflow-auto text-sm bg-white border-2 divide-y-2 shadow-lg outline-none appearance-none rounded-xl max-h-60 border-gray-light divide-gray-light focus:ring-4 focus:ring-secondary-light">
						{options.map((option) => (
							<Listbox.Option
								key={option.label}
								defaultValue={option.label[1]}
								className={({ active }) =>
									`cursor-default select-none relative py-2 pl-10 pr-4 ${
										active ? 'text-secondary bg-secondary-light bg-opacity-10' : 'text-gray'
									}`
								}
								value={option.label}
							>
								{({ selected }) => (
									<>
										{selected ? (
											<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-dark">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="w-5 h-5"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M5 13l4 4L19 7"
													/>
												</svg>
											</span>
										) : null}
										<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
											{option.label}
										</span>
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</Listbox>
		</div>
	)
}
