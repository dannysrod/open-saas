import {
  User,
  SocialLogin,
  GptResponse,
  Task,
  ContactFormMessage,
  DailyStats,
  PageViewSource,
  Logs,
} from '@prisma/client'
  
export type {
  User,
  SocialLogin,
  GptResponse,
  Task,
  ContactFormMessage,
  DailyStats,
  PageViewSource,
  Logs,
} from '@prisma/client'

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
