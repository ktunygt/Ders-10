const { environment } = require("../../constants/config");
const fillMockUserData = require("./user");

const fillMockData = async () => {
    if (environment === "development") {
        await fillMockUserData();
    }
};

module.exports = fillMockData;
