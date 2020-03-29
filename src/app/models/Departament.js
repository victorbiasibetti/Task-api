import Sequelize, { Model } from 'sequelize';

class Departament extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        is_active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Departament;
