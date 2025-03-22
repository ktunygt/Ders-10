const Token = require("../../../models/token");
const { token: tokenConfig } = require("../../../constants/config");

const oldTokenCleaner = async (userID) => {
    const tokens = await Token.findAll({
        where: {
            userID: userID
        }
    });

    await Promise.all(
        tokens.map(async (token) => {
            const tokenExpireDate = new Date(token.createdAt);
            tokenExpireDate.setHours(tokenExpireDate.getHours() + tokenConfig.expire);

            if (tokenExpireDate < (new Date())) {
                await token.destroy();
            }
        })
    );
};

module.exports = oldTokenCleaner;
