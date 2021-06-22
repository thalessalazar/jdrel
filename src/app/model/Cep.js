import Sequelize, { Model } from "sequelize";

class Cep extends Model {
    static init(sequelize) {
        super.init(
            {
                cep: Sequelize.STRING,
                publicplace: Sequelize.STRING,
                complement: Sequelize.STRING,
                neighborhood: Sequelize.STRING,
                location: Sequelize.STRING,
                uf: Sequelize.STRING,
                ibge: Sequelize.STRING,
                ddd: Sequelize.STRING,
                gia: Sequelize.STRING,
                siafi: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
    }
}

export default Cep;
