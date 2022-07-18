import HeaderSection from '@components/HeaderSection'
import PageHeader from '@components/PageHeader'
import PageSEO from '@components/SEO/PageSEO'
import SupportTabs from '@components/SupportTabs'
import { volunteerData } from '@data/WaysToSupport'
import Input from '@components/Input'
import { useRef, useState, SetStateAction } from 'react'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { trpc } from '@libs/trpc'
import PrimaryButton from '@components/PrimaryButton'
import Select from '@components/Select'
import {
	CreateContactVolunteerSchema,
	createContactVolunteerSchema,
} from 'src/shared/ContactSchemas'

const selectOptions = [
	{
		label: 'Coding',
	},
	{ label: 'Clinical' },
	{ label: 'Community' },
	{ label: 'Event' },
]

export default function Volunteer() {
	const formRef = useRef<FormHandles>(null)
	const [submit, setSubmit] = useState(false)
	const [selectOption, setSelectOptions] = useState('')
	const updateOption = (option: SetStateAction<string>) => {
		setSelectOptions(option)
		console.log(selectOption)
	}
	const { isSuccess, ...contactRouter } = trpc.useMutation(['contact.create-contact-volunteer'])

	const handleSubmit: SubmitHandler<CreateContactVolunteerSchema> = async (data) => {
		const schema = createContactVolunteerSchema.safeParse({
			name: data.name,
			email: data.email,
			experience: data.experience,
			position: data.position,
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
				position: selectOption,
				message: data.message,
				experience: data.experience,
			})
			formRef.current?.reset()
			setSubmit(true)
		}
	}

	return (
		<div>
			<PageSEO
				title="Volunteer with RAD"
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
					headerTextHighlightBlock
				/>
				<div className="px-4 py-10 mx-auto mt-20 bg-gradient-to-br from-secondary-light to-primary-light rounded-xl max-w-7xl sm:px-6 lg:px-8">
					<SupportTabs tabs={volunteerData} />
				</div>
			</section>
			<section className="space-y-4">
				<header>
					<h2 className="text-center text-transparent bg-gradient-to-r from-red-light to-primary-light bg-clip-text">
						Volunteer form
					</h2>
				</header>
				<div className="w-full max-w-xl p-4 mx-auto space-y-8 rounded-xl">
					<Form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
						<Input name="name" variant="text" disabled={submit} label="Name" />
						<Input name="email" variant="email" disabled={submit} label="Email" />
						<Select
							ariaLabel="Volunteer roles"
							options={selectOptions}
							state={updateOption}
							disabled={submit}
						/>
						<Input
							name="experience"
							variant="textarea"
							disabled={submit}
							label="Volunteer Experience"
						/>
						<Input
							name="message"
							variant="textarea"
							disabled={submit}
							label="Why You're Volunteering"
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
