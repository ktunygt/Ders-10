const { fork } = require("child_process");
const path = require("path");
const functionMap = require("./functionMap");
const logger = require("../logger");

const childProcess = (functionName, args = []) => {
    const environment = functionMap[functionName].environment;

    const transactionHandler = fork(path.join(process.cwd(), "helpers", "childProcess", "process"), [], {
        env: { ...process.env, ...environment, PROCESS_IS_CHILD: true }
    });

    transactionHandler.send({
        functionName: functionName,
        args: args
    });

    const messageHandler = (result) => {
        if (result.status === true) {
            logger.info(`[${functionName}] işlem tamamlandı.`, { code: 10 });
        }
        else {
            if (result.error && result.error.length > 0) {
                logger.error(`[${functionName}] işlemi tamamlanırken bir hata oluştu: ${result.error}`, { code: 10 });
            }
            if (result.message && result.message.length > 0) {
                logger.warn(`[${functionName}] işlemi tamamlanırken bir hata oluştu: ${result.message}`, { code: 10 });
            }
            else {
                logger.crit(`[${functionName}] işlemi cevapsız tamamlanamadı.`, { code: 10 });
            }
        }

        transactionHandler.off("message", messageHandler);
        transactionHandler.kill();
    };

    transactionHandler.on("message", messageHandler);
};

module.exports = childProcess;
