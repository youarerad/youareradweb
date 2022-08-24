import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import React from 'react'
import { Tab } from '@headlessui/react'
import classNames from '@utils/classNames'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: true,
			text: 'March 2022 Data',
		},
	},
}

export function CareGenderChart() {
	const gendata = React.useMemo(
		() => ({
			labels: ['Female', 'Male', 'Genderqueer', 'TransMale'],
			datasets: [
				{
					label: '',
					data: [469, 358, 49, 23],
					backgroundColor: ['#96ceb4', '#ffeead', '#d9534f', '#ffad60'],
				},
			],
		}),
		[]
	)

	return (
		<>
			<Bar options={options} datasetIdKey="id" data={gendata} />
		</>
	)
}

export function CareSexualityChart() {
	const sexualitydata = React.useMemo(
		() => ({
			labels: ['Heterosexual', 'Bisexual', 'Pansexual', 'Homosexual'],
			datasets: [
				{
					label: '',
					data: [438, 205, 104, 96],
					backgroundColor: ['#96ceb4', '#ffeead', '#d9534f', '#ffad60'],
				},
			],
		}),
		[]
	)

	return (
		<>
			<Bar options={options} datasetIdKey="id" data={sexualitydata} />
		</>
	)
}

export function CareAgeChart() {
	const agedata = React.useMemo(
		() => ({
			labels: ['25-34', '18-24', '16-17', '12-15'],
			datasets: [
				{
					label: '',
					data: [122, 756, 12, 10],
					backgroundColor: ['#96ceb4', '#ffeead', '#d9534f', '#ffad60'],
				},
			],
		}),
		[]
	)

	return (
		<>
			<Bar options={options} datasetIdKey="id" data={agedata} />
		</>
	)
}

export function CareRaceChart() {
	const racedata = React.useMemo(
		() => ({
			labels: ['White', 'Asian', 'Latinx', 'Black'],
			datasets: [
				{
					label: '',
					data: [488, 187, 109, 68],
					backgroundColor: ['#96ceb4', '#ffeead', '#d9534f', '#ffad60'],
				},
			],
		}),
		[]
	)

	return (
		<>
			<Bar options={options} datasetIdKey="id" data={racedata} />
		</>
	)
}

export function CareCountryChart() {
	const countrydata = React.useMemo(
		() => ({
			labels: ['United States', 'Philippines', 'Canada', 'United Kingdom'],
			datasets: [
				{
					label: '',
					data: [567, 49, 40, 22],
					backgroundColor: ['#96ceb4', '#ffeead', '#d9534f', '#ffad60'],
				},
			],
		}),
		[]
	)

	return (
		<>
			<Bar options={options} datasetIdKey="id" data={countrydata} />
		</>
	)
}

export default function CareCharts() {
	return (
		<Tab.Group vertical>
			<div className="grid items-center grid-cols-1 sm:grid-cols-4 sm:gap-x-2 lg:gap-x-0">
				<Tab.List className="grid order-2 grid-cols-2 gap-2 mt-10 sm:gap-x-0 sm:flex sm:flex-col sm:space-y-2 sm:order-1 sm:mt-0">
					<TabButton tabHeader="Gender" />
					<TabButton tabHeader="Sexuality" />
					<TabButton tabHeader="Race" />
					<TabButton tabHeader="Age Range" />
					<TabButton tabHeader="Country" />
				</Tab.List>
				<Tab.Panels className="order-1 col-span-3 sm:order-2">
					<TabPanel>
						<CareGenderChart />
					</TabPanel>
					<TabPanel>
						<CareSexualityChart />
					</TabPanel>
					<TabPanel>
						<CareRaceChart />
					</TabPanel>
					<TabPanel>
						<CareAgeChart />
					</TabPanel>
					<TabPanel>
						<CareCountryChart />
					</TabPanel>
				</Tab.Panels>
			</div>
		</Tab.Group>
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
