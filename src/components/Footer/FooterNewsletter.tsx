import Input from '@components/Input'
import * as Fathom from 'fathom-client'
import { useRef, useState } from 'react'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { z } from 'zod'
import { trpc } from '@libs/trpc'
import { useRouter } from 'next/router'

/* FooterNewsletter is an absolutely overkill approach to gathering the most basic data. The thought process here is to be as strict as possible when it comes to validating the data entering our database, while providing clear client-side information regarding form status. We begin with FormData, an interface with just email: string. This interface is expected when handleSubmit begins, followed by zod validation expecting the user input to match. Finally, should the input indeed be a string, and zod parases it to be an string.email, our contactRouter send the data to our database. Lastly, we get feedback from our database API to confirm success or failure.

Our previous approach was a bit less detailed..:

 if (submit === false) {
      try {
        contactRouter.mutateAsync({
          email: contactEmail,
        })
      } finally {
        setContactEmail(' ')
        setSubmit(true)
      }
    }
*/

interface FormData {
	email: string
}

export default function FooterNewsletter() {
	const router = useRouter()
	const eventId = '?utm_campaign=donaterad&utm_source=google'
	const formRef = useRef<FormHandles>(null)
	const [submit, setSubmit] = useState(false)
	const { isSuccess, isError, ...contactRouter } = trpc.useMutation([
		'contact.create-contact-newsletter',
	])

	const handleSubmit: SubmitHandler<FormData> = async (data) => {
		const schema = z
			.object({
				email: z.string().email({ message: 'Email invalid' }),
			})
			.safeParse({ email: data.email })
		if (schema.success) {
			await contactRouter.mutateAsync({
				email: data.email,
			})
			formRef.current?.reset()
			formRef.current?.clearField('email')
			formRef.current?.setFieldError('email', '')
			setSubmit(true)
			if (router.asPath.includes(eventId)) {
				Fathom.trackGoal('SLXOTXYI', 0)
			}
		}
		if (!schema.success) formRef.current?.setFieldError('email', 'Invalid Email Address')
	}
	return (
		<Form ref={formRef} onSubmit={handleSubmit} className="space-y-2">
			<Input name="email" variant="email" disabled={submit} />
			<button
				type="submit"
				disabled={submit}
				className="w-full px-3 py-1 text-base font-bold transition-all duration-300 ease-linear bg-white border-2 border-black outline-none elative rounded-xl hover:shadow-none focus-within:shadow-none hover:bg-black hover:text-white shadow-deep focus:bg-green-light disabled:bg-green-light disabled:shadow-none disabled:pointer-events-none focus-within:text-black focus:ring-4 focus:ring-secondary-light"
			>
				{isSuccess ? contactRouter.data?.message : 'Subscribe'}
				{isError ?? contactRouter.error?.message}
			</button>
		</Form>
	)
}
