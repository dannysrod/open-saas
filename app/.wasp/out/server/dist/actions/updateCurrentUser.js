import prisma from '../dbClient.js';
import { updateCurrentUser } from '../ext-src/actions.js';
export default async function (args, context) {
    return updateCurrentUser(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
        } }));
}
//# sourceMappingURL=updateCurrentUser.js.map