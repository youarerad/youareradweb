import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('@components/Footer/Footer'), {})
const DynamicNav = dynamic(() => import('@components/Navbar/Navbar'), {})

export default function FullPageLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<DynamicNav />
			</div>
			<main>{children}</main>
			<DynamicFooter />
		</>
	)
}
