import { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from 'micro'
import { stripe } from '@libs/stripe'
import Stripe from 'stripe'

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET || ''

export const config = {
  api: {
    bodyParser: false,
  },
}

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature'] || ''
    const event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      webhookSecret
    ) as Stripe.DiscriminatedEvent

    try {
      event
    } catch (err: unknown) {
      if (err instanceof SyntaxError) {
        console.log(`❌ Error message: ${err.message}`)
        res.status(400).send(`Webhook Error: ${err.message}`)
        return
      }
      return
    }

    console.log('✅ Success:', event.id)

    if (event.type === 'payment_intent.created') {
      console.log('Payment Intent Created', event.data.object.id)
    } else if (event.type === 'payment_intent.payment_failed') {
      console.log('Payment Intent Payment Failed', event.data.object.last_payment_error?.message)
    } else if (
      event.type === 'checkout.session.completed' &&
      event.data.object.mode === 'subscription'
    ) {
      if (event.data.object.customer_details?.email) {
        await prisma.donation.create({
          data: {
            name: event.data.object.customer_details.name,
            email: event.data.object.customer_details.email,
            amount: event.data.object.amount_total
              ? Math.floor(event.data.object.amount_total / 100)
              : 0,
            customer_id: event.data.object.id,
            payment_status: 'SUCCESS',
            payment_method: 'STRIPE',
            payment_type: 'MONTHLY',
            User: {
              connectOrCreate: {
                where: {
                  email: event.data.object.customer_details.email.toLowerCase(),
                },
                create: {
                  name: event.data.object.customer_details.name,
                  email: event.data.object.customer_details.email.toLowerCase(),
                  is_monthly: true,
                },
              },
            },
          },
        })
      }
    } else if (
      event.type === 'checkout.session.completed' &&
      event.data.object.mode === 'payment'
    ) {
      if (event.data.object.customer_details?.email) {
        await prisma.donation.create({
          data: {
            name: event.data.object.customer_details.name,
            email: event.data.object.customer_details.email,
            amount: event.data.object.amount_total
              ? Math.floor(event.data.object.amount_total / 100)
              : 0,
            customer_id: event.data.object.id,
            payment_status: 'SUCCESS',
            payment_method: 'STRIPE',
            payment_type: 'ONETIME',
            User: {
              connectOrCreate: {
                where: {
                  email: event.data.object.customer_details.email.toLowerCase(),
                },
                create: {
                  name: event.data.object.customer_details.name,
                  email: event.data.object.customer_details.email.toLowerCase(),
                },
              },
            },
          },
        })
      }
    } else {
      console.warn('Unknown event type:', event.type)
    }
    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default webhookHandler
