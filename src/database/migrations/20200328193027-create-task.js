module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Task', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_responsable_departaments: {
        type: Sequelize.INTEGER,
        allowNull: true,
        refereces: {
          model: 'Departament',
          key: 'id',
        },
      },
      id_responsable_users: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      id_tasks_status: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Task_status',
          key: 'id',
        },
      },
      id_tasks_types: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Task_type',
          key: 'id',
        },
      },
      started_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      finished_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Task');
  },
};
