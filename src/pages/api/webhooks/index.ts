/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextApiResponse, NextApiRequest } from 'next'
import { Stripe } from 'stripe'
import getRawBody from 'raw-body'
import { stripe } from '@libs/stripe'
import { createNewDonation } from '@utils/hooks/createNewDonation'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export const config = {
  api: {
    bodyParser: false,
  },
}

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'POST') {
    const rawBody = await getRawBody(req)
    const signature = req.headers['stripe-signature'] as string

    try {
      const event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret
      ) as Stripe.DiscriminatedEvent
      await createNewDonation(event)
      console.log('Stripe Webook Recieved', event.type)
      res.send(200)
    } catch (err: unknown) {
      if (err instanceof SyntaxError) {
        console.log(`Error message: ${err.message}`)
        res.status(400).send(`Webhook Error: ${err.message}`)
        return
      }
    }
  }
}

export default webhookHandler
