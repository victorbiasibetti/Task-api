import { Op } from 'sequelize';
import { getMonth, getYear, toDate, endOfMonth } from 'date-fns';
import Task from '../models/Task';

class ReportController {
  async CountCompletedTasks(req, res) {
    const {
      id_responsable_departaments,
      id_responsable_users,
      start_date = toDate(
        new Date(getYear(new Date()), getMonth(new Date()), 1)
      ),
      end_date = toDate(new Date(endOfMonth(new Date()))),
    } = req.query;

    const where = {};

    where.deleted_at = {
      [Op.eq]: null,
    };

    if (id_responsable_departaments || id_responsable_users) {
      if (id_responsable_departaments) {
        where.id_responsable_departaments = {
          [Op.eq]: id_responsable_departaments,
        };
      } else if (id_responsable_users) {
        where.id_responsable_users = {
          [Op.eq]: id_responsable_users,
        };
      }
    }

    where.finished_at = {
      [Op.not]: null,
    };

    where.started_at = {
      [Op.between]: [start_date, end_date],
    };

    try {
      const tasks = await Task.findAndCountAll({
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
      start_date = toDate(
        new Date(getYear(new Date()), getMonth(new Date()), 1)
      ),
      end_date = toDate(new Date(endOfMonth(new Date()))),
    } = req.query;

    const where = {};

    where.deleted_at = {
      [Op.eq]: null,
    };

    if (id_responsable_departaments || id_responsable_users) {
      if (id_responsable_departaments) {
        where.id_responsable_departaments = {
          [Op.eq]: id_responsable_departaments,
        };
      } else if (id_responsable_users) {
        where.id_responsable_users = {
          [Op.eq]: id_responsable_users,
        };
      }
    }

    where.finished_at = {
      [Op.not]: null,
    };

    where.started_at = {
      [Op.between]: [start_date, end_date],
    };

    try {
      const tasks = await Task.findAndCountAll({
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

export default new ReportController();
