import * as Icons from './TweetIcons'
import classNames from '@utils/classNames'
import TweetShare from './TweetShareMenu'

/* TweetFooter hosts a great deal of the functionality of a Twitter post, including interacting with comments, retweets, likes, and sharing. */

interface TweetFooterProps {
  tweetComments: string
  tweetRetweets: string
  tweetLikes: string
  tweetId: string | undefined
  userHandle: string
}

export default function TweetFooter({
  tweetComments,
  tweetRetweets,
  tweetLikes,
  tweetId,
  userHandle,
}: TweetFooterProps) {
  const FooterIcons = [
    {
      id: 'comment',
      iconColor: '#1d9bf0',
      icon: Icons.Comment,
      link: `https://twitter.com/intent/tweet?in_reply_to=${tweetId}`,
      input: tweetComments,
    },
    {
      id: 'retweet',
      iconColor: '#00ba7c',
      icon: Icons.Retweet,
      link: `https://twitter.com/intent/retweet?tweet_id=${tweetId}`,
      input: tweetRetweets,
    },
    {
      id: 'likes',
      iconColor: '#ee3c90',
      icon: Icons.Likes,
      link: `https://twitter.com/intent/like?tweet_id=${tweetId}`,
      input: tweetLikes,
    },
  ]

  return (
    <div className="relative flex flex-row justify-between pt-3 border-t">
      {FooterIcons.map((icons) => (
        <a
          key={icons.id}
          className={classNames(
            icons.id === 'retweet'
              ? 'hover:text-[#00ba7c] focus:text-[#00ba7c] focus:bg-[#00ba7c]/20 outline-[#00ba7c]/40'
              : '',
            icons.id === 'comment'
              ? 'hover:text-[#1d9bf0] focus:text-[#1d9bf0] focus:bg-[#1d9bf0]/20 outline-[#1d9bf0]/40'
              : '',
            icons.id === 'likes'
              ? 'hover:text-[#ee3c90] focus:text-[#ee3c90] focus:bg-[#ee3c90]/20 outline-[#ee3c90]/40'
              : '',
            'flex items-center text-base leading-5 group relative'
          )}
          target="_blank"
          rel="no-referr noreferrer"
          href={icons.link}
        >
          <div
            className={classNames(
              icons.id === 'retweet' ? 'group-hover:bg-[#00ba7c]/20' : '',
              icons.id === 'comment' ? 'group-hover:bg-[#1d9bf0]/20' : '',
              icons.id === 'likes' ? 'group-hover:bg-[#ee3c90]/20' : '',
              'absolute p-2 w-8 h-8 -inset-x-1.5 -z-10 rounded-full  transition-all duration-300'
            )}
          />
          <icons.icon />
          <span className="relative z-0 ml-2">{icons.input}</span>
        </a>
      ))}
      <TweetShare tweetId={tweetId} userHandle={userHandle} />
    </div>
  )
}
