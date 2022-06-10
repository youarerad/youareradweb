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
}

export default function AppRadioGroup({ value, onChange, options, ...rest }: RadioButtonProps) {
  return (
    <RadioGroup value={value} onChange={onChange} {...rest}>
      {options.map((option) => (
        <>
          <RadioGroup.Label className="sr-only">{option.label}</RadioGroup.Label>
          <RadioGroup.Option
            value={option.value}
            className={({ active, checked }) =>
              classNames(
                active ? 'ring-4 ring-secondary-light ring-opacity-60' : '',
                checked ? 'bg-secondary border-secondary text-white shadow-xl ' : '',
                'relative flex items-center justify-center w-full p-3 font-bold text-center transition-all duration-100 border-2 cursor-pointer border-gray-light rounded-xl  hover:bg-secondary hover:border-secondary hover:text-white focus:outline-none '
              )
            }
          >
            {option.label}
          </RadioGroup.Option>
        </>
      ))}
    </RadioGroup>
  )
}
