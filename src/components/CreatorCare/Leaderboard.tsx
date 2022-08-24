import { FilterCreators } from 'backend/router/creators/fetchCreators'
import { Tab } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import classNames from '@utils/classNames'

type CreatorProfileProps = {
	creators: Array<FilterCreators>
}

const tabAnim = {
	hide: {
		opacity: 0,
		transition: {
			duration: 0.5,
			ease: 'linear',
			when: 'beforeChildren',
		},
	},
	show: {
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: 'linear',
			when: 'beforeChildren',
		},
	},
}

export default function Leaderboard({ creators }: CreatorProfileProps) {
	const [tabIndex, setTabIndex] = useState(0)

	return (
		<div>
			<Tab.Group vertical selectedIndex={tabIndex} onChange={(index) => setTabIndex(index)}>
				<div className="grid w-full grid-cols-1 sm:grid-cols-2">
					<Tab.List className="p-4">
						<table className="flex flex-col order-1 w-full p-4 shadow-2xl rounded-xl">
							<thead className="sticky z-30 py-2 bg-white -top-4">
								<tr className="flex justify-between px-10 text-lg">
									<th aria-hidden> </th>
									<th>Mental Health Champions</th>
									<th aria-hidden> </th>
								</tr>
							</thead>
							<tbody className="overflow-y-scroll rounded-xl max-h-96">
								{creators.map((creator) => (
									<Tab
										as="tr"
										key={creator.name}
										className={({ selected }) =>
											classNames(
												selected ? 'bg-highlight' : 'hover:bg-secondary-light/10 hover:shadow-xl',
												'flex max-w-xl p-4 rounded-xl group  [&:nth-child(1)>td>div]:border-secondary [&:nth-child(2)>td>div]:border-red [&:nth-child(3)>td>div]:border-primary outline-none relative items-center justify-between'
											)
										}
									>
										<td className="flex w-full h-full space-x-4">
											{creators[0].name === creator.name && (
												<Image
													src="https://res.cloudinary.com/df23ubjbb/image/upload/v1659141750/rank1.webp"
													alt=""
													width={60}
													height={60}
													objectFit="scale-down"
												/>
											)}
											{creators[1].name === creator.name && (
												<Image
													src="https://res.cloudinary.com/df23ubjbb/image/upload/v1659141779/rank2.webp"
													alt=""
													width={60}
													height={60}
													objectFit="scale-down"
												/>
											)}
											{creators[2].name === creator.name && (
												<Image
													src="https://res.cloudinary.com/df23ubjbb/image/upload/v1659141808/rank3.webp"
													alt=""
													width={60}
													height={60}
													objectFit="scale-down"
												/>
											)}

											{creators[0].name != creator.name &&
												creators[1].name != creator.name &&
												creators[2].name != creator.name && (
													<div className="w-[60px] h-[60px]"></div>
												)}

											<div className="relative w-full max-w-[100px] overflow-hidden border-4 rounded-full aspect-square border-gray-light">
												<Image
													src={creator!.profilePhoto!}
													alt=""
													layout="fill"
													objectFit="cover"
													objectPosition="top"
												/>
											</div>
										</td>
										<td className="self-start w-full text-sm font-semibold">
											Sessions Donated
											<span className="block text-xl">
												{creator.therapySessionsTotal?.toLocaleString()}
											</span>
										</td>
									</Tab>
								))}
							</tbody>
						</table>
					</Tab.List>
					{creators.map((creator) => (
						<Tab.Panel key={creator.name} className="px-20 sm:order-2">
							<AnimatePresence exitBeforeEnter>
								<motion.div
									initial="hide"
									animate="show"
									exit="hide"
									variants={tabAnim}
									className="relative overflow-hidden aspect-square rounded-xl"
								>
									<Image
										src={creator!.profilePhoto!}
										layout="fill"
										alt=""
										quality="100"
										objectFit="cover"
										objectPosition="top"
									/>
								</motion.div>
							</AnimatePresence>
						</Tab.Panel>
					))}
				</div>
			</Tab.Group>
		</div>
	)
}
