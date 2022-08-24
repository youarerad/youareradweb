import Image from 'next/image'

export default function DataBlocks() {
	return (
		<div className="grid grid-cols-1 gap-10 sm:grid-cols-3 auto-cols-auto xl:grid-cols-4">
			{DataBlockInformation.map((data) => (
				<DataBlock
					key={data.title}
					icon={data.icon}
					title={data.title}
					description={data.description}
				/>
			))}
		</div>
	)
}

interface DataBlockProps {
	icon: string
	title: string
	description: React.ReactNode | string
}

export function DataBlock({ icon, title, description }: DataBlockProps) {
	return (
		<div className="p-4 text-white shadow-sm bg-gray/40 shadow-gray rounded-xl">
			<Image src={icon} width={40} height={40} alt="" />
			<h4>{title}</h4>
			<p>{description}</p>
		</div>
	)
}

const DataBlockInformation = [
	{
		icon: '/icons/Hipaa.svg',
		title: 'HIPAA Protected',
		description:
			'Information your community members share with RAD is legally protected and always confidential.',
	},
	{
		icon: '/icons/ID.svg',
		title: 'Secure Data Handling',
		description:
			'Clinical data is securely stored, encrypted, and requires 2FA from an approved login location for our staff to access.',
	},
	{
		icon: '/icons/Chart.svg',
		title: 'Anonymized Analytics',
		description: (
			<>
				Analytical data is collected via{' '}
				<span>
					<a
						className="text-primary-light"
						href="https://usefathom.com/"
						target="_blank"
						rel="noreferrer"
					>
						Fathom
					</a>
				</span>{' '}
				and the anonymized demographic data is only used for program transparency.
			</>
		),
	},
	{
		icon: '/icons/Cash.svg',
		title: 'Spending Audits',
		description:
			'Everything from our staff salaries to program spending is audited, made public, and available for everyone to see.',
	},
]
