import prisma from '../dbClient.js';
import { getDailyStats } from '../ext-src/queries.js';
export default async function (args, context) {
    return getDailyStats(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
            DailyStats: prisma.dailyStats,
        } }));
}
//# sourceMappingURL=getDailyStats.js.map