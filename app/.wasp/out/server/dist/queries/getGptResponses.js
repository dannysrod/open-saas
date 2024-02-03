import prisma from '../dbClient.js';
import { getGptResponses } from '../ext-src/queries.js';
export default async function (args, context) {
    return getGptResponses(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
            GptResponse: prisma.gptResponse,
        } }));
}
//# sourceMappingURL=getGptResponses.js.map