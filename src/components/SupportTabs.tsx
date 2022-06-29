import Image from 'next/image'
import LazyVideo from './VideoPlayer'
import { Tab } from '@headlessui/react'
import classNames from '@utils/classNames'

interface TabProps {
	tabTitle: string
	tabDescription: string
	tabHeader: string
	tabImage?: string
	tabImageAlt?: string
	tabVideos?: string | undefined
}

type TabData = {
	tabs: Array<TabProps>
	useVideos?: boolean
}

export default function SupportTabs({ tabs, useVideos }: TabData) {
	return (
		<Tab.Group defaultIndex={1}>
			<Tab.List className="flex flex-wrap justify-between px-3 py-2 sm:justify-start sm:space-x-10 bg-black/10 rounded-xl sm:flex-nowrap ">
				{tabs.map((tab) => (
					<Tab
						className={({ selected }) =>
							classNames(
								selected
									? 'text-secondary bg-white'
									: 'hover:text-white hover:bg-white/20 text-white',
								'w-full px-3 py-2 text-sm font-bold  transition-all duration-300 ease-linear rounded-xl outline-none focus:ring-4 focus:ring-green-light'
							)
						}
						key={tab.tabTitle}
						value={tab.tabTitle}
					>
						{tab.tabTitle}
					</Tab>
				))}
			</Tab.List>
			<Tab.Panels>
				{tabs.map((tab) => (
					<Tab.Panel className="p-10 mt-10 bg-white rounded-xl" key={tab.tabDescription}>
						<div className="flex flex-col items-center sm:grid sm:grid-cols-12 sm:gap-x-10 group">
							<div className="sm:col-span-6">
								<h2 className="" key={tab.tabHeader}>
									{tab.tabHeader}
									<span className="text-rad">.</span>
								</h2>
								<p className="mt-2 mb-10">{tab.tabDescription}</p>
							</div>
							<div className="overflow-hidden transition-all duration-300 rounded-xl sm:col-span-6">
								{useVideos ? (
									<LazyVideo key={tab.tabHeader} src={tab.tabVideos} />
								) : (
									<Image
										key={tab.tabHeader}
										// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
										src={tab.tabImage!}
										alt={tab.tabImageAlt}
										width={1920}
										height={1080}
										layout="responsive"
										objectFit="cover"
									/>
								)}
							</div>
						</div>
					</Tab.Panel>
				))}
			</Tab.Panels>
		</Tab.Group>
	)
}
