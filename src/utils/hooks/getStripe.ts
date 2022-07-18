/* getStripe creates a stripe promise with our key emebded in the promise. We ise getStripe when making public, client side requests to stripe.  */

import { Stripe, loadStripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
const getStripe = () => {
	if (!stripePromise) {
		stripePromise = loadStripe(stripePublishableKey)
	}
	return stripePromise
}

export default getStripe
