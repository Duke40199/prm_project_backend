/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Comment', {
    commentId: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: 'comment_id'
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'content'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
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
    tableName: 'comment'
  });
};
