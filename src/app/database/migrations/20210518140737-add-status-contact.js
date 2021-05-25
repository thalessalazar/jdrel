/* eslint-disable arrow-body-style */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn("contacts", "status", {
            type: Sequelize.ENUM("ACTIVE", "ARCHIVED"),
            allowNull: false,
            defaultValue: "ACTIVE",
        });
    },

    down: async (queryInterface) => {
        return queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.removeColumn("contacts", "status", {
                transaction,
            });
            await queryInterface.sequelize.query(
                "DROP TYPE enum_contact_status",
                { transaction }
            );
        });

        // return queryInterface.removeColumn("contact", "status");
    },
};
