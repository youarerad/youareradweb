import Input from '@components/Input'
import { useState } from 'react'
import DonateTwitchSub from './DonateTwitchSub'

interface DonateOptions {
  priceString: string
  priceLabel: string
  priceId: number
  message: string
}

type SelectDonateOption = {
  options: Array<DonateOptions>
}

export default function DonationOptions({ options }: SelectDonateOption) {
  const [currentOption, setCurrentOption] = useState<number>(0)
  const [customAmount, setCustomAmount] = useState<number | undefined>(undefined)

  return (
    <div className="grid grid-cols-3 gap-4">
      {options.map((option, index) => (
        <Input
          name={option.priceLabel}
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
        <DonateTwitchSub />
      </div>
    </div>
  )
}
