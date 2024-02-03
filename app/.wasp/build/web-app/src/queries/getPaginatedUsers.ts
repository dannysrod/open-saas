import { createQuery } from './core'
import { GetPaginatedUsers } from '../../../server/src/queries/getPaginatedUsers'


const query = createQuery<GetPaginatedUsers>(
  'operations/get-paginated-users',
  ['User'],
)

export default query
