const tokenControl = require("../helpers/token/tokenControl");

module.exports = authControl = async (req, res, next) => {
    const token = req.headers["authorization"];

    const result = await tokenControl(token);

    if (!result.user) {
        return res.status(401).send({
            message: result.message
        });
    }

    req.user = result.user;

    next();
};
