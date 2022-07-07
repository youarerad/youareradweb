import { stripe } from '@libs/stripe'

/* getSessionById sends a request to Stripe to grab the cs_, or checkout session. We leverage the unique checkout session to confirm a donation's status, including if it completed or failed; as well as, using the checkout session to grab information about the session, such as the donation amount and/or who donated. */

export default async function getSessionById(id: string) {
	return await stripe.checkout.sessions.retrieve(id)
}
