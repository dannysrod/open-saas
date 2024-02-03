import { createAction } from './core'
import { CreateTask } from '../../../server/src/actions/createTask'

const action = createAction<CreateTask>(
  'operations/create-task',
  ['Task'],
)

export default action
