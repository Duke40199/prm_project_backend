/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'user_id'
		},
		username: {
			type: DataTypes.CHAR,
			allowNull: false,
			field: 'username'
		},
		password: {
			type: DataTypes.CHAR,
			allowNull: false,
			field: 'password'
		},
		email: {
			type: DataTypes.CHAR,
			allowNull: false,
			field: 'email'
		},
		fullname: {
			type: DataTypes.CHAR,
			allowNull: false,
			field: 'fullname'
		},
		phoneNumber: {
			type: DataTypes.CHAR,
			allowNull: false,
			field: 'phone_number'
		},
		roleId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'role_id'
		},
		isDeleted: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			field: 'is_deleted'
		}
	}, {
		tableName: 'user'
	});
};
