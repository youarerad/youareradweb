import HeaderSection from '@components/HeaderSection'
import PageSEO from '@components/SEO/PageSEO'
import Tweet from '@components/Tweet'
import { careerData, TeamTestimonials } from '@data/radTeamData'
import SectionGrid from '@layouts/SectionGrid'
import Image from 'next/image'

export default function Careers() {
  return (
    <div>
      <PageSEO
        title="Careers At RAD"
        description="Explore opportunities to work at Rise Above The Disorder. Our team enjoys some of the best benefits, compensation, and work-life balance in the field. We center our team on passion, purpose, and personal wellbeing."
      />
      <section className="mt-10">
        <header>
          <h1 className="text-center">
            Join a global team of
            <span className="text-transparent bg-gradient-to-r from-green to-secondary bg-clip-text block">
              mental health champions.
            </span>
          </h1>
        </header>
      </section>

      <section>
        <HeaderSection
          headerSubText="Life At RAD"
          headerSubTextColor="text-secondary"
          headerText="A work environment focused on"
          headerTextHighlight="your mental health"
          headerTextHighlightColor="from-secondary-light to-primary-light"
          headerTextHighlightBlock
        >
          Engage with a purpose driven team or enjoy working solo. Work when you&apos;re inspired or
          rest when you&apos;re not. We believe the ideal work environment comes from putting the
          mental health of our team first.
        </HeaderSection>

        <SectionGrid>
          <Tweet TwitterPostData={TeamTestimonials} />
        </SectionGrid>
      </section>

      <section className="bg-black text-white rounded-3xl px-4 sm:px-6 lg:px-8">
        <header>
          <h2 className="text-center text-white">
            <span className="block text-base text-extrabold text-primary-light">Team Benefits</span>
            Benefits that empower you to
            <span className="text-transparent sm:block bg-gradient-to-r from-secondary-light to-primary-light bg-clip-text">
              {' '}
              live your best life
            </span>
          </h2>
        </header>
        <div className="grid gap-10 sm:grid-cols-3">
          {careerData.map((career) => (
            <div key={career.id}>
              <div className={`rounded-xl border-4 p-4 text-left h-full ${career.border}`}>
                <div key={career.id}>
                  <Image src={career.icon} width={48} height={48} alt="" />
                </div>
                <div className="p-1">
                  <h4 className={`font-semibold text-base ${career.color}`}>{career.id}</h4>
                  <p className="text-white">{career.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
