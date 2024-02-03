import prisma from '../dbClient.js';
import { createJob } from './core/pgBoss/pgBossJob.js';
import { checkAndQueueEmails } from '../ext-src/workers/checkAndQueueEmails.js';
const entities = {
    User: prisma.user,
};
export const emailChecker = createJob({
    jobName: "emailChecker",
    jobFn: checkAndQueueEmails,
    defaultJobOptions: {},
    jobSchedule: { "cron": "0 7 * * 1", "options": {}, "args": null },
    entities,
});
//# sourceMappingURL=emailChecker.js.map