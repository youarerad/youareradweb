export default function SectionGrid({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid items-center grid-cols-1 mt-20 gap-y-10 sm:gap-40 sm:grid-cols-2">
			{children}
		</div>
	)
}
