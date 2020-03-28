import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User];

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
