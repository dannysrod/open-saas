import prisma from '../dbClient.js';
import { updateUserById } from '../ext-src/actions.js';
export default async function (args, context) {
    return updateUserById(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
        } }));
}
//# sourceMappingURL=updateUserById.js.map