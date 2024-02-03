import { pgBossStarted } from './pgBoss.js';
import { Job, SubmittedJob } from '../job.js';
export const PG_BOSS_EXECUTOR_NAME = Symbol('PgBoss');
/**
 * Creates an instance of PgBossJob and initializes the PgBoss executor by registering this job function.
 * We expect this to be called once per job name. If called multiple times with the same name and different
 * functions, we will override the previous calls.
 */
export function createJob({ jobName, jobFn, defaultJobOptions, jobSchedule, entities, }) {
    // NOTE(shayne): We are not awaiting `pgBossStarted` here since we need to return an instance to the job
    // template, or else the NodeJS module bootstrapping process will block and fail as it would then depend
    // on a runtime resolution of the promise in `startServer()`.
    // Since `pgBossStarted` will resolve in the future, it may appear possible to send pg-boss
    // a job before we actually have registered the handler via `boss.work()`. However, even if NodeJS does
    // not execute this callback before any job `submit()` calls, this is not a problem since pg-boss allows you
    // to submit jobs even if there are no workers registered.
    // Once they are registered, they will just start on the first job in their queue.
    pgBossStarted.then(async (boss) => {
        // As a safety precaution against undefined behavior of registering different
        // functions for the same job name, remove all registered functions first.
        await boss.offWork(jobName);
        // This tells pg-boss to run given worker function when job with that name is submitted.
        // Ref: https://github.com/timgit/pg-boss/blob/master/docs/readme.md#work
        await boss.work(jobName, pgBossCallbackWrapper(jobFn, entities));
        // If a job schedule is provided, we should schedule the recurring job.
        // If the schedule name already exists, it's updated to the provided cron expression, arguments, and options.
        // Ref: https://github.com/timgit/pg-boss/blob/master/docs/readme.md#scheduling
        if (jobSchedule) {
            const options = Object.assign(Object.assign({}, defaultJobOptions), jobSchedule.options);
            await boss.schedule(jobName, jobSchedule.cron, jobSchedule.args || null, options);
        }
    });
    return new PgBossJob(jobName, defaultJobOptions);
}
/**
 * This is an interface repesenting a job that can be submitted to pg-boss.
 * It is not yet submitted until the caller invokes `submit()` on an instance.
 * The caller can make as many calls to `submit()` as they wish.
 */
class PgBossJob extends Job {
    constructor(jobName, defaultJobOptions, startAfter) {
        super(jobName, PG_BOSS_EXECUTOR_NAME);
        this.defaultJobOptions = defaultJobOptions;
        this.startAfter = startAfter;
    }
    delay(startAfter) {
        return new PgBossJob(this.jobName, this.defaultJobOptions, startAfter);
    }
    async submit(jobArgs, jobOptions = {}) {
        const boss = await pgBossStarted;
        const jobId = await boss.send(this.jobName, jobArgs, Object.assign(Object.assign(Object.assign({}, this.defaultJobOptions), (this.startAfter && { startAfter: this.startAfter })), jobOptions));
        return new PgBossSubmittedJob(boss, this, jobId);
    }
}
/**
 * A pg-boss specific SubmittedJob that adds additional pg-boss functionality.
 */
class PgBossSubmittedJob extends SubmittedJob {
    constructor(boss, job, jobId) {
        super(job, jobId);
        this.pgBoss = {
            cancel: () => boss.cancel(jobId),
            resume: () => boss.resume(jobId),
            // Coarcing here since pg-boss typings are not precise enough.
            details: () => boss.getJobById(jobId),
        };
    }
}
/**
 * Wraps the normal pg-boss callback function to inject entities, as well as extract
 * the `data` property so the arguments passed into the job are the exact same as those received.
 */
function pgBossCallbackWrapper(
// jobFn - The user-defined async job callback function.
jobFn, 
// Entities used by job, passed into callback context.
entities) {
    return (args) => {
        const context = { entities };
        return jobFn(args.data, context);
    };
}
//# sourceMappingURL=pgBossJob.js.map