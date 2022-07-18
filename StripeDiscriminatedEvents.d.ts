/* eslint-disable @typescript-eslint/no-empty-interface */
import Stripe from 'stripe'

declare module 'stripe' {
	namespace Stripe {
		/**
		 * The Event object.
		 */
		type DiscriminatedEvent =
			| AccountApplicationEvent
			| AccountExternalAccountEvent
			| ApplicationFeeEvent
			| ApplicationFeeRefundEvent
			| BalanceEvent
			| CapabilityEvent
			| ChargeEvent
			| ChargeDisputeEvent
			| ChargeRefundEvent
			| CheckoutSessionEvent
			| CouponEvent
			| CreditNoteEvent
			| CustomerEvent
			| CustomerDiscountEvent
			| CustomerSourceEvent
			| CustomerSubscriptionEvent
			| CustomerTaxIdEvent
			| FileEvent
			| InvoiceEvent
			| InvoiceItemEvent
			| IssuingAuthorizationEvent
			| IssuingCardEvent
			| IssuingCardholderEvent
			| IssuingDisputeEvent
			| IssuingSettlementEvent
			| IssuingTransactionEvent
			| MandateEvent
			| OrderEvent
			| OrderReturnEvent
			| PaymentIntentEvent
			| PaymentMethodEvent
			| PayoutEvent
			| PersonEvent
			| PlanEvent
			| ProductEvent
			| RadarEarlyFraudWarningEvent
			| RecipientEvent
			| ReportRunEvent
			| ReviewEvent
			| SetupIntentEvent
			| SigmaScheduledQueryRunEvent
			| SkuEvent
			| SourceEvent
			| SourceTransactionEvent
			| SubscriptionScheduledEvent
			| TaxRateEvent
			| TopupEvent
			| TransferEvent

		interface BaseEvent {
			/**
			 * Unique identifier for the object.
			 */
			id: string

			/**
			 * String representing the object's type. Objects of the same type share the same value.
			 */
			object: 'event'

			/**
			 * The connected account that originated the event.
			 */
			account?: string

			/**
			 * The Stripe API version used to render `data`. *Note: This property is populated only for events on or after October 31, 2014*.
			 */
			api_version: string | null

			/**
			 * Time at which the object was created. Measured in seconds since the Unix epoch.
			 */
			created: number

			/**
			 * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
			 */
			livemode: boolean

			/**
			 * Number of webhooks that have yet to be successfully delivered (i.e., to return a 20x response) to the URLs you've specified.
			 */
			pending_webhooks: number

			/**
			 * Information on the API request that instigated the event.
			 */
			request: Event.Request | null
		}

		namespace DiscriminatedEvent {
			interface Data<T> {
				/**
				 * Object containing the API resource relevant to the event. For example, an `invoice.created` event will have a full [invoice object](https://stripe.com/docs/api#invoice_object) as the value of the object key.
				 */
				object: T

				/**
				 * Object containing the names of the attributes that have changed, and their previous values (sent along only with *.updated events).
				 */
				previous_attributes?: Partial<T>
			}

			namespace Data {
				interface Object {}

				interface PreviousAttributes {}
			}

			interface Request {
				/**
				 * ID of the API request that caused the event. If null, the event was automatic (e.g., Stripe's automatic subscription handling). Request logs are available in the [dashboard](https://dashboard.stripe.com/logs), but currently not in the API.
				 */
				id: string | null

				/**
				 * The idempotency key transmitted during the request, if any. *Note: This property is populated only for events on or after May 23, 2017*.
				 */
				idempotency_key: string | null
			}
		}

		interface AccountUpdatedEvent extends BaseEvent {
			type: 'account.updated'
			data: DiscriminatedEvent.Data<Stripe.Account>
		}

		interface AccountApplicationEvent extends BaseEvent {
			type: 'account.application.authorized' | 'account.application.deauthorized'
			data: DiscriminatedEvent.Data<Stripe.Application>
		}

		interface AccountExternalAccountEvent extends BaseEvent {
			type:
				| 'account.external_account.created'
				| 'account.external_account.deleted'
				| 'account.external_account.updated'
			data: DiscriminatedEvent.Data<Stripe.BankAccount | Stripe.Card>
		}

		interface ApplicationFeeEvent extends BaseEvent {
			type: 'application_fee.created' | 'application_fee.refunded'
			data: DiscriminatedEvent.Data<Stripe.ApplicationFee>
		}

		interface ApplicationFeeRefundEvent extends BaseEvent {
			type: 'application_fee.refund.updated'
			data: DiscriminatedEvent.Data<Stripe.FeeRefund>
		}

		interface BalanceEvent extends BaseEvent {
			type: 'balance.available'
			data: DiscriminatedEvent.Data<Stripe.Balance>
		}

		interface CapabilityEvent extends BaseEvent {
			type: 'capability.updated'
			data: DiscriminatedEvent.Data<Stripe.Capability>
		}

		interface ChargeEvent extends BaseEvent {
			type:
				| 'charge.captured'
				| 'charge.expired'
				| 'charge.failed'
				| 'charge.pending'
				| 'charge.refunded'
				| 'charge.succeeded'
				| 'charge.updated'
			data: DiscriminatedEvent.Data<Stripe.Charge>
		}

		interface ChargeDisputeEvent extends BaseEvent {
			type:
				| 'charge.dispute.closed'
				| 'charge.dispute.created'
				| 'charge.dispute.funds_reinstated'
				| 'charge.dispute.funds_withdrawn'
				| 'charge.dispute.updated'
			data: DiscriminatedEvent.Data<Stripe.Dispute>
		}

		interface ChargeRefundEvent extends BaseEvent {
			type: 'charge.refund.updated'
			data: DiscriminatedEvent.Data<Stripe.Refund>
		}

		interface CheckoutSessionEvent extends BaseEvent {
			type: 'checkout.session.completed'
			data: DiscriminatedEvent.Data<Stripe.Checkout.Session>
		}

		interface CouponEvent extends BaseEvent {
			type: 'coupon.created' | 'coupon.deleted' | 'coupon.updated'
			data: DiscriminatedEvent.Data<Stripe.Coupon>
		}

		interface CreditNoteEvent extends BaseEvent {
			type: 'credit_note.created' | 'credit_note.updated' | 'credit_note.voided'
			data: DiscriminatedEvent.Data<Stripe.CreditNote>
		}

		interface CustomerEvent extends BaseEvent {
			type: 'customer.created' | 'customer.deleted' | 'customer.updated'
			data: DiscriminatedEvent.Data<Stripe.Customer>
		}

		interface CustomerDiscountEvent extends BaseEvent {
			type: 'customer.discount.created' | 'customer.discount.deleted' | 'customer.discount.updated'
			data: DiscriminatedEvent.Data<Stripe.Discount>
		}

		interface CustomerSourceEvent extends BaseEvent {
			type:
				| 'customer.source.created'
				| 'customer.source.deleted'
				| 'customer.source.expiring'
				| 'customer.source.updated'
			data: DiscriminatedEvent.Data<Stripe.Source>
		}

		interface CustomerSubscriptionEvent extends BaseEvent {
			type:
				| 'customer.subscription.created'
				| 'customer.subscription.deleted'
				| 'customer.subscription.pending_update_applied'
				| 'customer.subscription.pending_update_expired'
				| 'customer.subscription.trial_will_end'
				| 'customer.subscription.updated'
			data: DiscriminatedEvent.Data<Stripe.Subscription>
		}

		interface CustomerTaxIdEvent extends BaseEvent {
			type: 'customer.tax_id.created' | 'customer.tax_id.deleted' | 'customer.tax_id.updated'
			data: DiscriminatedEvent.Data<Stripe.TaxId>
		}

		interface FileEvent extends BaseEvent {
			type: 'file.created'
			data: DiscriminatedEvent.Data<Stripe.File>
		}

		interface InvoiceEvent extends BaseEvent {
			type:
				| 'invoice.created'
				| 'invoice.deleted'
				| 'invoice.finalized'
				| 'invoice.marked_uncollectible'
				| 'invoice.payment_action_required'
				| 'invoice.payment_failed'
				| 'invoice.payment_succeeded'
				| 'invoice.sent'
				| 'invoice.upcoming'
				| 'invoice.updated'
				| 'invoice.voided'
			data: DiscriminatedEvent.Data<Stripe.Invoice>
		}

		interface InvoiceItemEvent extends BaseEvent {
			type: 'invoiceitem.created' | 'invoiceitem.deleted' | 'invoiceitem.updated'
			data: DiscriminatedEvent.Data<Stripe.InvoiceItem>
		}

		interface IssuingAuthorizationEvent extends BaseEvent {
			type:
				| 'issuing_authorization.created'
				| 'issuing_authorization.request'
				| 'issuing_authorization.updated'
			data: DiscriminatedEvent.Data<Stripe.Issuing.Authorization>
		}

		interface IssuingCardEvent extends BaseEvent {
			type: 'issuing_card.created' | 'issuing_card.updated'
			data: DiscriminatedEvent.Data<Stripe.Issuing.Card>
		}

		interface IssuingCardholderEvent extends BaseEvent {
			type: 'issuing_cardholder.created' | 'issuing_cardholder.updated'
			data: DiscriminatedEvent.Data<Stripe.Issuing.Cardholder>
		}

		interface IssuingDisputeEvent extends BaseEvent {
			type: 'issuing_dispute.created' | 'issuing_dispute.updated'
			data: DiscriminatedEvent.Data<Stripe.Issuing.Dispute>
		}

		interface IssuingSettlementEvent extends BaseEvent {
			type: 'issuing_settlement.created' | 'issuing_settlement.updated'
			data: DiscriminatedEvent.Data<any> // TODO: Find out what this type really is - https://stripe.com/docs/api/events/types#event_types-issuing_settlement.created
		}

		interface IssuingTransactionEvent extends BaseEvent {
			type: 'issuing_transaction.created' | 'issuing_transaction.updated'
			data: DiscriminatedEvent.Data<Stripe.Issuing.Transaction>
		}

		interface MandateEvent extends BaseEvent {
			type: 'mandate.updated'
			data: DiscriminatedEvent.Data<Stripe.Mandate>
		}

		interface OrderEvent extends BaseEvent {
			type: 'order.created' | 'order.payment_failed' | 'order.payment_succeeded' | 'order.updated'
			data: DiscriminatedEvent.Data<Stripe.Order>
		}

		interface OrderReturnEvent extends BaseEvent {
			type: 'order_return.created'
			data: DiscriminatedEvent.Data<Stripe.OrderReturn>
		}

		interface PaymentIntentEvent extends BaseEvent {
			type:
				| 'payment_intent.amount_capturable_updated'
				| 'payment_intent.canceled'
				| 'payment_intent.created'
				| 'payment_intent.payment_failed'
				| 'payment_intent.succeeded'
			data: DiscriminatedEvent.Data<Stripe.PaymentIntent>
		}

		interface PaymentMethodEvent extends BaseEvent {
			type:
				| 'payment_method.attached'
				| 'payment_method.card_automatically_updated'
				| 'payment_method.detached'
				| 'payment_method.updated'
			data: DiscriminatedEvent.Data<Stripe.PaymentMethod>
		}

		interface PayoutEvent extends BaseEvent {
			type:
				| 'payout.canceled'
				| 'payout.created'
				| 'payout.failed'
				| 'payout.paid'
				| 'payout.updated'
			data: DiscriminatedEvent.Data<Stripe.Payout>
		}

		interface PersonEvent extends BaseEvent {
			type: 'person.created' | 'person.deleted' | 'person.updated'
			data: DiscriminatedEvent.Data<Stripe.Person>
		}

		interface PlanEvent extends BaseEvent {
			type: 'plan.created' | 'plan.deleted' | 'plan.updated'
			data: DiscriminatedEvent.Data<Stripe.Plan>
		}

		interface ProductEvent extends BaseEvent {
			type: 'product.created' | 'product.deleted' | 'product.updated'
			data: DiscriminatedEvent.Data<Stripe.Product>
		}

		interface RadarEarlyFraudWarningEvent extends BaseEvent {
			type: 'radar.early_fraud_warning.created' | 'radar.early_fraud_warning.updated'
			data: DiscriminatedEvent.Data<Stripe.Radar.EarlyFraudWarning>
		}

		interface RecipientEvent extends BaseEvent {
			type: 'recipient.created' | 'recipient.deleted' | 'recipient.updated'
			data: DiscriminatedEvent.Data<Stripe.Recipient>
		}

		interface ReportRunEvent extends BaseEvent {
			type:
				| 'reporting.report_run.failed'
				| 'reporting.report_run.succeeded'
				| 'reporting.report_type.updated'
			data: DiscriminatedEvent.Data<Stripe.Reporting.ReportRun>
		}

		interface ReviewEvent extends BaseEvent {
			type: 'review.closed' | 'review.opened'
			data: DiscriminatedEvent.Data<Stripe.Review>
		}

		interface SetupIntentEvent extends BaseEvent {
			type:
				| 'setup_intent.canceled'
				| 'setup_intent.created'
				| 'setup_intent.setup_failed'
				| 'setup_intent.succeeded'
			data: DiscriminatedEvent.Data<Stripe.SetupIntent>
		}

		interface SigmaScheduledQueryRunEvent extends BaseEvent {
			type: 'sigma.scheduled_query_run.created'
			data: DiscriminatedEvent.Data<Stripe.Sigma.ScheduledQueryRun>
		}

		interface SkuEvent extends BaseEvent {
			type: 'sku.created' | 'sku.deleted' | 'sku.updated'
			data: DiscriminatedEvent.Data<Stripe.Sku>
		}

		interface SourceEvent extends BaseEvent {
			type:
				| 'source.canceled'
				| 'source.chargeable'
				| 'source.failed'
				| 'source.mandate_notification'
				| 'source.refund_attributes_required'
			data: DiscriminatedEvent.Data<Stripe.Source>
		}

		interface SourceTransactionEvent extends BaseEvent {
			type: 'source.transaction.created' | 'source.transaction.updated'
			data: DiscriminatedEvent.Data<Stripe.SourceTransaction>
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
			data: DiscriminatedEvent.Data<Stripe.SubscriptionSchedule>
		}

		interface TaxRateEvent extends BaseEvent {
			type: 'tax_rate.created' | 'tax_rate.updated'
			data: DiscriminatedEvent.Data<Stripe.TaxRate>
		}

		interface TopupEvent extends BaseEvent {
			type:
				| 'topup.canceled'
				| 'topup.created'
				| 'topup.failed'
				| 'topup.reversed'
				| 'topup.succeeded'
			data: DiscriminatedEvent.Data<Stripe.Topup>
		}

		interface TransferEvent extends BaseEvent {
			type: 'transfer.created' | 'transfer.failed' | 'transfer.paid' | 'transfer.updated'
			data: DiscriminatedEvent.Data<Stripe.Transfer>
		}
	}
}
