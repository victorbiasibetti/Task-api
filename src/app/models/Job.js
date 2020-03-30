import Sequelize, { Model } from 'sequelize';

class Job extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        id_task: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Job;
