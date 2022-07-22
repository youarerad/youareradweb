import Footer from '@components/Footer/Footer'
import Navbar from '@components/Navbar/Navbar'

export default function PageLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
			<Navbar />
			<main>{children}</main>
			<Footer />
		</div>
	)
}
