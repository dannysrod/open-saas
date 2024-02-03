import prisma from '../dbClient.js'

import { createTask } from '../ext-src/actions.js'


export default async function (args, context) {
  return (createTask as any)(args, {
    ...context,
    entities: {
      Task: prisma.task,
    },
  })
}

export type CreateTask = typeof createTask 
