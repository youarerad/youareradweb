import { z } from 'zod'
import { SubmitHandler, useForm, RefCallBack } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '@components/Input'
import { trpc } from '@libs/trpc'
import { useState } from 'react'

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
  const [submit, setSubmit] = useState(false)
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
    setSubmit(true)
  }
  return (
    <form aria-label="Newsletter sign up form." onSubmit={handleSubmit(handleNewsletterSubmit)}>
      <Input
        aria-invalid={errors.email ? 'true' : 'false'}
        id="email"
        variant="email"
        {...register('email').ref}
      />
      {errors.email?.message && (
        <p role="alert" className="block text-sm text-red mt-2">
          {errors.email.message}
        </p>
      )}
      <button
        type="submit"
        className="w-full mt-2 px-3 py-1 text-base font-bold transition-all duration-300 ease-linear bg-white border-2 border-black elative rounded-xl hover:shadow-none focus-within:shadow-none hover:bg-black hover:text-white shadow-deep focus:bg-green-light disabled:bg-green-light disabled:shadow-none disabled:pointer-events-none focus-within:text-black"
        disabled={submit === true}
      >
        {submit === true ? 'Success!' : 'Sign Up'}
      </button>
    </form>
  )
}
