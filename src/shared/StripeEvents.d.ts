/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
import Stripe from 'stripe'

declare module 'stripe' {
	namespace Stripe {
		/** Covering All Our Event Options */
		type StripeEvent =
			| CheckoutSessionEvent
			| CustomerSubscriptionEvent
			| OrderEvent
			| PaymentIntentEvent
			| PaymentMethodEvent
			| ProductEvent
			| SetupIntentEvent
			| SubscriptionScheduledEvent

		interface BaseEvent {
			id: string
			object: 'event'
			account?: string
			api_version: string | null
			created: number
			livemode: boolean
			pending_webhooks: number
			request: Event.Request | null
		}

		namespace StripeEvent {
			interface Data<T> {
				object: T
				previous_attributes?: Partial<T>
			}

			namespace Data {
				interface Object {}
				interface PreviousAttributes {}
			}

			interface Request {
				id: string | null
				idempotency_key: string | null
			}
		}

		interface CheckoutSessionEvent extends BaseEvent {
			type: 'checkout.session.completed'
			data: StripeEvent.Data<Stripe.Checkout.Session>
		}

		interface CustomerSubscriptionEvent extends BaseEvent {
			type:
				| 'customer.subscription.created'
				| 'customer.subscription.deleted'
				| 'customer.subscription.pending_update_applied'
				| 'customer.subscription.pending_update_expired'
				| 'customer.subscription.trial_will_end'
				| 'customer.subscription.updated'
			data: StripeEvent.Data<Stripe.Subscription>
		}

		interface OrderEvent extends BaseEvent {
			type: 'order.created' | 'order.payment_failed' | 'order.payment_succeeded' | 'order.updated'
			data: StripeEvent.Data<Stripe.Order>
		}

		interface PaymentIntentEvent extends BaseEvent {
			type:
				| 'payment_intent.amount_capturable_updated'
				| 'payment_intent.canceled'
				| 'payment_intent.created'
				| 'payment_intent.payment_failed'
				| 'payment_intent.succeeded'
			data: StripeEvent.Data<Stripe.PaymentIntent>
		}

		interface PaymentMethodEvent extends BaseEvent {
			type:
				| 'payment_method.attached'
				| 'payment_method.card_automatically_updated'
				| 'payment_method.detached'
				| 'payment_method.updated'
			data: StripeEvent.Data<Stripe.PaymentMethod>
		}

		interface ProductEvent extends BaseEvent {
			type: 'product.created' | 'product.deleted' | 'product.updated'
			data: StripeEvent.Data<Stripe.Product>
		}

		interface SetupIntentEvent extends BaseEvent {
			type:
				| 'setup_intent.canceled'
				| 'setup_intent.created'
				| 'setup_intent.setup_failed'
				| 'setup_intent.succeeded'
			data: StripeEvent.Data<Stripe.SetupIntent>
		}

		interface SubscriptionScheduledEvent extends BaseEvent {
			type:
				| 'subscription_schedule.aborted'
				| 'subscription_schedule.canceled'
				| 'subscription_schedule.completed'
				| 'subscription_schedule.created'
				| 'subscription_schedule.expiring'
				| 'subscription_schedule.released'
				| 'subscription_schedule.updated'
			data: StripeEvent.Data<Stripe.SubscriptionSchedule>
		}
	}
}
