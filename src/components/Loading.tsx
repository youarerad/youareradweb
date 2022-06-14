import { motion } from 'framer-motion'

const loadingCircle = {
  display: 'inline-block',
}

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const loadingCircleVariants = {
  start: {
    y: '10%',
  },
  end: {
    y: '0%',
  },
}

const loadingCircleTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: 'easeInOut',
}

interface LoadingProps {
  text: string
}

export default function Loading({ text }: LoadingProps) {
  return (
    <motion.h2 variants={loadingContainerVariants} initial="start" animate="end">
      {text}
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      >
        .
      </motion.span>
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      >
        .
      </motion.span>
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      >
        .
      </motion.span>
    </motion.h2>
  )
}
