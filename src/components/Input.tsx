interface InputProps {
  variant: 'text' | 'textarea' | 'radio' | 'email' | 'number'
  id: string | undefined
  value?: string | number | undefined
  label?: string
  radiogroup?: string
  checked?: boolean | undefined
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  disabled?: boolean | undefined
}

export default function Input({
  id,
  value,
  label,
  radiogroup,
  checked,
  onChange,
  disabled,
  ...props
}: InputProps) {
  const { variant = 'textarea', ...rest } = props

  if (variant === 'text') {
    return (
      <label htmlFor={id} className="block space-y-1 group">
        <span className="font-semibold text-gray group-focus-within:text-secondary">{label}</span>
        <input
          id={id}
          type="text"
          autoComplete={label}
          value={value}
          name={id}
          required
          disabled={disabled}
          onChange={onChange}
          className="relative block w-full px-3 py-2 text-black transition-all duration-300 ease-in-out border-2 border-gray-light rounded-xl bg-secondary-light bg-opacity-10 focus-within:bg-white focus-within:shadow-lg hover:bg-white disabled:bg-gray-light disabled:bg-opacity-50 disabled:placeholder-transparent"
        />
      </label>
    )
  }

  if (variant === 'number') {
    return (
      <label htmlFor={id} className="relative block space-y-1">
        <span className="font-semibold text-gray">{label}</span>
        <input
          id={id}
          type="number"
          autoComplete={label}
          value={value}
          name={id}
          required
          disabled={disabled}
          onChange={onChange}
          className="relative block w-full px-3 py-2 text-black transition-all duration-300 ease-in-out border-2 border-gray-light rounded-xl bg-secondary-light bg-opacity-10 focus-within:bg-white focus-within:shadow-lg hover:bg-white disabled:bg-gray-light disabled:bg-opacity-50 disabled:placeholder-transparent"
        />
      </label>
    )
  }

  if (variant === 'email') {
    return (
      <label htmlFor={id} className="relative block space-y-1 group">
        <span className="font-semibold text-gray group-focus-within:text-secondary">{label}</span>
        <div className="relative group">
          <input
            id={id}
            placeholder="Hey@youarerad.org"
            type="email"
            autoComplete="email"
            value={value}
            name={id}
            required
            onChange={onChange}
            disabled={disabled}
            className="relative block w-full px-10 py-2 text-black transition-all duration-300 ease-in-out border-2 border-black rounded-xl bg-secondary-light bg-opacity-10 focus-within:bg-white focus-within:shadow-lg hover:bg-white disabled:bg-gray-light disabled:bg-opacity-50 disabled:placeholder-transparent"
          />
          <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -top-0.5 left-2 h-7 w-7 translate-y-1/3 text-gray-light select-none group-focus:text-gray group-hover:text-gray group-focus-within:text-gray transition-colors duration-300 ease-in-out"
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
      </label>
    )
  }

  if (variant === 'radio') {
    return (
      <div className="relative w-full bg-white group rounded-xl">
        <input
          {...rest}
          id={id}
          checked={checked}
          name={radiogroup}
          type={props.variant}
          className="w-full sr-only peer"
          value={value}
          onChange={onChange}
        />
        <label
          htmlFor={id}
          className="relative z-10 flex items-center justify-center w-full px-3 py-3 mx-auto font-bold text-center text-black align-middle transition-all duration-100 bg-white border-2 cursor-pointer border-gray-light peer-checked:z-0 peer-checked:bg-secondary peer-checked:border-secondary peer-checked:bg-clip-border peer-checked:text-white peer-checked:shadow-2xl peer-checked:drop-shadow-xl rounded-xl bg-opacity-10 peer-focus:border-green hover:drop-shadow-xl hover:bg-secondary hover:text-white hover:border-secondary"
        >
          {label}
        </label>
      </div>
    )
  }

  return (
    <label htmlFor={id} className="relative block space-y-1 group">
      <span className="font-semibold text-gray group-focus-within:text-secondary">{label}</span>
      <div className="relative w-full">
        <textarea
          {...rest}
          id={id}
          rows={4}
          value={value}
          disabled={disabled}
          name={id}
          className="relative block w-full px-3 py-2 text-black transition-all duration-300 ease-in-out border-2 border-gray-light rounded-xl bg-secondary-light bg-opacity-10 focus-within:bg-white focus-within:shadow-lg hover:bg-white disabled:bg-gray-light disabled:bg-opacity-50 disabled:placeholder-transparent"
          onChange={onChange}
        />
      </div>
    </label>
  )
}
