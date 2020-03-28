/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    taskName: {
      type: DataTypes.STRING,
      field: 'task_name'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'description'
    },
    assignee: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'assignee'
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'created_by'
    },
    statusId: {
      type: DataTypes.INTEGER,
      defaultValue: false,
      field: 'status_id'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
  }, {
    tableName: 'task'
  });
  return Task;
};
