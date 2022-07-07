import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { trpc } from '@libs/trpc'

const PaypalClientKey = process.env.PAYPAL_CLIENT_KEY ?? ''

interface PayPalProps {
	donationValue: number
}

export default function PayPalButton({ donationValue }: PayPalProps) {
	const { ...createDonation } = trpc.useMutation('user.create-paypal-user')
	const ConvertStripeNumbers = Math.floor(donationValue / 100)
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
									value: ConvertStripeNumbers.toString(),
									breakdown: {
										item_total: {
											currency_code: 'USD',
											value: ConvertStripeNumbers.toString(),
										},
									},
								},
								items: [
									{
										name: 'donation',
										quantity: '1',
										unit_amount: {
											currency_code: 'USD',
											value: ConvertStripeNumbers.toString(),
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
						createDonation.mutateAsync({
							name: details.payer.name?.given_name || '',
							email: details.payer.email_address || '',
							amount: donationValue,
							customer_id: details.payer.payer_id || '',
							honor: localStorage.getItem('inhonorMessage') || '',
							message: localStorage.getItem('leavecommentMessage') || '',
						})
					})
				}}
			/>
		</PayPalScriptProvider>
	)
}
