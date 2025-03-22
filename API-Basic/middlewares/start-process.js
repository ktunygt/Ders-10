const fillMockData = require("../data/mockData");
const tableControl = require("./table-control");

const startProcess = async () => {
    require("../models");

    await tableControl();

    await fillMockData();
};

module.exports = startProcess;
