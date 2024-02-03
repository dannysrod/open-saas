import {
  type User,
  type SocialLogin,
  type GptResponse,
  type Task,
  type ContactFormMessage,
  type DailyStats,
  type PageViewSource,
  type Logs,
} from "@prisma/client"

export {
  type User,
  type SocialLogin,
  type GptResponse,
  type Task,
  type ContactFormMessage,
  type DailyStats,
  type PageViewSource,
  type Logs,
} from "@prisma/client"

export type Entity = 
  | User
  | SocialLogin
  | GptResponse
  | Task
  | ContactFormMessage
  | DailyStats
  | PageViewSource
  | Logs
  | never

export type EntityName = 
  | "User"
  | "SocialLogin"
  | "GptResponse"
  | "Task"
  | "ContactFormMessage"
  | "DailyStats"
  | "PageViewSource"
  | "Logs"
  | never
