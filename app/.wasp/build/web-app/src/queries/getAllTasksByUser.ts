import { createQuery } from './core'
import { GetAllTasksByUser } from '../../../server/src/queries/getAllTasksByUser'


const query = createQuery<GetAllTasksByUser>(
  'operations/get-all-tasks-by-user',
  ['Task'],
)

export default query
