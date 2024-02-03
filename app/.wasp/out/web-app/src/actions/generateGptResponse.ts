import { createAction } from './core'
import { GenerateGptResponse } from '../../../server/src/actions/generateGptResponse'

const action = createAction<GenerateGptResponse>(
  'operations/generate-gpt-response',
  ['User', 'Task', 'GptResponse'],
)

export default action
