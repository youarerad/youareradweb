import { NextPageWithLayout } from '../_app'
import { ReactElement, useEffect, useRef, useState } from 'react'
import StarsBG from '@components/CreatorCare/Stars'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import {
	createCommunityCareFormSchema,
	CreateCommunityCareFormSchema,
} from 'src/shared/ContactSchemas'
import { trpc } from '@libs/trpc'
import { AnimatePresence } from 'framer-motion'
import { SignupStepOne, SignupStepThree, SignupStepTwo } from '@components/CreatorCare/FormStages'

const Page: NextPageWithLayout = () => {
	const [submit, setSubmit] = useState(false)
	const query = trpc.useQuery(['next-auth.getSession'])
	const session = query.data
	const { isSuccess, ...signUpRouter } = trpc.useMutation(['contact.create-cc-signup'])
	const creator = trpc.useQuery([
		'next-auth.checkCreator',
		{
			email: session?.user?.email as string,
		},
	])

	interface ConnectionProps {
		type: string
		id: string
		name: string
	}

	const { data } = trpc.useQuery(
		[
			'next-auth.getDiscord',
			{
				key: session?.accessToken,
			},
		],
		{
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
			staleTime: Infinity,
		}
	)

	const { data: connections } = trpc.useQuery([
		'next-auth.getDiscordConnections',
		{
			key: session?.accessToken,
		},
	])

	useEffect(() => {
		if (data) {
			formRef.current?.setFieldValue('email', data['email'] || '')
			formRef.current?.setFieldValue(
				'discord',
				data['username'] + '#' + data['discriminator'] || ''
			)
		}
		if (creator) {
			setSubmit(true)
		}
		if (connections) {
			const connectionsArray = Object.values(connections) as ConnectionProps[]
			const twitterConnection = connectionsArray.filter((c) => c.type === 'twitter')
			const twitchConnection = connectionsArray.filter((c) => c.type === 'twitch')
			const youtubeConnection = connectionsArray.filter((c) => c.type === 'youtube')
			const channelName = twitchConnection[0]?.name || youtubeConnection[0]?.name || ''

			if (channelName != null) {
				formRef.current?.setFieldValue('platform', 'https://www.twitch.tv/' + channelName)
			}

			if (twitterConnection != null) {
				formRef.current?.setFieldValue(
					'twitter',
					'https://twitter.com/' + twitterConnection[0]?.name || ''
				)
			}
		}
	}, [data, connections, creator])

	const formRef = useRef<FormHandles>(null)

	const handleSubmit: SubmitHandler<CreateCommunityCareFormSchema> = async (data) => {
		const schema = createCommunityCareFormSchema.safeParse({
			email: data.email,
			discord: data.discord,
			platform: data.platform,
			twitter: data.twitter,
		})
		if (!schema.success) {
			schema.error.issues.forEach((issue) => {
				formRef.current?.setFieldError(issue.path as unknown as string, issue.message)
			})
		}
		if (schema.success) {
			await signUpRouter.mutateAsync({
				discord: data.discord,
				email: data.email,
				platform: data.platform,
				twitter: data.twitter,
			})
			if (isSuccess) {
				setSubmit(true)
			}
		}
	}

	return (
		<div className="flex flex-col items-center max-w-lg">
			<AnimatePresence exitBeforeEnter>
				{!session && <SignupStepOne />}
				{session && !submit && (
					<Form ref={formRef} onSubmit={handleSubmit} className="w-screen p-4 bg-black rounded-xl">
						<SignupStepTwo buttonText="Confirm Information" disabled={isSuccess} />
					</Form>
				)}
				{session && submit && <SignupStepThree />}
			</AnimatePresence>
		</div>
	)
}

Page.getLayout = function getLayout(page: ReactElement) {
	return (
		<div className="flex flex-col items-center justify-center h-screen text-white bg-black">
			<div className="relative z-10">{page}</div>
			<div className="absolute inset-0 select-none -z-0" aria-hidden>
				<StarsBG />
			</div>
		</div>
	)
}

export default Page
