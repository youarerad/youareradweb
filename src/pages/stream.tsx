import HeaderSection from '@components/HeaderSection'
import InfoCard from '@components/InfoCard'
import PrimaryButton from '@components/PrimaryButton'
import PageSEO from '@components/SEO/PageSEO'
import StreamBrowser from '@components/StreamBrowser'
import SectionGrid from '@layouts/SectionGrid'
import SectionHighlight from '@utils/SectionHighlight'
import Link from 'next/link'

export default function Stream() {
  return (
    <div>
      <PageSEO
        title="Live Stream"
        description="When you go live for RAD, you're giving back to your community and beyond. Every $30 raised on stream will cover a week of therapy for someone in need. Plan your stream today!"
      />
      <section className="mt-10 flex flex-col items-center">
        <header>
          <h1 className="text-center">
            Go live for RAD.
            <span className="text-transparent bg-gradient-to-r from-secondary-light to-primary-light bg-clip-text sm:block">
              {' '}
              Change lives for your community.
            </span>
          </h1>
        </header>
        <Link href="https://tiltify.com/anxiety-gaming">
          <div className="w-full max-w-md">
            <PrimaryButton type="button" buttonText="Plan Your Stream" />
          </div>
        </Link>
      </section>
      <section>
        <HeaderSection
          headerSubText="Go Live"
          headerSubTextColor="text-secondary"
          headerText="You can be the reason"
          headerTextHighlight="someone starts therapy."
          headerTextHighlightColor="from-secondary-light to-primary-light"
        />
        <SectionHighlight>
          <SectionGrid>
            <div className="space-y-2">
              <h3>
                Help viewers, mods, and fellow creators{' '}
                <span className="text-transparent bg-gradient-to-r from-red-light to-primary-light bg-clip-text">
                  start therapy.
                </span>
              </h3>
              <p>When you go live for RAD, you&apos;re giving back to your community and beyond.</p>
            </div>
            <StreamBrowser />
          </SectionGrid>
        </SectionHighlight>
      </section>
      <div className="grid grid-cols-1 gap-10 mt-20 sm:grid-cols-3">
        {InfoCardData.map((card) => (
          <InfoCard
            key={card.headerText}
            headerText={card.headerText}
            description={card.description}
            imageSrc={card.imageSrc}
            imageAlt={card.imageAlt}
          />
        ))}
      </div>
    </div>
  )
}

export const InfoCardData = [
  {
    headerText: 'Fundraise Therapy',
    description: 'Every $30 raised will cover a therapy session for someone in need.',
    imageSrc:
      'https://res.cloudinary.com/df23ubjbb/image/upload/v1648590578/Health_Potion_2_ehjcqp.webp',
    imageAlt: 'Health Potion',
  },
  {
    headerText: 'Give The Most',
    description: '100% of funds raised go to covering the cost of mental health care.',
    imageSrc: 'https://res.cloudinary.com/df23ubjbb/image/upload/v1647981322/PC_olwukz.webp',
    imageAlt: 'Treasure Chest',
  },
  {
    headerText: 'Spread Awareness',
    description: '82% of people found Rise Above The Disorder on Twitch or YouTube.',
    imageSrc: 'https://res.cloudinary.com/df23ubjbb/image/upload/v1647981322/PC_olwukz.webp',
    imageAlt: 'A Computer',
  },
]
