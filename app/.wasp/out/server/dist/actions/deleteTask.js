import prisma from '../dbClient.js';
import { deleteTask } from '../ext-src/actions.js';
export default async function (args, context) {
    return deleteTask(args, Object.assign(Object.assign({}, context), { entities: {
            Task: prisma.task,
        } }));
}
//# sourceMappingURL=deleteTask.js.map