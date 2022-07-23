import { Tab } from '@headlessui/react'
import Image from 'next/image'
import classNames from '@utils/classNames'
import { FilterCreators } from 'backend/router/creators/fetchCreators'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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

export default function CreatorProfile({ creators }: CreatorProfileProps) {
	const [tabIndex, setTabIndex] = useState(0)
	return (
		<Tab.Group vertical selectedIndex={tabIndex} onChange={(index) => setTabIndex(index)}>
			<div className="flex flex-col w-full lg:flex-row">
				<Tab.List className="flex flex-col order-2 w-full lg:w-1/2">
					{creators.map((creator) => (
						<Tab
							key={creator.name}
							className={({ selected }) =>
								classNames(
									selected ? ' text-white bg-primary' : 'hover:bg-gray-light ',
									'rounded-xl outline-none duration-100'
								)
							}
						>
							<table className="flex flex-col justify-between w-full p-4 text-left rounded-xl">
								<tbody>
									<tr className="flex justify-between w-full">
										<th className="text-xs font-medium uppercase">Creator</th>
										<th className="text-xs font-medium uppercase">Therapy Sessions Donated</th>
									</tr>
									<tr className="flex justify-between w-full text-xl font-bold">
										<td>{creator.name}</td>
										<td>{creator.therapySessionsPaid?.toLocaleString()}</td>
									</tr>
								</tbody>
							</table>
						</Tab>
					))}
				</Tab.List>
				{creators.map((creator) => (
					<Tab.Panel key={creator.name} className="flex flex-col items-center mx-auto">
						<div className="relative w-64 overflow-hidden h-96">
							<AnimatePresence exitBeforeEnter>
								<motion.div initial="hide" animate="show" exit="hide" variants={tabAnim}>
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
						</div>
					</Tab.Panel>
				))}
			</div>
		</Tab.Group>
	)
}
