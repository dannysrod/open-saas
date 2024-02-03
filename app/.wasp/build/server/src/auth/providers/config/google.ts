
import { createRouter } from "../oauth/createRouter.js";
import { makeOAuthInit } from "../oauth/init.js";

import type { ProviderConfig } from "../types.js";
import type { OAuthConfig } from "../oauth/types.js";

import { getUserFields } from '../../../ext-src/auth/google.js'
const _waspGetUserFieldsFn = getUserFields
import { config } from '../../../ext-src/auth/google.js'
const _waspUserDefinedConfigFn = config

const _waspOAuthConfig: OAuthConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    scope: ['profile'],
};

const _waspConfig: ProviderConfig = {
    id: "google",
    displayName: "Google",
    init: makeOAuthInit({
        npmPackage: 'passport-google-oauth20',
        getUserFieldsFn: _waspGetUserFieldsFn,
        userDefinedConfigFn: _waspUserDefinedConfigFn,
        oAuthConfig: _waspOAuthConfig,
    }),
    createRouter,
}

export default _waspConfig;
