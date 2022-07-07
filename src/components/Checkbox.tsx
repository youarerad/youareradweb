import { ChangeEventHandler, ComponentPropsWithoutRef } from 'react'

interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {
	onChange: ChangeEventHandler<HTMLInputElement>
	label: string
}

export default function Checkbox({ onChange, label }: CheckboxProps) {
	return (
		<label className="inline-flex items-center text-sm font-semibold text-gray">
			<input className="w-4 h-4 border-gray" type="checkbox" onChange={onChange} />
			<span className="pl-2">{label}</span>
		</label>
	)
}
