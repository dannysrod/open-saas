import prisma from '../dbClient.js';
import { getAllTasksByUser } from '../ext-src/queries.js';
export default async function (args, context) {
    return getAllTasksByUser(args, Object.assign(Object.assign({}, context), { entities: {
            Task: prisma.task,
        } }));
}
//# sourceMappingURL=getAllTasksByUser.js.map