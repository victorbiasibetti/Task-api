import Sequelize from 'sequelize';

import User from '../app/models/User';
import Task from '../app/models/Task';

import databaseConfig from '../config/database';

const models = [User, Task];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connectionDB = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connectionDB));
  }
}

export default new Database();
