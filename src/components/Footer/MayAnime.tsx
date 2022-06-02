import { LazyMotion, domAnimation, m } from 'framer-motion'

import Image from 'next/image'

export default function May() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        animate={{ y: [40, 0, 40] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          type: 'spring',
          mass: 2,
          stiffness: 10,
          bounce: 1,
        }}
        className="relative mx-auto h-80 sm:h-96"
      >
        <Image
          loading="lazy"
          className="z-0 select-none"
          src="https://res.cloudinary.com/df23ubjbb/image/upload/v1648076715/May.webp"
          alt="May, the spirit of wellness"
          layout="fill"
          objectFit="scale-down"
        />
      </m.div>
    </LazyMotion>
  )
}
