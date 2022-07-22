import { DonateMonthlyConfig } from './DonateConfig'
import { SetStateAction, useEffect, useState } from 'react'
import DonateTwitchSub from './DonateTwitchSub'
import getStripe from '@utils/hooks/getStripe'
import { trpc } from '@libs/trpc'
import PrimaryButton from '@components/PrimaryButton'
import AppRadioGroup from './AppRadioGroup'
import Checkbox from '@components/Checkbox'
import UncontrolledInput from '@components/UnControlledInput'
import classNames from '@utils/classNames'
import Select from '@components/Select'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'

const honorandmemoryOptions = [{ label: 'In honor of' }, { label: 'In memory of' }]

export default function DonateMonthly() {
	const router = useRouter()
	const eventId = '?utm_campaign=donaterad&utm_source=google'
	const [currentOption, setCurrentOption] = useState<number>(0)
	const selectedOption = DonateMonthlyConfig[currentOption]
	const [inhonorChecked, setInHonorChecked] = useState<boolean>(false)
	const [onbehalfof, setOnBehalfOf] = useState<string>('')
	const updateOnBehalfOf = (option: SetStateAction<string>) => {
		setOnBehalfOf(option)
	}
	const [leavecommentChecked, setLeaveCommentChecked] = useState<boolean>(false)
	const [inhonorMessage, setInHonorMessage] = useState<string>(() => {
		const initialValue = JSON.parse(localStorage.getItem('inhonorMessage') || '""')
		return initialValue
	})
	const [leavecommentMessage, setLeaveCommentMessage] = useState<string>(() => {
		const initialValue = JSON.parse(localStorage.getItem('leavecommentMessage') || '""')
		return initialValue
	})
	const limitReach = leavecommentMessage.length > 600
	const limitCaution = leavecommentMessage.length > 520 && leavecommentMessage.length < 600

	const { isLoading, ...createCheckout } = trpc.useMutation('checkout.create-monthly-donation')

	const handleDonationSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault()
		if (router.asPath.includes(eventId)) {
			Fathom.trackGoal('SLXOTXYI', 0)
		}

		const response = await createCheckout.mutateAsync({
			priceId: selectedOption.priceId,
			honor: onbehalfof.toLowerCase() + ' ' + inhonorMessage,
			message: leavecommentMessage,
		})

		const stripe = await getStripe()
		if (stripe != null) {
			await stripe.redirectToCheckout({
				sessionId: response.id,
			})
		}
	}

	useEffect(() => {
		localStorage.setItem('inhonorMessage', JSON.stringify(inhonorMessage))
		localStorage.setItem('leavecommentMessage', JSON.stringify(leavecommentMessage))
	}, [inhonorMessage, leavecommentMessage])

	return (
		<>
			<form onSubmit={handleDonationSubmit}>
				<div className="grid grid-cols-3 gap-4 mb-4">
					<AppRadioGroup
						value={currentOption}
						onChange={setCurrentOption}
						options={DonateMonthlyConfig.map((option, index) => ({
							label: option.priceLabel,
							value: index,
						}))}
						className="contents"
					/>
					<DonateTwitchSub />
					<p className="col-span-3">
						Your donation of <span className="font-bold">{selectedOption.priceLabel}</span>{' '}
						{selectedOption.message}
					</p>
				</div>
				<div className="space-y-4">
					<div className="inline-flex flex-col">
						<Checkbox
							checked={inhonorChecked}
							label="Give in honor/memory"
							onChange={() => setInHonorChecked((inhonorChecked) => !inhonorChecked)}
						/>
						<Checkbox
							checked={leavecommentChecked}
							label="Attach a message"
							onChange={() => setLeaveCommentChecked((leavecommentChecked) => !leavecommentChecked)}
						/>
					</div>
					<div
						className={classNames(
							inhonorChecked ? 'pb-4' : '',
							leavecommentChecked ? 'pb-4 space-y-4' : '',
							'space-y-4 flex flex-col'
						)}
					>
						{inhonorChecked && (
							<div className="flex items-center justify-between">
								<Select options={honorandmemoryOptions} state={updateOnBehalfOf} />
								<UncontrolledInput
									variant="text"
									name="inHonorOf"
									value={inhonorMessage}
									onChange={(e) => setInHonorMessage(e.currentTarget.value)}
								/>
							</div>
						)}
						{leavecommentChecked && (
							<UncontrolledInput
								variant="textarea"
								name="leavecommentMessage"
								value={leavecommentMessage.slice(0, 600)}
								onChange={(e) => setLeaveCommentMessage(e.currentTarget.value)}
							>
								<div
									className={classNames(
										limitReach ? 'text-red-dark font-bold' : '',
										limitCaution ? 'text-black font-semibold' : 'text-gray',
										'mt-1 text-right select-none transition-colors duration-1000'
									)}
								>
									{leavecommentMessage.length} / 600
								</div>
							</UncontrolledInput>
						)}
					</div>
				</div>
				<PrimaryButton
					buttonText={isLoading ? 'Loading' : 'Donate Now'}
					type="submit"
					disabled={isLoading}
				/>
			</form>
		</>
	)
}
