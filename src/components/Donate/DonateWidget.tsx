import Input from '@components/Input'
import { Form } from '@unform/web'
import { SubmitHandler, FormHandles } from '@unform/core'
import PrimaryButton from '@components/PrimaryButton'
import { useState, useRef } from 'react'

interface DonateWidgetOptions {
  priceString: string
  priceLabel: string
  priceId: number
  message: string
}

type DonationOptions = {
  SetOptions: Array<DonateWidgetOptions>
}

const handleSubmit: SubmitHandler<{ amount: number }> = async (data) => {
  console.log(data)
}

export default function DonateWidget({ SetOptions }: DonationOptions) {
  const formRef = useRef<FormHandles>(null)
  const [currentOption, setCurrentOption] = useState<number>(0)
  const [customAmount, setCustomAmount] = useState<number | undefined>(undefined)
  const [checkoutStage, setCheckoutState] = useState<number>(0)
  const selectedOption = customAmount
    ? {
        priceId: customAmount * 100,
        message: ` will cover ${Math.floor(customAmount / 30)} therapy sessions.`,
      }
    : SetOptions[currentOption]

  return (
    <Form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
      {SetOptions.map((option, index) => (
        <Input
          name={option.priceLabel}
          type="radio"
          radioGroup="donate-options"
          key={option.priceString}
          variant="radio"
          id={option.priceLabel}
          value={option.priceId}
          checked={!customAmount && currentOption === index}
          onChange={() => {
            setCurrentOption(index)
            setCustomAmount(undefined)
            console.log(option.priceString)
          }}
        />
      ))}
      <div className="col-span-2">
        <Input
          variant="number"
          name="custom-amount"
          placeholder="Donate other amount"
          onChange={() => {
            setCustomAmount(formRef.current?.getFieldValue('custom-amount'))
          }}
        />
      </div>
      <p className="col-span-3">
        Your donation of{' '}
        <span className="font-bold">{'$' + (selectedOption.priceId / 100).toFixed(0)}</span>
        {selectedOption.message}
      </p>
      <div className="col-span-full">
        <PrimaryButton buttonText="Donate Now" type="button" onClick={() => setCheckoutState(1)} />
      </div>
    </Form>
  )
}
