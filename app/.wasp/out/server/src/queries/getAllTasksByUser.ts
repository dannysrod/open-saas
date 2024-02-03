import prisma from '../dbClient.js'

import { getAllTasksByUser } from '../ext-src/queries.js'


export default async function (args, context) {
  return (getAllTasksByUser as any)(args, {
    ...context,
    entities: {
      Task: prisma.task,
    },
  })
}

export type GetAllTasksByUser = typeof getAllTasksByUser 
