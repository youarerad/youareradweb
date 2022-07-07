/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextApiResponse, NextApiRequest } from 'next'
import { Stripe } from 'stripe'
import { stripe } from '@libs/stripe'
import { createNewDonation } from '@utils/hooks/createNewDonation'
import { runMiddleware } from '@utils/middleware'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
import bodyParser from 'body-parser'

export const config = {
	api: {
		bodyParser: false,
	},
}

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	await runMiddleware(req, res, bodyParser.raw({ type: 'application/json' }))

	if (req.method === 'POST') {
		const signature = req.headers['stripe-signature'] as string

		try {
			const event = stripe.webhooks.constructEvent(
				req.body,
				signature,
				webhookSecret
			) as Stripe.DiscriminatedEvent
			res.send(200)
			await createNewDonation(event)
			console.log('Stripe Webook Recieved', event.type)
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
