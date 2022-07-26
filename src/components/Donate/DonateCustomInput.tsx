interface DonateCustomInputProps {
	value: number | undefined
	activeStyle: boolean
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function DonateCustomInput({
	value,
	activeStyle,
	onChange,
}: DonateCustomInputProps) {
	return (
		<div className="col-span-2">
			<div>
				<input
					className={`flex w-full p-3 font-bold duration-100 border-2 outline-none border-gray-light rounded-xl hover:drop-shadow-xl hover:ring-4 focus:ring-4 ring-secondary-light ring-opacity-60 ${
						activeStyle ? 'ring-4 ring-secondary' : ''
					}`}
					type="number"
					id="donateother"
					placeholder="Donate other amount"
					value={value}
					onChange={onChange}
				/>
			</div>
		</div>
	)
}
