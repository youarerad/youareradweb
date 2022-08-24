import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	ArcElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import classNames from '@utils/classNames'
import React from 'react'
import { Tab } from '@headlessui/react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: true,
			text: 'Community Care 2022 Data',
		},
	},
}

export default function CCCharts() {
	return (
		<Tab.Group vertical>
			<div className="grid items-center grid-cols-1 sm:grid-cols-4 sm:gap-x-2 lg:gap-x-0">
				<Tab.List className="grid order-2 grid-cols-2 gap-2 mt-10 sm:gap-x-0 sm:flex sm:flex-col sm:space-y-2 sm:order-1 sm:mt-0">
					<TabButton tabHeader="Gender" />
				</Tab.List>
				<Tab.Panels className="order-1 col-span-3 sm:order-2">
					<TabPanel>
						<CCCountryChart />
					</TabPanel>
				</Tab.Panels>
			</div>
		</Tab.Group>
	)
}

export function CCCountryChart() {
	const countrydata = React.useMemo(
		() => ({
			labels: ['United States', 'United Kingdom', 'Canada', 'Brazil', 'Other'],
			datasets: [
				{
					label: '',
					data: [64, 11, 4, 3, 18],
					backgroundColor: ['#96ceb4', '#ffeead', '#d9534f', '#ffad60', '#382cebd'],
				},
			],
		}),
		[]
	)

	return (
		<>
			<Doughnut options={options} datasetIdKey="id" data={countrydata} />
		</>
	)
}

export function TabButton({ tabHeader }: { tabHeader: string }) {
	return (
		<Tab
			className={({ selected }) =>
				classNames(
					selected ? 'bg-secondary text-white border-white' : 'hover:bg-black/10',
					'py-2 px-3 text-base font-bold w-full rounded-xl focus:bg-secondary focus:text-white transition-all duration-300 ease-linear outline-none focus:ring-4 focus:ring-secondary-light text-left border'
				)
			}
		>
			{tabHeader}
		</Tab>
	)
}

export function TabPanel({ children }: { children: React.ReactNode }) {
	return (
		<Tab.Panel>
			<div className="max-w-lg mx-auto lg:max-w-2xl">{children}</div>
		</Tab.Panel>
	)
}
