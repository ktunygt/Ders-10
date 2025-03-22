const Role = require("../../models/role");
const { roles } = require("../../constants/data");
const logger = require("../../helpers/logger");

const fillConstantsRole = async () => {
    await Promise.all(
        roles.map(async (role) => {
            const _role = await Role.findOne({
                where: {
                    id: role.id
                },
                raw: true
            });

            if (!_role) {
                const isComplete = await Role.create({
                    id: role.id,
                    name: role.name
                });

                if (!isComplete) {
                    logger.error(`Role tablosuna veri yazılırken bir hata oluştu.`, { code: 3 });
                }
                else {
                    logger.info(`Role tablosuna veri yazıldı.`, { code: 3 });
                }
            }
        })
    );
};

module.exports = fillConstantsRole;
