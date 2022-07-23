import Input from '@components/Input'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { trpc } from '@libs/trpc'
import PrimaryButton from '@components/PrimaryButton'
import { CreateEventSignupFormSchema, createEventSignupFormSchema } from 'src/shared/ContactSchemas'
import { useRef, useState } from 'react'
export default function Mindfull() {
	const formRef = useRef<FormHandles>(null)
	const [submit, setSubmit] = useState(false)
	const { isSuccess, ...contactRouter } = trpc.useMutation(['contact.create-event-signup'])
	const handleSubmit: SubmitHandler<CreateEventSignupFormSchema> = async (data) => {
		const schema = createEventSignupFormSchema.safeParse({
			name: data.name,
			email: data.email,
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
			})
			formRef.current?.reset()
			setSubmit(true)
		}
	}

	return (
		<div>
			<section className="mt-10">
				<header>
					<h2>
						Thank you for joining mindFull to support{' '}
						<span className="text-transparent bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text">
							Rise Above The Disorder!
						</span>
					</h2>
				</header>
				<div className="w-full max-w-xl p-10 mx-auto space-y-4 border-2 rounded-xl border-gray-light">
					<div>
						<h3>Please sign in:</h3>
						<p className="text-sm text-gray">We are excited to have you join us today!</p>
					</div>
					<Form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
						<Input name="name" variant="text" disabled={submit} label="Name" />
						<Input name="email" variant="email" disabled={submit} label="Email" />
						<div className="mt-4" />
						<PrimaryButton
							disabled={submit}
							type="submit"
							buttonText={isSuccess ? 'Success!' : 'Sign In'}
						/>
					</Form>
				</div>
			</section>
		</div>
	)
}
