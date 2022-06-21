import { NextApiRequest, NextApiResponse } from 'next'
import { buffer, RequestHandler } from 'micro'
import Cors from 'micro-cors'
import { stripe } from '@libs/stripe'
import Stripe from 'stripe'

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET || ''

export const config = {
  api: {
    bodyParser: false,
  },
}

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
})

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature'] || ''

    try {
      const event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      ) as Stripe.DiscriminatedEvent

      console.log('Stripe webhook recieved:', event.type, event.id)
      switch (event.type) {
        case 'checkout.session.completed':
          {
            const donationData = event.data.object
            await prisma.donation.create({
              data: {
                name: donationData.customer_details?.name,
                email: donationData.customer_details?.email,
                amount: donationData.amount_total ? Math.floor(donationData.amount_total / 100) : 0,
                customer_id: donationData.id,
                payment_method: 'STRIPE',
                payment_status: 'SUCCESS',
                payment_type: donationData.mode === 'payment' ? 'ONETIME' : 'MONTHLY',
                User: {
                  connectOrCreate: {
                    where: {
                      email: donationData.customer_details?.email?.toLowerCase() as string,
                    },
                    create: {
                      email: donationData.customer_details?.email?.toLowerCase() as string,
                      name: donationData.customer_details?.name as string,
                      is_monthly: donationData.mode === 'subscription' ? true : false,
                    },
                  },
                },
              },
            })
          }
          break
        case 'payment_intent.payment_failed':
          {
            console.log(
              'Payment failed',
              event.id,
              event.type,
              event.data.object.last_payment_error?.message
            )
          }
          break

        default:
          console.log(event.type)
      }
      res.json({ received: true })
      console.log('Stripe webhook processed:', event.type)
      res.send(200)
    } catch (err: unknown) {
      if (err instanceof SyntaxError) {
        console.log(`Error message: ${err.message}`)
        res.status(400).send(`Webhook Error: ${err.message}`)
        return
      }
      return
    }
  }
}

export default cors(webhookHandler as RequestHandler)
