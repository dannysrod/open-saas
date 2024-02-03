import prisma from '../dbClient.js';
import { createTask } from '../ext-src/actions.js';
export default async function (args, context) {
    return createTask(args, Object.assign(Object.assign({}, context), { entities: {
            Task: prisma.task,
        } }));
}
//# sourceMappingURL=createTask.js.map