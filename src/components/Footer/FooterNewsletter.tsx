import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { trpc } from '@libs/trpc'

/* FooterNewsletter contains the Newsletter form and a fairly overkill approach to handling form data. In previous version of the site, a simple method (detailed below) was used; however, validation and typesaftey were overlooked. In this version, react-hook-form helps with built-in focus management, while zod requires each step of the form to maintain strict typesafety. Additionally, we're taking advantage of aria-invalid and role="alert" to provide a more accessible message to the user. 

const handleNewsletterSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    if (submit === false) {
      try {
        contactRouter.mutateAsync({
          email: contactEmail,
        })
      } finally {
        setContactEmail(' ') **To Clear Form Values**
        setSubmit(true) **For Disabled State**
      }
    }
  }

*/

const NewsLetterInputs = z.object({
  email: z.string().email({ message: 'Invalid email' }),
})

type NewsLetterInputs = z.infer<typeof NewsLetterInputs>

export default function Newsletter() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsLetterInputs>({
    resolver: zodResolver(NewsLetterInputs),
  })

  const { ...contactRouter } = trpc.useMutation('create-contact-newsletter')
  const handleNewsletterSubmit: SubmitHandler<NewsLetterInputs> = (data) => {
    contactRouter.mutateAsync({
      email: data.email,
    })
    reset()
  }

  return (
    <form aria-label="Newsletter sign up form." onSubmit={handleSubmit(handleNewsletterSubmit)}>
      <input
        aria-invalid={errors.email ? 'true' : 'false'}
        className="border-2"
        {...register('email')}
      />
      {errors.email?.message && (
        <p role="alert" className="block text-sm text-red">
          {errors.email.message}
        </p>
      )}
      <button type="submit">RAD</button>
    </form>
  )
}
