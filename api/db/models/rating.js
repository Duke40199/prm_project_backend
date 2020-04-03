/* jshint indent: 1 */
const uuid = require('uuid');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Rating', {
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'score'
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'comment'
    },
    userId: {
      type: DataTypes.UUID,
      field: 'user_id'
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'task_id'
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
    tableName: 'rating'
  });
};
