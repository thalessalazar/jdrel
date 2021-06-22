/* eslint-disable arrow-body-style */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.createTable("ceps", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            cep: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            publicplace: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            complement: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            neighborhood: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            location: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            uf: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ibge: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            gia: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ddd: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            siafi: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface) => {
        return queryInterface.dropTable("ceps");
    },
};
