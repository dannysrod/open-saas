import express from 'express'
import prisma from '../../dbClient.js'
import { handleRejection } from '../../utils.js'
import { MiddlewareConfigFn, globalMiddlewareConfigForExpress } from '../../middleware/index.js'
import auth from '../../core/auth.js'
import { type SanitizedUser } from '../../_types'


import { stripeWebhook as _waspstripeWebhookfn } from '../../ext-src/webhooks/stripe.js'
import { stripeMiddlewareFn as _waspstripeWebhookmiddlewareConfigFn } from '../../ext-src/webhooks/stripe.js'

const idFn: MiddlewareConfigFn = x => x


const router = express.Router()


const stripeWebhookMiddleware = globalMiddlewareConfigForExpress(_waspstripeWebhookmiddlewareConfigFn)
router.post(
  '/stripe-webhook',
  [auth, ...stripeWebhookMiddleware],
  handleRejection(
    (
      req: Parameters<typeof _waspstripeWebhookfn>[0] & { user: SanitizedUser },
      res: Parameters<typeof _waspstripeWebhookfn>[1],
    ) => {
      const context = {
        user: req.user,
        entities: {
          User: prisma.user,
        },
      }
      return _waspstripeWebhookfn(req, res, context)
    }
  )
)

export default router
