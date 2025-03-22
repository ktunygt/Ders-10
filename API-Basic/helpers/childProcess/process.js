const functionMap = require("./functionMap");

process.on("message", async ({ functionName, args }) => {
    try {
        const processFunction = functionMap[functionName];

        if (processFunction) {
            const result = await processFunction.execute(...args);
            process.send({
                status: result.status,
                message: result.message,
                error: result.error
            });
        }
        else {
            throw new Error(`${functionName} isimli fonksiyona ait alt işlem mevcut değil.`);
        }
    }
    catch (error) {
        process.send({
            status: false,
            message: "",
            error: error
        });
    }
    finally {
        process.exit();
    }
});
