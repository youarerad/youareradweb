import Link from 'next/link'

export default function DonateTwitchSub() {
  return (
    <Link href="https://www.twitch.tv/subs/youarerad" passHref>
      <a className="relative z-10 flex items-center justify-center w-full p-3 font-bold text-black transition-all duration-100 border-2 cursor-pointer border-gray-light rounded-xl hover:shadow-xl hover:bg-primary hover:text-white hover:border-primary hover:drop-shadow-sm">
        Donate Twitch Subscription
      </a>
    </Link>
  )
}
