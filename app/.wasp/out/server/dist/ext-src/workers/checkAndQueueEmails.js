import { emailSender } from '../../email/index.js';
const emailToSend = {
    to: '',
    subject: 'The SaaS App Newsletter',
    text: "Hey There! \n\nThis is just a newsletter that sends automatically via cron jobs",
    html: `<html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>SaaS App Newsletter</title>
          </head>
          <body>
            <p>Hey There!</p>
            
            <p>This is just a newsletter that sends automatically via cron jobs</p>
          </body>
        </html>`,
};
//  you could use this function to send newsletters, expiration notices, etc.
export const checkAndQueueEmails = async (_args, context) => {
    // e.g. you could send an offer email 2 weeks before their subscription expires
    const currentDate = new Date();
    const twoWeeksFromNow = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    const users = await context.entities.User.findMany({
        where: {
            datePaid: {
                equals: twoWeeksFromNow,
            },
            sendEmail: true,
        },
    });
    if (users.length === 0) {
        return;
    }
    await Promise.allSettled(users.map(async (user) => {
        if (user.email) {
            try {
                emailToSend.to = user.email;
                await emailSender.send(emailToSend);
            }
            catch (error) {
                console.error('Error sending notice to user: ', user.id, error);
            }
        }
    }));
};
//# sourceMappingURL=checkAndQueueEmails.js.map