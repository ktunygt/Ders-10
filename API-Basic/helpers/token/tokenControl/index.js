const User = require("../../../models/user");
const Token = require("../../../models/token");
const jwt = require("jsonwebtoken");
const { token: tokenConfig } = require("../../../constants/config");
const oldTokenCleaner = require("../oldTokenCleaner");

const tokenControl = async (token) => {
    if (!token || token.length === 0) {
        return {
            message: "Token gönderilmedi!"
        };
    }

    let tokenVerify;
    try {
        tokenVerify = jwt.verify(token, tokenConfig.JWT_KEY);
    }
    catch (error) {
        let message;

        if (error.name === "TokenExpiredError") {
            message = "Token süresi dolmuş!";
        }
        else {
            message = "Oturum doğrulanmadı!";
        }

        return {
            message: message
        };
    }

    const user = await User.findOne({
        where: {
            email: tokenVerify.email
        },
        raw: true
    });

    const tokenData = await Token.findOne({
        where: {
            userID: user.id,
            token: token
        },
        raw: true
    });

    if (!tokenData) {
        return {
            message: "Token doğrulanmadı!"
        }
    }

    await oldTokenCleaner(user.id);

    return {
        user,
        message: "Oturum başarılı."
    }
};

module.exports = tokenControl;
