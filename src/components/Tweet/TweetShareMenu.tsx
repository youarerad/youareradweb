import { Menu } from '@headlessui/react'
import { ShareCopyIcon, ShareDMIcon, TwitterShare } from './TweetIcons'
import classNames from '@utils/classNames'

/* TweetShareMenu contains a simple menu which emulates the menu you may find native to Twitter post. This component uses custom color sets that reflect the color scheme of Twitter.  */

interface TweetShareMenuProps {
  userHandle: string
  tweetId: string | undefined
}

export default function TweetShare({ userHandle, tweetId }: TweetShareMenuProps) {
  const copyID = () => {
    navigator.clipboard.writeText(`https://twitter.com/${userHandle}/status/${tweetId}`)
  }
  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button className="group relative focus:fill-[#1d9bf0] focus:bg-[#1d9bf0]/20 outline-[#1d9bf0]/40">
            <span className="group-hover:fill-[#1d9bf0]">
              <div className="absolute w-8 h-8 -right-[6px] -top-0  -z-10  rounded-full transition-all duration-300 group-hover:bg-[#1d9bf0]/20 " />
              <TwitterShare />
            </span>
          </Menu.Button>

          <Menu.Items
            className={classNames(
              open ? 'origin-top-right scale-y-100 ' : 'scale-y-0',
              'absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-menu w-56 z-10 rounded-[4px] will-change-transform transition-all duration-500 ease-in'
            )}
          >
            <Menu.Item>
              <a
                className="flex items-center hover:bg-[#F3F4F6] p-3 w-full text-[15px]"
                href={`https://twitter.com/messages/compose?text=https://twitter.com/${userHandle}/status/${tweetId}`}
              >
                <ShareDMIcon />
                Send via Direct Message
              </a>
            </Menu.Item>
            <Menu.Item>
              <button
                className="flex items-center hover:bg-[#F3F4F6] p-3 w-full text-[15px]"
                type="button"
                onClick={copyID}
              >
                <ShareCopyIcon />
                Copy link to Tweet
              </button>
            </Menu.Item>
          </Menu.Items>
        </>
      )}
    </Menu>
  )
}
