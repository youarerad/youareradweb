import { motion } from 'framer-motion'

/* FooterIcons may need a rename at some point to be more specific, as there are social media icons displayed in the footer that are not contained here. This file contains both Twitch & Discord icons, which were animated for fun to bring a small easter egg to the site. For further performance efforts, the motion.svg's could be convereted to LazyMotion wrapping m.svg. */

export function TwitchIcon() {
  return (
    <motion.svg
      width="70"
      height="80"
      viewBox="0 0 70 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      aria-label="RAD's Twitch channel."
    >
      <path
        d="M64.1667 37.1429L52.5 48.5715H40.8333L30.625 58.5715V48.5715H17.5V5.71436H64.1667V37.1429Z"
        fill="white"
      />
      <path
        d="M14.5833 0L0 14.2857V65.7143H17.5V80L32.0833 65.7143H43.75L70 40V0H14.5833ZM64.1667 37.1429L52.5 48.5714H40.8333L30.625 58.5714V48.5714H17.5V5.71429H64.1667V37.1429Z"
        fill="#9146FF"
      />
      <motion.path
        d="M55.4166 15.7144H49.5833V32.8572H55.4166V15.7144Z"
        fill="#9146FF"
        animate={{ scaleY: [1, 0, 1], originY: 1 }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 6, delay: 7 }}
      />
      <motion.path
        d="M39.375 15.7144H33.5417V32.8572H39.375V15.7144Z"
        fill="#9146FF"
        animate={{ scaleY: [1, 0, 1], originY: 1 }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 6, delay: 7 }}
      />
    </motion.svg>
  )
}

export function DiscordIcon() {
  return (
    <motion.svg
      width="70"
      height="55"
      viewBox="0 0 70 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      aria-label="RAD's Discord server."
    >
      <path
        d="M45.0097 0.415541C50.012 1.29172 54.7964 2.82152 59.258 4.89792C59.2966 4.91482 59.3296 4.94302 59.349 4.98242C67.2539 16.7758 71.1581 30.0792 69.6986 45.3943C69.6931 45.4591 69.66 45.5183 69.6075 45.5577C63.6201 50.0175 57.8204 52.725 52.1007 54.5196C52.0096 54.5478 51.9103 54.514 51.8551 54.4351C50.5335 52.57 49.3332 50.6035 48.2821 48.5384C48.2213 48.4173 48.2765 48.2708 48.4007 48.2229C50.3072 47.4932 52.12 46.6198 53.8638 45.5859C54.0017 45.5042 54.01 45.3041 53.8831 45.2083C53.5134 44.9294 53.1465 44.6364 52.796 44.3434C52.7298 44.2899 52.6415 44.2786 52.5669 44.3152C41.2462 49.6203 28.8437 49.6203 17.3878 44.3152C17.3133 44.2814 17.2249 44.2927 17.1615 44.3462C16.8111 44.6392 16.4441 44.9294 16.0771 45.2083C15.9502 45.3041 15.9613 45.5042 16.0992 45.5859C17.843 46.6001 19.6558 47.4932 21.5596 48.2257C21.6837 48.2736 21.7417 48.4173 21.681 48.5384C20.6519 50.6064 19.4516 52.5729 18.1052 54.4379C18.0472 54.514 17.9507 54.5478 17.8596 54.5196C12.1675 52.725 6.36769 50.0175 0.380328 45.5577C0.330662 45.5183 0.294794 45.4563 0.289275 45.3915C-0.930272 32.1444 1.55573 18.731 10.6306 4.97962C10.6526 4.94302 10.6857 4.91482 10.7244 4.89792C15.1887 2.81872 19.9731 1.28892 24.9726 0.415541C25.0637 0.401451 25.1547 0.44371 25.2017 0.52541C25.8197 1.63542 26.5261 3.05822 27.0034 4.22172C32.2734 3.40472 37.6262 3.40472 43.0065 4.22172C43.4838 3.08352 44.1654 1.63542 44.7807 0.52541C44.8276 0.44089 44.9186 0.398631 45.0097 0.415541Z"
        fill="#5865F2"
      />
      <motion.path
        d="M23.3917 37.3254C19.9427 37.3254 17.1008 34.1137 17.1008 30.1694C17.1008 26.2251 19.8876 23.0134 23.3917 23.0134C26.9234 23.0134 29.7378 26.2533 29.6826 30.1694C29.6826 34.1137 26.8958 37.3254 23.3917 37.3254Z"
        fill="white"
        animate={{ scaleY: [1, 0, 1], originY: 1 }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 4, delay: 2 }}
      />
      <motion.path
        d="M46.6514 37.3254C43.2024 37.3254 40.3605 34.1137 40.3605 30.1694C40.3605 26.2251 43.1472 23.0134 46.6514 23.0134C50.1831 23.0134 52.9974 26.2533 52.9423 30.1694C52.9423 34.1137 50.1831 37.3254 46.6514 37.3254Z"
        fill="white"
        animate={{ scaleY: [1, 0, 1], originY: 1 }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 4, delay: 2 }}
      />
    </motion.svg>
  )
}
