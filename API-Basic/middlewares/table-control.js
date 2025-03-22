const fillConstantsRole = require("../data/constants/role");
const fillConstantsUser = require("../data/constants/user");

module.exports = tableControl = async () => {
    await fillConstantsRole();
    await fillConstantsUser();
};
