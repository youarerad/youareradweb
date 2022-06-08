import { useField } from '@unform/core'
import { InputHTMLAttributes, MutableRefObject, useEffect, useRef } from 'react'
import { DonateOptions } from './types'

interface BaseRadioProps {
  name: string
  label?: string
  options: DonateOptions[]
}

type RefInputEl = MutableRefObject<HTMLInputElement[]>
type DonateRadioButtonProps = InputHTMLAttributes<HTMLInputElement> & BaseRadioProps

export default function DonateRadioButton({
  name,
  label,
  options,
  ...rest
}: DonateRadioButtonProps) {
  const inputRefs: RefInputEl = useRef([])
  const { fieldName, registerField, defaultValue, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs,
      getValue: (ref: RefInputEl) => {
        return ref.current?.find((input) => input?.checked)?.value as string
      },
      setValue: (ref: RefInputEl, id: string) => {
        const inputRef = ref.current?.find((ref) => ref.id === id)
        if (inputRef) inputRef.checked = true
      },
      clearValue: (ref: RefInputEl) => {
        const inputRef = ref.current?.find((ref) => ref.checked === true)
        if (inputRef) inputRef.checked = false
      },
    })
  }, [fieldName, registerField])

  return (
    <>
      {options.map((option, index) => (
        <div key={option.priceId} className="relative w-full group rounded-xl">
          <input
            className="w-full sr-only peer"
            type="radio"
            name={option.priceString}
            id={String(option.priceId)}
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref
            }}
            {...rest}
          />
          <label
            htmlFor={fieldName}
            className="relative z-10 flex items-center justify-center w-full p-3 font-bold text-center transition-all duration-100 border-2 cursor-pointer border-gray-light peer-checked:bg-secondary peer-checked:border-secondary peer-checked:text-white peer-checked:shadow-xl peer-checked:drop-shadow-sm rounded-xl  hover:bg-secondary hover:border-secondary hover:text-white"
          >
            {name}
          </label>
        </div>
      ))}
    </>
  )
}
