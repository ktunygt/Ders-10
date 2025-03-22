const functionMap = {
    sendMail: {
        environment: {
            DATABASE_ACCESS: false
        },
        execute: (toEmail, heading, content) => {
            const sendMail = require("../mailer");
            return sendMail(toEmail, heading, content);
        }
    }
};

module.exports = functionMap;
