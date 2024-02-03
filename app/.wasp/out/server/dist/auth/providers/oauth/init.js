import passport from "passport";
import waspServerConfig from '../../../config.js';
export function makeOAuthInit({ userDefinedConfigFn, getUserFieldsFn, npmPackage, oAuthConfig }) {
    return async function init(provider) {
        const userDefinedConfig = userDefinedConfigFn
            ? userDefinedConfigFn()
            : {};
        const ProviderStrategy = await import(npmPackage);
        const passportStrategyName = `wasp${provider.id}LoginStrategy`;
        const requiredConfig = {
            clientID: oAuthConfig.clientID,
            clientSecret: oAuthConfig.clientSecret,
            scope: oAuthConfig.scope,
            callbackURL: `${waspServerConfig.frontendUrl}/auth/login/${provider.id}`,
            passReqToCallback: true
        };
        const config = Object.assign(Object.assign({}, requiredConfig), userDefinedConfig);
        ensureValidConfig(provider, config);
        const passportStrategy = new ProviderStrategy.default(config, addProviderProfileToRequest);
        passport.use(passportStrategyName, passportStrategy);
        return {
            passportStrategyName,
            getUserFieldsFn,
        };
    };
}
// This function is invoked after we successfully exchange the one-time-use OAuth code for a real provider API token.
// This token was used to get the provider profile information supplied as a parameter.
// We add the provider profile to the request for downstream use.
async function addProviderProfileToRequest(req, _accessToken, _refreshToken, providerProfile, done) {
    req.wasp = Object.assign(Object.assign({}, req.wasp), { providerProfile });
    done(null, {});
}
function ensureValidConfig(provider, config) {
    if (!config.clientID) {
        throw new Error(`The ${provider.displayName} auth provider requires clientID provided via env variables.`);
    }
    if (!config.clientSecret) {
        throw new Error(`The ${provider.displayName} auth provider requires clientSecret provided via env variables.`);
    }
    if (!config.scope || !Array.isArray(config.scope)) {
        throw new Error(`The ${provider.displayName} auth provider requires scope.`);
    }
}
//# sourceMappingURL=init.js.map