import Stripe from 'stripe'
import { stripe } from '@libs/stripe'

/* create-checkout contains our core router functions for making donations on youarerad.org. They outline the type of checkout session to be created, what information to include, and contain an export variable that we can later use to fill out the amount donated. Within createMonthlyDonation, a priceId is required instead of a number. This priceId is a unique string created on Stripe that is directly connected to a monthly giving amount.  */

const ORIGIN_URL = 'https://youarerad.org' ?? 'http://localhost:3000'

export async function createOneTimeDonation(priceId: number, honor?: string, message?: string) {
	const params: Stripe.Checkout.SessionCreateParams = {
		mode: 'payment',
		metadata: {
			onBehalfof: (honor as string) || '',
			message: (message as string) || '',
		},
		payment_method_types: ['card', 'us_bank_account'],
		line_items: [
			{
				name: 'Donation',
				amount: priceId,
				currency: 'usd',
				quantity: 1,
				description: `Donation to Rise Above The Disorder, a 501(c)(3) non-profit organization${
					', ' + honor
				}. Thank you for supporting our mission to provide mental health care to everyone, everywhere!`,
			},
		],
		success_url: `${ORIGIN_URL}/donationcomplete?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${ORIGIN_URL}/donate`,
	}
	return await stripe.checkout.sessions.create(params)
}

export async function createMonthlyDonation(priceId: string, honor?: string, message?: string) {
	const params: Stripe.Checkout.SessionCreateParams = {
		mode: 'subscription',
		metadata: {
			onBehalfof: (honor as string) || '',
			message: (message as string) || '',
		},
		payment_method_types: ['card', 'us_bank_account'],
		line_items: [
			{
				price: priceId,
				quantity: 1,
				description: `Donation to Rise Above The Disorder, a 501(c)(3) non-profit organization${
					', ' + honor
				}. Thank you for supporting our mission to provide mental health care to everyone, everywhere!`,
			},
		],
		success_url: `${ORIGIN_URL}/donationcomplete?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${ORIGIN_URL}/donate`,
	}
	return await stripe.checkout.sessions.create(params)
}
