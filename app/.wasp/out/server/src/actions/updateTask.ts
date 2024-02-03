import prisma from '../dbClient.js'

import { updateTask } from '../ext-src/actions.js'


export default async function (args, context) {
  return (updateTask as any)(args, {
    ...context,
    entities: {
      Task: prisma.task,
    },
  })
}

export type UpdateTask = typeof updateTask 
