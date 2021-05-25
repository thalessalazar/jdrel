import Sequelize, { Model, Op } from "sequelize";

class Customer extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
            },
            {
                scopes: {
                    active: {
                        where: {
                            status: "ACTIVE",
                        },
                        order: ["createdAt"],
                    },
                    archived: {
                        where: {
                            status: "ARCHIVED",
                            order: ["createdAt"],
                        },
                    },
                    created(date) {
                        return {
                            where: {
                                createdAt: {
                                    [Op.gte]: date,
                                },
                            },
                        };
                    },
                },
                hooks: {
                    // eslint-disable-next-line arrow-body-style
                    beforeValidate: (customer) => {
                        customer.status = "ARCHIVED";
                    },
                },
                sequelize,
                name: {
                    singular: "customer",
                    plural: "customers",
                },
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Contact);
    }
}

export default Customer;
