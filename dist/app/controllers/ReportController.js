"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _datefns = require('date-fns');
var _Task = require('../models/Task'); var _Task2 = _interopRequireDefault(_Task);

class ReportController {
  async CountCompletedTasks(req, res) {
    const {
      id_responsable_departaments,
      id_responsable_users,
      start_date = _datefns.toDate.call(void 0, 
        new Date(_datefns.getYear.call(void 0, new Date()), _datefns.getMonth.call(void 0, new Date()), 1)
      ),
      end_date = _datefns.toDate.call(void 0, new Date(_datefns.endOfMonth.call(void 0, new Date()))),
    } = req.query;

    const where = {};

    where.deleted_at = {
      [_sequelize.Op.eq]: null,
    };

    if (id_responsable_departaments || id_responsable_users) {
      if (id_responsable_departaments) {
        where.id_responsable_departaments = {
          [_sequelize.Op.eq]: id_responsable_departaments,
        };
      } else if (id_responsable_users) {
        where.id_responsable_users = {
          [_sequelize.Op.eq]: id_responsable_users,
        };
      }
    }

    where.finished_at = {
      [_sequelize.Op.not]: null,
    };

    where.started_at = {
      [_sequelize.Op.between]: [start_date, end_date],
    };

    try {
      const tasks = await _Task2.default.findAndCountAll({
        where,
      });

      return res.json({ tasks_completed: tasks });
    } catch (err) {
      return res
        .status(500)
        .json({ error: 'Houve um problema, tente novamente mais tarde' });
    }
  }

  async TimeOfClosionTasks(req, res) {
    const {
      id_responsable_departaments,
      id_responsable_users,
      start_date = _datefns.toDate.call(void 0, 
        new Date(_datefns.getYear.call(void 0, new Date()), _datefns.getMonth.call(void 0, new Date()), 1)
      ),
      end_date = _datefns.toDate.call(void 0, new Date(_datefns.endOfMonth.call(void 0, new Date()))),
    } = req.query;

    const where = {};

    where.deleted_at = {
      [_sequelize.Op.eq]: null,
    };

    if (id_responsable_departaments || id_responsable_users) {
      if (id_responsable_departaments) {
        where.id_responsable_departaments = {
          [_sequelize.Op.eq]: id_responsable_departaments,
        };
      } else if (id_responsable_users) {
        where.id_responsable_users = {
          [_sequelize.Op.eq]: id_responsable_users,
        };
      }
    }

    where.finished_at = {
      [_sequelize.Op.not]: null,
    };

    where.started_at = {
      [_sequelize.Op.between]: [start_date, end_date],
    };

    try {
      const tasks = await _Task2.default.findAndCountAll({
        where,
      });
      return res.json(tasks);
    } catch (err) {
      return res
        .status(500)
        .json({ error: 'Houve um problema, tente novamente mais tarde' });
    }
  }
}

exports. default = new ReportController();
