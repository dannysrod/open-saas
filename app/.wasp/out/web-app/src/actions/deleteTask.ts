import { createAction } from './core'
import { DeleteTask } from '../../../server/src/actions/deleteTask'

const action = createAction<DeleteTask>(
  'operations/delete-task',
  ['Task'],
)

export default action
