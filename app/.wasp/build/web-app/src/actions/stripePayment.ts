import { createAction } from './core'
import { StripePayment } from '../../../server/src/actions/stripePayment'

const action = createAction<StripePayment>(
  'operations/stripe-payment',
  ['User'],
)

export default action
