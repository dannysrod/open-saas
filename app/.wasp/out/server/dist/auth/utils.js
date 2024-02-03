var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { sign, verify } from '../core/auth.js';
import AuthError from '../core/AuthError.js';
import HttpError from '../core/HttpError.js';
import prisma from '../dbClient.js';
import { isPrismaError, prismaErrorToHttpError, sleep } from '../utils.js';
import setIsAdminViaEmailSignup from '../ext-src/auth/setIsAdminViaEmailSignup.js';
const _waspAdditionalSignupFieldsConfig = setIsAdminViaEmailSignup;
export const contextWithUserEntity = {
    entities: {
        User: prisma.user
    }
};
export const authConfig = {
    failureRedirectPath: "/login",
    successRedirectPath: "/demo-app",
};
export async function findUserBy(where) {
    return prisma.user.findUnique({ where });
}
export async function createUser(data) {
    try {
        return await prisma.user.create({ data });
    }
    catch (e) {
        rethrowPossiblePrismaError(e);
    }
}
export async function deleteUser(user) {
    try {
        return await prisma.user.delete({ where: { id: user.id } });
    }
    catch (e) {
        rethrowPossiblePrismaError(e);
    }
}
export async function createAuthToken(user) {
    return sign(user.id);
}
export async function verifyToken(token) {
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
function rethrowPossiblePrismaError(e) {
    if (e instanceof AuthError) {
        throwValidationError(e.message);
    }
    else if (isPrismaError(e)) {
        throw prismaErrorToHttpError(e);
    }
    else {
        throw new HttpError(500);
    }
}
function throwValidationError(message) {
    throw new HttpError(422, 'Validation failed', { message });
}
export async function validateAndGetAdditionalFields(data) {
    const { password: _password } = data, sanitizedData = __rest(data, ["password"]);
    const result = {};
    for (const [field, getFieldValue] of Object.entries(_waspAdditionalSignupFieldsConfig)) {
        try {
            const value = await getFieldValue(sanitizedData);
            result[field] = value;
        }
        catch (e) {
            throwValidationError(e.message);
        }
    }
    return result;
}
//# sourceMappingURL=utils.js.map