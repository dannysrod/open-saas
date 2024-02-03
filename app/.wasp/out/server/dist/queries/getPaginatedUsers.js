import prisma from '../dbClient.js';
import { getPaginatedUsers } from '../ext-src/queries.js';
export default async function (args, context) {
    return getPaginatedUsers(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
        } }));
}
//# sourceMappingURL=getPaginatedUsers.js.map