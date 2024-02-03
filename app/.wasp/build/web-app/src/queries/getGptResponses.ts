import { createQuery } from './core'
import { GetGptResponses } from '../../../server/src/queries/getGptResponses'


const query = createQuery<GetGptResponses>(
  'operations/get-gpt-responses',
  ['User', 'GptResponse'],
)

export default query
