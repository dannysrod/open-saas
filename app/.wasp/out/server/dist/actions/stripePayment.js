import prisma from '../dbClient.js';
import { stripePayment } from '../ext-src/actions.js';
export default async function (args, context) {
    return stripePayment(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
        } }));
}
//# sourceMappingURL=stripePayment.js.map