import Sequelize from 'sequelize';

import User from '../app/models/User';
import Task from '../app/models/Task';
import TaskStatus from '../app/models/TaskStatus';
import TaskType from '../app/models/TaskType';

import databaseConfig from '../config/database';

const models = [User, Task, TaskStatus, TaskType];

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
