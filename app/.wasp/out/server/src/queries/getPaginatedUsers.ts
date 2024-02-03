import prisma from '../dbClient.js'

import { getPaginatedUsers } from '../ext-src/queries.js'


export default async function (args, context) {
  return (getPaginatedUsers as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
    },
  })
}

export type GetPaginatedUsers = typeof getPaginatedUsers 
