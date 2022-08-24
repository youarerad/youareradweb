import { useRef, useCallback, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

/* VideoPlayer, often importated as LazyVideo with Next/Dynamic, contains both the default function and styling of videos on our site. Leveraging useIsVisable, an intersection observer hook, we check to see if the video is in view, then pause the video when out of view. */

export default function LazyVideo({
	src,
	classnames,
}: {
	src: string | undefined
	classnames?: string | undefined
}) {
	const [inViewRef, inView] = useInView({
		threshold: 0.5,
	})
	const videoRef = useRef<HTMLVideoElement>()

	const setRefs = useCallback(
		(node: HTMLVideoElement) => {
			videoRef.current = node

			inViewRef(node)

			if (node) {
				node.addEventListener('click', function () {
					if (node.paused) {
						node.play()
					} else {
						node.pause()
					}
				})
			}
		},
		[inViewRef]
	)

	useEffect(() => {
		if (!videoRef || !videoRef.current) {
			return
		}
		if (inView) {
			videoRef.current.play()
		} else {
			videoRef.current.pause()
		}
	}, [inView])
	return (
		<video
			autoPlay
			muted
			loop
			playsInline
			controls
			className={`relative aspect-video rounded-xl ${classnames}`}
			ref={setRefs}
		>
			<source src={src} type="video/mp4" />
		</video>
	)
}
