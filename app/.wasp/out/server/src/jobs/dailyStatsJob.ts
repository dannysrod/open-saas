import prisma from '../dbClient.js'
import type { JSONValue, JSONObject } from '../_types/serialization.js'
import { createJob, type JobFn } from './core/pgBoss/pgBossJob.js'
import { calculateDailyStats } from '../ext-src/workers/calculateDailyStats.js'

const entities = {
  User: prisma.user,
  DailyStats: prisma.dailyStats,
  Logs: prisma.logs,
  PageViewSource: prisma.pageViewSource,
};

export type DailyStatsJob<Input extends JSONObject, Output extends JSONValue | void> = JobFn<Input, Output, typeof entities>

export const dailyStatsJob = createJob({
  jobName: "dailyStatsJob",
  jobFn: calculateDailyStats,
  defaultJobOptions: {},
  jobSchedule: {"cron":"0 * * * *","options":{},"args":null},
  entities,
})
