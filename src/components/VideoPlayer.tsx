import useIsVisible from '@utils/hooks/useIsVisable'
import { useEffect, useRef } from 'react'

/* VideoPlayer, often importated as LazyVideo with Next/Dynamic, contains both the default function and styling of videos on our site. Leveraging useIsVisable, an intersection observer hook, we check to see if the video is in view, then pause the video when out of view. */

export default function LazyVideo({ src }: { src: string | undefined }) {
	const elemRef = useRef<HTMLDivElement>(null)
	const isVisible = useIsVisible(elemRef)

	useEffect(() => {
		const video = elemRef.current?.querySelector('video')
		if (isVisible) {
			video?.play()
		} else {
			video?.pause()
		}
	})

	return (
		<video
			autoPlay
			muted
			loop
			playsInline
			controls
			className="relative aspect-video rounded-xl"
			src={src}
		>
			{isVisible}
		</video>
	)
}
