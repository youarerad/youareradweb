import { teamData } from '@data/radTeamData'
import Image from 'next/image'

export default function TeamSalaryTable() {
	return (
		<div className="min-w-full overflow-scroll align-middle border-2 shadow-xl border-gray-light rounded-xl h-96">
			<table className="min-w-full divide-y divide-gray-light ">
				<thead className="bg-opacity-20 bg-gray-light">
					<tr>
						<th scope="col" className="px-6 py-3 text-xs tracking-wider text-left text-gray-dark">
							Name
						</th>
						<th scope="col" className="px-6 py-3 text-xs tracking-wider text-left text-gray-dark">
							Title
						</th>
						<th scope="col" className="px-6 py-3 text-xs tracking-wider text-left text-gray-dark">
							Salary
						</th>
					</tr>
				</thead>
				<tbody className="overflow-x-scroll divide-y divide-gray-light">
					{teamData.map((team) => (
						<tr key={team.name}>
							<td className="px-6 py-4 whitespace-nowrap">
								<div className="flex items-center space-x-2">
									<div className="relative w-8 h-8 overflow-hidden rounded-full">
										<Image src={team.picture} alt={team.name} objectFit="cover" layout="fill" />
									</div>
									<p className="text-xs lead">{team.name}</p>
								</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap">{team.title}</td>
							<td className="px-6 py-4 whitespace-nowrap">{team.salary}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
