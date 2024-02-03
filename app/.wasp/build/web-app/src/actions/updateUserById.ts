import { createAction } from './core'
import { UpdateUserById } from '../../../server/src/actions/updateUserById'

const action = createAction<UpdateUserById>(
  'operations/update-user-by-id',
  ['User'],
)

export default action
