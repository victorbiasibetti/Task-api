import Sequelize, { Model } from 'sequelize';

class TaskType extends Model {
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

export default TaskType;
