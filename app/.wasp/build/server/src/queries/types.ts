
import {
  type _User,
  type _GptResponse,
  type _Task,
  type _DailyStats,
  type AuthenticatedQuery,
  type Payload,
} from '../_types'

export type GetGptResponses<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedQuery<
    [
      _User,
      _GptResponse,
    ],
    Input,
    Output
  >

export type GetAllTasksByUser<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedQuery<
    [
      _Task,
    ],
    Input,
    Output
  >

export type GetDailyStats<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedQuery<
    [
      _User,
      _DailyStats,
    ],
    Input,
    Output
  >

export type GetPaginatedUsers<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedQuery<
    [
      _User,
    ],
    Input,
    Output
  >

