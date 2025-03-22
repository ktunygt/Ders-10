const User = require("../../models/user");
const { users } = require("../../constants/data");
const logger = require("../../helpers/logger");
const { email } = require("../../constants/config");

const fillConstantsUser = async () => {
    await Promise.all(
        users.map(async (user) => {
            const _user = await User.findOne({
                where: {
                    id: user.id
                },
                raw: true
            });

            if (!_user) {
                const isComplete = await User.create({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    roleID: user.roleID
                });

                if (!isComplete) {
                    logger.error(`User tablosuna veri yazılırken bir hata oluştu.`, { code: 3 });
                }
                else {
                    logger.info(`User tablosuna veri yazıldı.`, { code: 3 });
                }
            }
        })
    );
};

module.exports = fillConstantsUser;
