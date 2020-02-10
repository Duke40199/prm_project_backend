/* jshint indent: 1 */
const User = require('./user.js');

module.exports = function (sequelize, DataTypes) {
  const Role = sequelize.define('Role', {
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'role_id'
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'role_name'
    }
  }, {
    tableName: 'role',
    associate: function () {
      Role.hasMany(User, {as: 'users', foreignKey: 'roleId'});
    }
  });
  return Role;
};
