import { DiversityData, GenderData } from '@data/radTeamData'
import { PieChart } from 'react-minimal-pie-chart'

export default function TeamDiversityChart() {
	return (
		<div className="relative flex flex-col items-center justify-between p-10 mx-auto mt-10 space-y-10 border-2 sm:flex-row sm:space-y-0 rounded-xl border-gray-light">
			<div className="flex flex-col w-full sm:w-1/3">
				<div className="flex mx-auto space-x-1">
					{DiversityData.map((labels) => (
						<div key={labels.title} className="inline-flex flex-col">
							<p
								style={{
									fontSize: '8px',
									fontWeight: 'bold',
								}}
							>
								{labels.title}
							</p>
							<div
								style={{
									background: `${labels.color}`,
								}}
								className="w-full h-2"
							/>
						</div>
					))}
				</div>

				<PieChart
					label={({ x, y, dx, dy, dataEntry }) => (
						<text
							x={x}
							y={y}
							dx={dx}
							dy={dy}
							style={{
								fontSize: '8px',
								fontFamily: 'sans-serif',
							}}
							dominantBaseline="central"
							textAnchor="middle"
						>
							{dataEntry.value}
						</text>
					)}
					data={DiversityData}
					labelStyle={() => ({
						fontSize: '8px',
						fontFamily: 'sans-serif',
					})}
					radius={40}
					lengthAngle={360}
					animate
					labelPosition={70}
				/>
			</div>
			<div className="flex flex-col w-full align-middle sm:w-1/3">
				<div className="flex mx-auto space-x-4">
					{GenderData.map((labels) => (
						<div key={labels.title} className="inline-flex flex-col mx-auto">
							<p
								style={{
									fontSize: '8px',
									fontWeight: 'bold',
								}}
							>
								{labels.title}
							</p>
							<div
								style={{
									background: `${labels.color}`,
								}}
								className="w-full h-2"
							/>
						</div>
					))}
				</div>

				<PieChart
					label={({ x, y, dx, dy, dataEntry }) => (
						<text
							x={x}
							y={y}
							dx={dx}
							dy={dy}
							style={{
								fontSize: '5px',
								fontFamily: 'sans-serif',
							}}
							dominantBaseline="central"
							textAnchor="middle"
						>
							{dataEntry.value}
						</text>
					)}
					data={GenderData}
					labelStyle={() => ({
						fontSize: '5px',
						fontFamily: 'sans-serif',
					})}
					radius={40}
					lengthAngle={360}
					animate
					labelPosition={70}
				/>
			</div>
		</div>
	)
}
