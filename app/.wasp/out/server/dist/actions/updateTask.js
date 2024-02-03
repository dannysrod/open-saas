import prisma from '../dbClient.js';
import { updateTask } from '../ext-src/actions.js';
export default async function (args, context) {
    return updateTask(args, Object.assign(Object.assign({}, context), { entities: {
            Task: prisma.task,
        } }));
}
//# sourceMappingURL=updateTask.js.map