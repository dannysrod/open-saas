import prisma from '../dbClient.js'

import { updateUserById } from '../ext-src/actions.js'


export default async function (args, context) {
  return (updateUserById as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
    },
  })
}

export type UpdateUserById = typeof updateUserById 
