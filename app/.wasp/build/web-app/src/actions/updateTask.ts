import { createAction } from './core'
import { UpdateTask } from '../../../server/src/actions/updateTask'

const action = createAction<UpdateTask>(
  'operations/update-task',
  ['Task'],
)

export default action
