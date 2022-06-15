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
