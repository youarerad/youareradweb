interface DonateCustomInputProps {
  value: number | undefined
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function DonateCustomInput({ value, onChange }: DonateCustomInputProps) {
  return (
    <div className="col-span-2">
      <div>
        <input
          className="relative z-10 flex w-full px-3 py-3 mx-auto font-bold text-black transition-all duration-100 border-2 border-gray-lightpeer-checked:border-secondary peer-checked:bg-clip-border peer-checked:shadow-2xl peer-checked:drop-shadow-xl rounded-xl bg-opacity-10 peer-focus:border-secondary hover:drop-shadow-xl hover:border-secondary border-gray-light"
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
