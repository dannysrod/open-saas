import prisma from '../dbClient.js'

import { updateCurrentUser } from '../ext-src/actions.js'


export default async function (args, context) {
  return (updateCurrentUser as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
    },
  })
}

export type UpdateCurrentUser = typeof updateCurrentUser 
