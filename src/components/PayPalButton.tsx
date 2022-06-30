import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { trpc } from '@libs/trpc'
import { createContext, useContext } from 'react'

const PaypalClientKey = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_KEY ?? ''

interface PayPalDonorContextProps {
	name: string
	email: string
	amount: number
}

export const PayPalDonorContext = createContext<PayPalDonorContextProps>({
	name: '',
	email: '',
	amount: 0,
})

interface PayPalProps {
	donationValue: number
}

export default function PayPalButton({ donationValue }: PayPalProps) {
	const context = useContext(PayPalDonorContext)

	const { ...createDonation } = trpc.useMutation('user.create-paypal-user')

	return (
		<PayPalScriptProvider
			options={{
				'client-id': PaypalClientKey,
				'enable-funding': 'venmo',
				'disable-funding': 'paylater',
			}}
		>
			<PayPalButtons
				className="pt-10 rounded-xl drop-shadow-xl"
				style={{
					color: 'black',
					label: 'paypal',
					tagline: false,
					layout: 'horizontal',
				}}
				createOrder={(data, actions) => {
					return actions.order.create({
						purchase_units: [
							{
								amount: {
									value: donationValue.toString(),
									breakdown: {
										item_total: {
											currency_code: 'USD',
											value: donationValue.toString(),
										},
									},
								},
								items: [
									{
										name: 'donation',
										quantity: '1',
										unit_amount: {
											currency_code: 'USD',
											value: donationValue.toString(),
										},
										category: 'DONATION',
									},
								],
							},
						],
					})
				}}
				onApprove={async (data, actions) => {
					await actions.order?.capture().then((details) => {
						createDonation
							.mutateAsync({
								name: details.payer.name?.given_name || '',
								email: details.payer.email_address || '',
								amount: donationValue,
								customer_id: details.payer.payer_id || '',
							})
							.then(() => {
								context.name = details.payer.name?.given_name || ''
								context.email = details.payer.email_address || ''
								context.amount = donationValue
							})
					})
				}}
			/>
		</PayPalScriptProvider>
	)
}
