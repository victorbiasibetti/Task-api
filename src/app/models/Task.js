import Sequelize, { Model } from 'sequelize';

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        id_responsable_departaments: Sequelize.NUMBER,
        id_responsable_users: Sequelize.NUMBER,
        id_tasks_status: Sequelize.NUMBER,
        id_tasks_types: Sequelize.NUMBER,
        started_at: Sequelize.DATE,
        finished_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  /* static associate(models) {
    // this.belongsTo(models.User, {
    //   foreignKey: 'id_responsable_users',
    //   as: 'user',
    // });
    // this.belongsTo(models.Departament, {
    //   foreignKey: 'id_responsable_departaments',
    //   as: 'departament',
    // });
  } */
}

export default Task;
