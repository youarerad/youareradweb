import Link from 'next/link'

/*NavLinks handles the styling and function of both the main navigation links and the mobile navigation links. The onClick is used by the mobile navigation links as a means to close the mobile menu when the page is navigated, as the navigation is otherwise remains open since it's part of the page layout.*/

interface NavLinkProps {
	children: string | React.ReactNode
	href: string
	subItem?: boolean
	onClick?: () => void
}

export default function NavLink({ children, href, subItem, onClick }: NavLinkProps) {
	return (
		<Link href={href} passHref>
			<button
				onClick={onClick}
				className={`relative z-30 p-2 text-sm font-semibold outline-none rounded-xl focus:ring-4 focus:ring-secondary-light hover:bg-black hover:text-white focus-within:text-white focus-within:bg-black ${
					subItem &&
					'items-center flex p-3 text-xl font-bold rounded-md hover:bg-primary-light hover:bg-opacity-20 focus:bg-primary-light focus:bg-opacity-20 w-full'
				}`}
			>
				{children}
			</button>
		</Link>
	)
}
