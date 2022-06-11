import HeaderSection from '@components/HeaderSection'
import PageHeader from '@components/PageHeader'
import PageSEO from '@components/SEO/PageSEO'
import SupportTabs from '@components/SupportTabs'
import { volunteerData } from '@data/WaysToSupport'

export default function Volunteer() {
  return (
    <div>
      <PageSEO
        title="Volunteer"
        description="Learn more about volunteering with Rise Above The Disorder. Equipped with your time and talent, we can make mental health care accessible to everyone."
      />
      <PageHeader
        variant="supportPage"
        headerText="We're always looking for"
        headerTextHighlight="heroes like you."
      />
      <section>
        <HeaderSection
          headerSubText="Volunteer Roles"
          headerSubTextColor="text-secondary"
          headerText="Lend your time and talent to"
          headerTextHighlight="help others rise above"
          headerTextHighlightColor="from-secondary-light to-primary-light"
        />
        <div className="px-4 py-10 mx-auto mt-20 bg-gradient-to-br from-secondary-light to-primary-light rounded-xl max-w-7xl sm:px-6 lg:px-8">
          <SupportTabs tabs={volunteerData} />
        </div>
      </section>
    </div>
  )
}
