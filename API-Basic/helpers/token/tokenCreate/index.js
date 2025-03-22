const User = require("../../../models/user");
const Token = require("../../../models/token");
const jwt = require("jsonwebtoken");
const { token } = require("../../../constants/config");

const tokenCreate = async (userID, email) => {
    if (!userID || !email) {
        return {
            status: false,
            token: null
        };
    }

    const payload = {
        email: email
    }

    const newToken = jwt.sign(payload, token.JWT_KEY, {
        expiresIn: `${token.expire}h`
    });

    if (!newToken) {
        return {
            status: false,
            token: null
        }
    }

    const _user = await User.findOne({
        where: {
            id: userID
        }
    });

    const isComplete = await Token.create({
        userID: _user.id,
        token: newToken
    });

    if (!isComplete) {
        throw new Error("Token kayıt edilirken bir hata oluştu!");
    }

    return {
        status: true,
        token: newToken
    }
};

module.exports = tokenCreate;
