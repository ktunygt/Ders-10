const sequelize = require("../data/db");
const { DataTypes } = require("sequelize");

const Role = sequelize.define("roles", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false });

(async () => {
    await Role.sync();
})();

module.exports = Role;
