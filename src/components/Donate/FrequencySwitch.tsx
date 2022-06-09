import { Switch } from '@headlessui/react'

interface FrequencySwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function FrequencySwitch({ checked, onChange }: FrequencySwitchProps) {
  return (
    <Switch.Group>
      <div className="relative flex justify-between w-full overflow-hidden  focus-within:ring-secondary-light rounded-xl py-2 ring-4 ring-offset-1 ring-gray-light font-bold text-lg">
        <Switch.Label
          passive
          className={`${
            !checked ? 'text-white' : 'text-black'
          } w-1/2 text-center transition duration-200 ease-in`}
        >
          Give Once
        </Switch.Label>
        <Switch.Label
          passive
          className={`${
            checked ? 'text-white' : 'text-black'
          } w-1/2 text-center transition duration-200 ease-in`}
        >
          Monthly
        </Switch.Label>
        <Switch
          checked={checked}
          onChange={onChange}
          className="w-full absolute h-full inset-0 outline-none"
        >
          <span
            className={`${
              checked ? 'translate-x-full' : '-translate-x-0'
            } bg-primary absolute h-full w-1/2 inset-0 -z-10 transition duration-200 ease-in-out`}
          ></span>
        </Switch>
      </div>
    </Switch.Group>
  )
}
