import { sign, verify } from '../core/auth.js'
import AuthError from '../core/AuthError.js'
import HttpError from '../core/HttpError.js'
import prisma from '../dbClient.js'
import { isPrismaError, prismaErrorToHttpError, sleep } from '../utils.js'
import { type User } from '../entities/index.js'
import waspServerConfig from '../config.js';
import { type Prisma } from '@prisma/client';
import setIsAdminViaEmailSignup from '../ext-src/auth/setIsAdminViaEmailSignup.js'

const _waspAdditionalSignupFieldsConfig = setIsAdminViaEmailSignup

type UserId = User['id']

export const contextWithUserEntity = {
  entities: {
    User: prisma.user
  }
}

export const authConfig = {
  failureRedirectPath: "/login",
  successRedirectPath: "/demo-app",
}

export async function findUserBy(where: Prisma.UserWhereUniqueInput): Promise<User> {
  return prisma.user.findUnique({ where });
}

export async function createUser(data: Prisma.UserCreateInput): Promise<User> {
  try {
    return await prisma.user.create({ data })
  } catch (e) {
    rethrowPossiblePrismaError(e);
  }
}

export async function deleteUser(user: User): Promise<User> {
  try {
    return await prisma.user.delete({ where: { id: user.id } })
  } catch (e) {
    rethrowPossiblePrismaError(e);
  }
}

export async function createAuthToken(user: User): Promise<string> {
  return sign(user.id);
}

export async function verifyToken(token: string): Promise<{ id: any }> {
  return verify(token);
}

// If an user exists, we don't want to leak information
// about it. Pretending that we're doing some work
// will make it harder for an attacker to determine
// if a user exists or not.
// NOTE: Attacker measuring time to response can still determine
// if a user exists or not. We'll be able to avoid it when 
// we implement e-mail sending via jobs.
export async function doFakeWork() {
  const timeToWork = Math.floor(Math.random() * 1000) + 1000;
  return sleep(timeToWork);
}


function rethrowPossiblePrismaError(e: unknown): void {
  if (e instanceof AuthError) {
    throwValidationError(e.message);
  } else if (isPrismaError(e)) {
    throw prismaErrorToHttpError(e)
  } else {
    throw new HttpError(500)
  }
}

function throwValidationError(message: string): void {
  throw new HttpError(422, 'Validation failed', { message })
}

export async function validateAndGetAdditionalFields(data: {
  [key: string]: unknown
}) {
  const {
    password: _password,
    ...sanitizedData
  } = data;
  const result: Record<string, any> = {};
  for (const [field, getFieldValue] of Object.entries(_waspAdditionalSignupFieldsConfig)) {
    try {
      const value = await getFieldValue(sanitizedData)
      result[field] = value
    } catch (e) {
      throwValidationError(e.message)
    }
  }
  return result;
}
