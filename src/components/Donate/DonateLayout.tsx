import { Tab } from '@headlessui/react'
import classNames from '@utils/classNames'
import { DonationOptions } from './DonateData'
import DonateWidget from './DonateWidget'

export default function DonateLayoutTest() {
  return (
    <div className="flex flex-col w-full max-w-md mx-auto">
      <Tab.Group defaultIndex={1}>
        <Tab.List className="flex w-full mx-auto space-x-4">
          {Object.keys(DonationOptions).map((id) => (
            <Tab
              key={id}
              className={({ selected }) =>
                classNames(
                  selected ? 'text-white border-secondary-light bg-secondary' : '',
                  'relative w-full px-3 py-2 text-base font-bold transition-all duration-300 ease-linear bg-white border-2 border-black hover:bg-secondary-light focus:bg-secondary focus:text-white rounded-xl hover:text-white outline-none'
                )
              }
            >
              {id}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {Object.values(DonationOptions).map((options, id) => (
            <Tab.Panel
              key={id}
              className="px-4 pt-4 pb-6 mt-4 border-2 border-gray-light rounded-xl bg-gray-light bg-opacity-10"
            >
              <DonateWidget SetOptions={options} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
