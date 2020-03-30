"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _Task = require('../app/models/Task'); var _Task2 = _interopRequireDefault(_Task);
var _TaskStatus = require('../app/models/TaskStatus'); var _TaskStatus2 = _interopRequireDefault(_TaskStatus);
var _TaskType = require('../app/models/TaskType'); var _TaskType2 = _interopRequireDefault(_TaskType);
var _Departament = require('../app/models/Departament'); var _Departament2 = _interopRequireDefault(_Departament);
var _Job = require('../app/models/Job'); var _Job2 = _interopRequireDefault(_Job);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const models = [_User2.default, _Task2.default, _TaskStatus2.default, _TaskType2.default, _Departament2.default, _Job2.default];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connectionDB = new (0, _sequelize2.default)(_database2.default);

    models.map((model) => model.init(this.connectionDB));
  }
}

exports. default = new Database();
