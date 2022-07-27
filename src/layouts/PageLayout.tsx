import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('@components/Footer/Footer'), {})
const DynamicNav = dynamic(() => import('@components/Navbar/Navbar'), {})

export default function PageLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
			<DynamicNav />
			<main>{children}</main>
			<DynamicFooter />
		</div>
	)
}
