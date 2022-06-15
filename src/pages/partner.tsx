import HeaderSection from '@components/HeaderSection'
import PageHeader from '@components/PageHeader'
import PageSEO from '@components/SEO/PageSEO'
import SupportTabs from '@components/SupportTabs'
import { partnerTabData } from '@data/partnerData'
import Input from '@components/Input'
import { useRef, useState, SetStateAction } from 'react'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { trpc } from '@libs/trpc'
import PrimaryButton from '@components/PrimaryButton'
import { z } from 'zod'
import Select from '@components/Select'

interface PartnerFormData {
  name: string
  email: string
  company: string
  type: string
  message: string
}

const selectOptions = [
  {
    label: 'Community Support',
  },
  { label: 'Event Activations' },
  { label: 'HR & Employee Care' },
  { label: 'Programs & Care' },
]

export default function Partner() {
  const formRef = useRef<FormHandles>(null)
  const [submit, setSubmit] = useState(false)
  const [selectOption, setSelectOptions] = useState('')
  const updateOption = (option: SetStateAction<string>) => {
    setSelectOptions(option)
    console.log(selectOption)
  }

  const { isSuccess, ...contactRouter } = trpc.useMutation(['create-contact-partner'])

  const handleSubmit: SubmitHandler<PartnerFormData> = async (data) => {
    const schema = z
      .object({
        name: z
          .string({ required_error: 'Name is required' })
          .min(2, 'Name must be at least 2 characters'),
        email: z.string().email({ message: 'Email invalid' }),
        company: z
          .string({ required_error: 'Company is required' })
          .min(2, 'Company must be at least 2 characters'),
        message: z
          .string({ required_error: 'Details are required' })
          .min(2, 'Details must be at least 2 characters'),
      })
      .safeParse({
        name: data.name,
        email: data.email,
        company: data.company,
        message: data.message,
      })
    if (!schema.success) {
      schema.error.issues.forEach((issue) => {
        formRef.current?.setFieldError(issue.path as unknown as string, issue.message)
      })
    }
    if (schema.success) {
      await contactRouter.mutateAsync({
        name: data.name,
        email: data.email,
        company: data.company,
        type: selectOption,
        message: data.message,
      })
      formRef.current?.reset()
      setSubmit(true)
    }
  }

  return (
    <div>
      <PageSEO
        title="Partner With RAD"
        description="Join incredible partners like Electronic Arts, Jagex, Columbia Records, and more! Rise Above The Disorder partners with teams all over the world to make mental health care accessible to all."
      />
      <PageHeader
        variant="supportPage"
        headerText="Innovative and community focused"
        headerTextHighlight="partners join our quest."
      />
      <section>
        <HeaderSection
          headerSubText="Partnership Opportunities"
          headerSubTextColor="text-secondary"
          headerText="Your partnership"
          headerTextHighlight="makes healing possible"
          headerTextHighlightColor="from-secondary-light to-primary-light"
          headerTextHighlightBlock
        >
          Join incredible partners like Electronic Arts, Jagex, Columbia Records, and more! Rise
          Above The Disorder partners with teams all over the world to make mental health care
          accessible to all.
        </HeaderSection>
        <div className="px-4 py-10 mx-auto mt-20 bg-gradient-to-br from-secondary-light to-primary-light rounded-xl max-w-7xl sm:px-6 lg:px-8">
          <SupportTabs useVideos tabs={partnerTabData} />
        </div>
      </section>
      <section className="space-y-4">
        <header>
          <h2 className="text-center bg-gradient-to-r from-red-light to-primary-light text-transparent bg-clip-text">
            Partner form
          </h2>
        </header>
        <div className="w-full max-w-xl p-4 mx-auto space-y-8 rounded-xl">
          <Form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" variant="text" disabled={submit} label="Name" />
            <Input name="email" variant="email" disabled={submit} label="Email" />
            <Input name="company" variant="text" disabled={submit} label="Company" />
            <Select
              ariaLabel="Partner Type"
              options={selectOptions}
              state={updateOption}
              disabled={submit}
            />
            <Input
              name="message"
              variant="textarea"
              disabled={submit}
              label="Partnership Details"
            />
            <PrimaryButton
              disabled={submit}
              buttonText={isSuccess ? contactRouter.data?.message : 'Send Form'}
              type="submit"
            />
          </Form>
        </div>
      </section>
    </div>
  )
}
