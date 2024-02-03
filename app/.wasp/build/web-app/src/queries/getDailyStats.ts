import { createQuery } from './core'
import { GetDailyStats } from '../../../server/src/queries/getDailyStats'


const query = createQuery<GetDailyStats>(
  'operations/get-daily-stats',
  ['User', 'DailyStats'],
)

export default query
