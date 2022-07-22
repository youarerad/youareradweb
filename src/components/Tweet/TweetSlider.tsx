import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { creatorCarePart1, creatorCarePart2 } from './TweetData'
import TweetSlide from '@components/Tweet/TweetSlide'

export default function TweetSlider() {
	const animation = { duration: 30000, easing: (t: number) => t }

	const [refCallback] = useKeenSlider(
		{
			slideChanged() {
				console.log('slide changed')
			},

			loop: true,
			renderMode: 'precision',
			slides: {
				perView: 'auto',
				spacing: 15,
			},
			created(s) {
				s.moveToIdx(2, true, animation)
			},
			updated(s) {
				s.moveToIdx(s.track.details.abs + 1, true, animation)
			},
			animationEnded(s) {
				s.moveToIdx(s.track.details.abs + 1, true, animation)
			},
		},

		[]
	)

	const [refSlideTwo] = useKeenSlider(
		{
			loop: true,
			renderMode: 'precision',
			slides: {
				perView: 'auto',
				spacing: 15,
			},
			created(s) {
				s.moveToIdx(-2, true, animation)
			},
			updated(s) {
				s.moveToIdx(s.track.details.abs - 1, true, animation)
			},
			animationEnded(s) {
				s.moveToIdx(s.track.details.abs - 1, true, animation)
			},
		},

		[]
	)

	return (
		<>
			<div ref={refCallback} className="keen-slider">
				<TweetSlide TwitterPostData={creatorCarePart1} />
			</div>

			<div ref={refSlideTwo} className="keen-slider">
				<TweetSlide TwitterPostData={creatorCarePart2} />
			</div>
		</>
	)
}
