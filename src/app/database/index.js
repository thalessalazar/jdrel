import Sequelize from "sequelize";
import config from "../config/database";

import User from "../model/User";
import Cep from "../model/Cep";

const models = [User, Cep];

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
