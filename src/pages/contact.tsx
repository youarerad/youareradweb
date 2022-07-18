import PageSEO from '@components/SEO/PageSEO'
import Input from '@components/Input'
import { useRef, useState, SetStateAction } from 'react'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { trpc } from '@libs/trpc'
import PrimaryButton from '@components/PrimaryButton'
import Select from '@components/Select'
import { CreateContactFormSchema, createContactFormSchema } from 'src/shared/ContactSchemas'

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

	const { isSuccess, ...contactRouter } = trpc.useMutation(['contact.create-contact-general'])

	const handleSubmit: SubmitHandler<CreateContactFormSchema> = async (data) => {
		const schema = createContactFormSchema.safeParse({
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
				title="Contact RAD"
				description="Contact the team at Rise Above The Disorder! We're happy to answer any questions you may have about our programs, mental health, and our cause."
			/>
			<section className="mt-10">
				<header>
					<h1 className="text-center">
						Send us your most
						<span className="text-transparent sm:block bg-gradient-to-r to-secondary from-green bg-clip-text">
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
