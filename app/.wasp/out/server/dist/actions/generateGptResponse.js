import prisma from '../dbClient.js';
import { generateGptResponse } from '../ext-src/actions.js';
export default async function (args, context) {
    return generateGptResponse(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
            Task: prisma.task,
            GptResponse: prisma.gptResponse,
        } }));
}
//# sourceMappingURL=generateGptResponse.js.map