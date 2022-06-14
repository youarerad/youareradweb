import { Tab } from '@headlessui/react'
import Image from 'next/image'
import LazyVideo from './VideoPlayer'
import { useState } from 'react'
import classNames from '@utils/classNames'

const TabData = [
  {
    stream: 'sweet_anita',
    video: 'https://res.cloudinary.com/df23ubjbb/video/upload/v1647880106/sweetanita.mp4',
  },
  {
    stream: 'chess',
    video:
      'https://res.cloudinary.com/df23ubjbb/video/upload/v1630624088/General%20Media/ChessxCoinbase.mp4',
  },
  {
    stream: 'trainwreckstv',
    video:
      'https://res.cloudinary.com/df23ubjbb/video/upload/v1636693951/General%20Media/Talks.mp4',
  },
]

export default function StreamBrowser() {
  const [currentStream, setCurrentStream] = useState('sweet_anita')
  return (
    <Tab.Group defaultIndex={0}>
      <div className="flex flex-col overflow-hidden border shadow-xl rounded-xl border-gray">
        <div className="flex flex-col bg-black">
          <div className="flex px-1.5">
            <div className="flex items-center px-2.5 space-x-2 mr-2">
              <div className="w-3 h-3 rounded-full bg-gray-light" />
              <div className="w-3 h-3 rounded-full bg-gray-light" />
              <div className="w-3 h-3 rounded-full bg-gray-light" />
            </div>
            <Tab.List className="flex items-center min-w-0">
              {TabData.map((tab) => (
                <Tab
                  onClick={() => setCurrentStream(tab.stream)}
                  key={tab.stream}
                  className={({ selected }) =>
                    classNames(
                      selected
                        ? 'text-black drop-shadow-none shadow-none bg-white'
                        : 'text-white hover:bg-white hover:text-black',
                      'flex relative items-center py-1.5 px-3 mt-1.5 font-medium rounded-t-md space-x-2 transition-all w-40'
                    )
                  }
                  value={tab.stream}
                >
                  <Image src="/icons/Twitch.svg" alt="twitch logo" width={18} height={18} />
                  <span className="text-sm truncate">{tab.stream}</span>
                </Tab>
              ))}
            </Tab.List>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex items-center px-2 py-2 space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <div className="flex items-center flex-1 px-2 py-1 text-xs text-black rounded-md bg-gray-light/40">
              <span>Twitch.tv/{currentStream}</span>
            </div>
          </div>
        </div>
        <Tab.Panels>
          {TabData.map((tab) => (
            <Tab.Panel
              key={tab.stream}
              className="mt-2 overflow-hidden scale-105 rounded-none aspect-video"
            >
              <LazyVideo src={tab.video} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </div>
    </Tab.Group>
  )
}
