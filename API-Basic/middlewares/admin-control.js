const tokenControl = require("../helpers/token/tokenControl");
const { roles } = require("../constants/data");

module.exports = adminControl = async (req, res, next) => {
    const token = req.headers["authorization"];

    const result = await tokenControl(token);

    if (!result.user) {
        return res.status(401).send({
            message: result.message
        });
    }

    const adminRole = roles.find(role => role.name === "Admin");
    
    if (result.user.roleID !== adminRole.id) {
        return res.status(401).send({
            message: "Erişilemez işlem."
        });
    }

    req.user = result.user;

    next();
};
