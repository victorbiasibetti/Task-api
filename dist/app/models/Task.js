"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Task extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        description: _sequelize2.default.STRING,
        id_responsable_departaments: _sequelize2.default.NUMBER,
        id_responsable_users: _sequelize2.default.NUMBER,
        id_tasks_status: _sequelize2.default.NUMBER,
        id_tasks_types: _sequelize2.default.NUMBER,
        started_at: _sequelize2.default.DATE,
        finished_at: _sequelize2.default.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'id_responsable_users',
      as: 'user',
    });
    this.belongsTo(models.Departament, {
      foreignKey: 'id_responsable_departaments',
      as: 'departament',
    });
  }
}

exports. default = Task;
