import Stripe from 'stripe'
import { stripe } from '@libs/stripe'

/* create-checkout contains our core router functions for making donations on youarerad.org. They outline the type of checkout session to be created, what information to include, and contain an export variable that we can later use to fill out the amount donated. Within createMonthlyDonation, a priceId is required instead of a number. This priceId is a unique string created on Stripe that is directly connected to a monthly giving amount.  */

const ORIGIN_URL = 'https://youarerad.org/' ?? 'http://localhost:3000'

export async function createOneTimeDonation(amount: number) {
  const params: Stripe.Checkout.SessionCreateParams = {
    submit_type: 'donate',
    payment_method_types: ['card', 'us_bank_account'],
    line_items: [
      {
        name: 'One-time donation',
        amount: amount,
        currency: 'usd',
        quantity: 1,
        description:
          'One-time donation to Rise Above The Disorder, a 501(c)(3) non-profit organization. Thank you for supporting our mission to provide mental health care to everyone, everywhere!',
      },
    ],
    success_url: `${ORIGIN_URL}/donationcomplete?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${ORIGIN_URL}/`,
  }
  return await stripe.checkout.sessions.create(params)
}

export async function createMonthlyDonation(priceId: string) {
  const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    payment_method_types: ['card', 'us_bank_account'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
        description:
          'Monthly donation to Rise Above The Disorder, a 501(c)(3) non-profit organization. Thank you for becoming a monthly donor and supporting our mission to provide mental health care to everyone, everywhere!',
      },
    ],
    success_url: `${ORIGIN_URL}/donationcomplete?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${ORIGIN_URL}/`,
  }
  return await stripe.checkout.sessions.create(params)
}
