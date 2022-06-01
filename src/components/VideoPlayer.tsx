import useIsVisible from '@utils/hooks/useIsVisable'
import { useRef } from 'react'

export default function LazyVideo({ src }: { src: string | undefined }) {
  const elemRef = useRef<HTMLDivElement>(null)
  const isVisible = useIsVisible(elemRef)
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
