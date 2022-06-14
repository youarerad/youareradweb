import PageSEO from '@components/SEO/PageSEO'
import Input from '@components/Input'
import { useRef, useState, SetStateAction } from 'react'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { trpc } from '@libs/trpc'
import PrimaryButton from '@components/PrimaryButton'
import { z } from 'zod'
import Select from '@components/Select'

interface ContactFormData {
  name: string
  email: string
  department: string
  message: string
}

const selectOptions = [
  {
    label: 'General Contact',
  },
  { label: 'Care Department' },
  { label: 'Media Inquiries' },
  { label: 'Partnerships' },
  { label: 'Fundraising' },
]

export default function Contact() {
  const formRef = useRef<FormHandles>(null)
  const [submit, setSubmit] = useState(false)
  const [selectOption, setSelectOptions] = useState('')
  const updateOption = (option: SetStateAction<string>) => {
    setSelectOptions(option)
    console.log(selectOption)
  }

  const { isSuccess, ...contactRouter } = trpc.useMutation(['create-contact-general'])

  const handleSubmit: SubmitHandler<ContactFormData> = async (data) => {
    const schema = z
      .object({
        name: z
          .string({ required_error: 'Name is required' })
          .min(2, 'Name must be at least 2 characters'),
        email: z.string().email({ message: 'Email invalid' }),
        message: z
          .string({ required_error: 'Message is required' })
          .min(10, 'Message must be at least 10 characters'),
      })
      .safeParse({
        name: data.name,
        email: data.email,
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
        department: selectOption,
        message: data.message,
      })
      formRef.current?.reset()
      setSubmit(true)
    }
  }

  return (
    <div>
      <PageSEO
        title="Contact"
        description="Contact the team at Rise Above The Disorder! We're happy to answer any questions you may have about our programs, mental health, and our cause."
      />
      <section className="mt-10">
        <header>
          <h1 className="text-center">
            Send us your most
            <span className="sm:block text-transparent bg-gradient-to-r to-secondary from-green bg-clip-text">
              {' '}
              rad message.
            </span>
          </h1>
        </header>
        <div className="w-full max-w-xl p-4 mx-auto space-y-8 rounded-xl">
          <Form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" variant="text" disabled={submit} label="Name" />
            <Input name="email" variant="email" disabled={submit} label="Email" />
            <Select
              ariaLabel="Department"
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
