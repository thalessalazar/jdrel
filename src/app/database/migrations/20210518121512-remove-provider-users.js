/* eslint-disable arrow-body-style */
module.exports = {
    up: async (queryInterface) => {
        return queryInterface.removeColumn("users", "provider");
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn("users", "provider", {
            type: Sequelize.BOOLEAN,
            default: false,
            allowNull: false,
        });
    },
};
