import prisma from '../dbClient.js'

import { deleteTask } from '../ext-src/actions.js'


export default async function (args, context) {
  return (deleteTask as any)(args, {
    ...context,
    entities: {
      Task: prisma.task,
    },
  })
}

export type DeleteTask = typeof deleteTask 
