import Input from '@components/Input'
import { useState } from 'react'
import DonateRadioOptions from './DonateRadioOptions'
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
      <DonateRadioOptions name="priceId" options={options} />
      <div className="col-span-2">
        <DonateTwitchSub />
      </div>
    </div>
  )
}
