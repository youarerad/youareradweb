import { AboutCard } from '../AboutCards'
import DiscordWidget from './DiscordWidget'

export default function DiscordLayout() {
	return (
		<div className="text-white">
			<AboutCard
				sectionColor="bg-green"
				sectionHeader="The easiest way to start therapy"
				textWhite={true}
				sectionHeaderColor="from-green via-green-light to-primary-light"
				sectionText="Coming to Twitch & YouTube soon™"
				sectionTitle="Your dedicated, self-learning bot"
				threshold={0.5}
			>
				<DiscordWidget />
			</AboutCard>
		</div>
	)
}
