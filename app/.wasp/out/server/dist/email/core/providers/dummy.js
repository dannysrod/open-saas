import { getDefaultFromField } from "../helpers.js";
export function initDummyEmailSender() {
    const defaultFromField = getDefaultFromField();
    return {
        send: async (email) => {
            const fromField = email.from || defaultFromField;
            console.log('Test email (not sent):', {
                from: {
                    email: fromField.email,
                    name: fromField.name,
                },
                to: email.to,
                subject: email.subject,
                text: email.text,
                html: email.html,
            });
            return {
                success: true,
            };
        }
    };
}
//# sourceMappingURL=dummy.js.map