import { defineAdditionalSignupFields } from '../../auth/index.js';
export default defineAdditionalSignupFields({
    isAdmin: (data) => {
        var _a;
        if (!data.email) {
            return false;
        }
        const adminEmails = ((_a = process.env.ADMIN_EMAILS) === null || _a === void 0 ? void 0 : _a.split(',')) || [];
        return adminEmails.includes(data.email);
    },
});
//# sourceMappingURL=setIsAdminViaEmailSignup.js.map