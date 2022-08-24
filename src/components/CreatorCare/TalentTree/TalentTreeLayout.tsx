import { m, LazyMotion, domAnimation } from 'framer-motion'
import StarsBG from '../Stars'
import ChampionTree from './ChampionTree'

export default function TalentTreeLayout() {
	return (
		<>
			<LazyMotion features={domAnimation}>
				<m.div
					className="w-full h-full"
					initial={{ opacity: 0 }}
					whileInView={{
						opacity: 1,
						transition: {
							duration: 1,
						},
					}}
					viewport={{ amount: 0.5 }}
					exit={{ opacity: 0 }}
				>
					<StarsBG />
					<ChampionTree />
				</m.div>
			</LazyMotion>
		</>
	)
}
