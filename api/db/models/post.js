/* jshint indent: 1 */
const uuid = require('uuid');

module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define('Post', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'post_id'
    },
    postName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'post_name'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'description'
    },
    timeNeeded: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'time_needed'
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_deleted'
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id'
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'username'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id'
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
    tableName: 'post',
  });
  Post.associate = function (models) {
    // models.Post.belongsTo(models.User, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
    models.Post.hasMany(models.Like, {
      foreignKey: "post_id"
    });
    models.Post.hasMany(models.Comment, {
      foreignKey: "post_id"
    });
    models.Post.hasMany(models.Step, {
      foreignKey: "post_id"
    });
    models.Post.hasMany(models.Ingredient, {
      foreignKey: "post_id"
    });
    models.Post.hasMany(models.Image, {
      foreignKey: "post_id"
    });
  }
  return Post;
};
