interface RadioButtonProps {
  id: string
  value: string
  checked?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export default function RadioButton({ value, id, checked, onChange, ...rest }: RadioButtonProps) {
  return (
    <div>
      <div className="relative w-full group rounded-xl">
        <input
          className="w-full sr-only peer"
          type="radio"
          name="donation"
          id={id}
          value={value}
          checked={checked}
          onChange={onChange}
          {...rest}
        />
        <label
          htmlFor={id}
          className="relative z-10 flex items-center justify-center w-full p-3 font-bold text-center transition-all duration-100 border-2 cursor-pointer border-gray-light peer-checked:bg-secondary peer-checked:border-secondary peer-checked:text-white peer-checked:shadow-xl peer-checked:drop-shadow-sm rounded-xl  hover:bg-secondary hover:border-secondary hover:text-white"
        >
          {id}
        </label>
      </div>
    </div>
  )
}
