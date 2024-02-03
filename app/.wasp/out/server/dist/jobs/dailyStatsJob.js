import prisma from '../dbClient.js';
import { createJob } from './core/pgBoss/pgBossJob.js';
import { calculateDailyStats } from '../ext-src/workers/calculateDailyStats.js';
const entities = {
    User: prisma.user,
    DailyStats: prisma.dailyStats,
    Logs: prisma.logs,
    PageViewSource: prisma.pageViewSource,
};
export const dailyStatsJob = createJob({
    jobName: "dailyStatsJob",
    jobFn: calculateDailyStats,
    defaultJobOptions: {},
    jobSchedule: { "cron": "0 * * * *", "options": {}, "args": null },
    entities,
});
//# sourceMappingURL=dailyStatsJob.js.map