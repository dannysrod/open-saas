import { createAction } from './core'
import { UpdateCurrentUser } from '../../../server/src/actions/updateCurrentUser'

const action = createAction<UpdateCurrentUser>(
  'operations/update-current-user',
  ['User'],
)

export default action
