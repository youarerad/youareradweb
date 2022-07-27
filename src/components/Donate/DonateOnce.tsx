import { DonateOnceConfig } from './DonateConfig'
import { useState, useEffect, SetStateAction } from 'react'
import getStripe from '@utils/hooks/getStripe'
import { trpc } from '@libs/trpc'
import PrimaryButton from '@components/PrimaryButton'
import DonateCustomInput from './DonateCustomInput'
import AppRadioGroup from './AppRadioGroup'
import PayPalButton from '@components/PayPalButton'
import Checkbox from '@components/Checkbox'
import UncontrolledInput from '@components/UnControlledInput'
import classNames from '@utils/classNames'
import Select from '@components/Select'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'

const honorandmemoryOptions = [{ label: 'In honor of' }, { label: 'In memory of' }]

export default function DonateOnce() {
	const router = useRouter()
	const eventId = '?utm_campaign=donaterad&utm_source=google'
	const [currentOption, setCurrentOption] = useState<number>(0)
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

	const [customAmount, setCustomAmount] = useState<number | undefined>(undefined)
	const selectedOption = customAmount
		? {
				priceId: customAmount * 100,
				message: ` will cover ${Math.floor(customAmount / 30)} therapy sessions.`,
		  }
		: DonateOnceConfig[currentOption]

	const { isLoading, ...createCheckout } = trpc.useMutation('checkout.create-onetime-donation')

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

	console.log(selectedOption)

	return (
		<>
			<form onSubmit={handleDonationSubmit}>
				<div className="grid grid-cols-3 gap-4 mb-4">
					<AppRadioGroup
						value={currentOption}
						onChange={(index) => {
							setCurrentOption(index)
							setCustomAmount(undefined)
						}}
						options={DonateOnceConfig.map((option, index) => ({
							label: option.priceLabel,
							value: index,
						}))}
						className="contents"
					/>
					<DonateCustomInput
						value={customAmount}
						onChange={(e) => {
							setCustomAmount(e.currentTarget.valueAsNumber)
							setCurrentOption(e.currentTarget.valueAsNumber ? -1 : 0)
						}}
						activeStyle={customAmount ? true : false}
					/>
					<p className="col-span-3">
						Your donation of{' '}
						<span className="font-bold">{'$' + (selectedOption.priceId / 100).toFixed(0)}</span>
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
										'mt-1 text-right select-none duration-1000'
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
				<PayPalButton key={selectedOption.priceId} donationValue={selectedOption.priceId / 100} />
			</form>
		</>
	)
}
