// Wasp internally uses the types defined in this file for typing entity maps in
// operation contexts.
//
// We must explicitly tag all entities with their name to avoid issues with
// structural typing. See https://github.com/wasp-lang/wasp/pull/982 for details.
import { 
  type Entity, 
  type EntityName,
  type User,
  type SocialLogin,
  type GptResponse,
  type Task,
  type ContactFormMessage,
  type DailyStats,
  type PageViewSource,
  type Logs,
} from '../entities'

export type _User = WithName<User, "User">
export type _SocialLogin = WithName<SocialLogin, "SocialLogin">
export type _GptResponse = WithName<GptResponse, "GptResponse">
export type _Task = WithName<Task, "Task">
export type _ContactFormMessage = WithName<ContactFormMessage, "ContactFormMessage">
export type _DailyStats = WithName<DailyStats, "DailyStats">
export type _PageViewSource = WithName<PageViewSource, "PageViewSource">
export type _Logs = WithName<Logs, "Logs">

export type _Entity = 
  | _User
  | _SocialLogin
  | _GptResponse
  | _Task
  | _ContactFormMessage
  | _DailyStats
  | _PageViewSource
  | _Logs
  | never

type WithName<E extends Entity, Name extends EntityName> = 
  E & { _entityName: Name }
