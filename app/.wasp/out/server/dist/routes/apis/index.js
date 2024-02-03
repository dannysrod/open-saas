import express from 'express';
import prisma from '../../dbClient.js';
import { handleRejection } from '../../utils.js';
import { globalMiddlewareConfigForExpress } from '../../middleware/index.js';
import auth from '../../core/auth.js';
import { stripeWebhook as _waspstripeWebhookfn } from '../../ext-src/webhooks/stripe.js';
import { stripeMiddlewareFn as _waspstripeWebhookmiddlewareConfigFn } from '../../ext-src/webhooks/stripe.js';
const idFn = x => x;
const router = express.Router();
const stripeWebhookMiddleware = globalMiddlewareConfigForExpress(_waspstripeWebhookmiddlewareConfigFn);
router.post('/stripe-webhook', [auth, ...stripeWebhookMiddleware], handleRejection((req, res) => {
    const context = {
        user: req.user,
        entities: {
            User: prisma.user,
        },
    };
    return _waspstripeWebhookfn(req, res, context);
}));
export default router;
//# sourceMappingURL=index.js.map