/* stripe allows for access to Stripe's node API, which requires our unique secret key. Mainly used for accessing the checkout API.*/

import Stripe from 'stripe'
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2020-08-27',
})
