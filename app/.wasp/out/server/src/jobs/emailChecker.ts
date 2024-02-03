import prisma from '../dbClient.js'
import type { JSONValue, JSONObject } from '../_types/serialization.js'
import { createJob, type JobFn } from './core/pgBoss/pgBossJob.js'
import { checkAndQueueEmails } from '../ext-src/workers/checkAndQueueEmails.js'

const entities = {
  User: prisma.user,
};

export type EmailChecker<Input extends JSONObject, Output extends JSONValue | void> = JobFn<Input, Output, typeof entities>

export const emailChecker = createJob({
  jobName: "emailChecker",
  jobFn: checkAndQueueEmails,
  defaultJobOptions: {},
  jobSchedule: {"cron":"0 7 * * 1","options":{},"args":null},
  entities,
})
