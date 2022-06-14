import DonateLayout from '@components/Donate/DonateLayout'

import PageSEO from '@components/SEO/PageSEO'

export default function Doante() {
  return (
    <div>
      <PageSEO
        title="Donate To RAD"
        description="Donate to RAD and help someone start therapy today! Every $30 donated covers a week of therapy for someone in need. Join us in making mental health care possible for everyone, everywhere."
      />
      <section className="mt-10">
        <header>
          <h1 className="text-center">
            <span className="text-transparent bg-gradient-to-r from-secondary-light to-primary-light bg-clip-text sm:block">
              You can be the reason{' '}
            </span>
            someone starts therapy today.
          </h1>
        </header>
        <DonateLayout />
      </section>
    </div>
  )
}
