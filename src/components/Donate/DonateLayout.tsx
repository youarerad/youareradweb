import { useState } from 'react'
import DonateMonthly from './DonateMonthly'
import DonateOnce from './DonateOnce'
import FrequencySwitch from './FrequencySwitch'

export default function DonateLayout() {
  const [toggleMonthly, setToggleMonthly] = useState(true)
  return (
    <div className="flex flex-col w-full max-w-md mx-auto">
      <FrequencySwitch checked={toggleMonthly} onChange={setToggleMonthly} />
      <div className="px-4 pt-4 pb-6 mt-4 border-2 border-gray-light rounded-xl bg-gray-light bg-opacity-10 flex flex-col">
        {toggleMonthly ? <DonateMonthly /> : <DonateOnce />}
      </div>
    </div>
  )
}
