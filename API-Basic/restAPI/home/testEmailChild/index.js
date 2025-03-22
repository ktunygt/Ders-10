const childProcess = require("../../../helpers/childProcess");

const testEmailChild = async (req, res) => {
    childProcess("sendMail", ["f211229013@ktun.edu.tr", "Deneme maili", "Bu bir test mailidir."]);

    return res.status(200).send({
        message: "Mail işlemi başlatıldı."
    });
};

module.exports = testEmailChild;
