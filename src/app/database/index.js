import Sequelize from "sequelize";
import config from "../config/database";

import Customer from "../model/Customer";
import Contact from "../model/Contact";
import User from "../model/User";

const models = [Customer, Contact, User];

class Database {
    constructor() {
        this.connection = new Sequelize(config);
        this.init();
        this.associate();
    }

    init() {
        models.forEach((model) => model.init(this.connection));
    }

    associate() {
        // eslint-disable-next-line arrow-body-style
        models.forEach((model) => {
            if (model.associate) model.associate(this.connection.models);
        });
    }
}

export default new Database();
