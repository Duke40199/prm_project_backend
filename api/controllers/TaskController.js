'use strict';
const models = require('../db/models/index');
const status = require('http-status');
const {Op} = require("sequelize");
const Sequelize = require("sequelize");
const url = require('url');
module.exports = {

  create: {
    post(req, res) {
      return models.Task
        .create(req.body)
        .then(function (post, err) {
          if (post) {
            res.status(status.OK)
              .send({
                success: true,
                message: "OK",
                error: err
              });
          }
        });
    },
  },

  view: {
    async get(req, res, next) {
      try {
        const queryData = url.parse(req.url, true).query;
        var taskName = queryData.taskName;
        var order = queryData.order;
        var status = queryData.status;
        var statusID;
        var whereCondition;
        if (taskName == undefined) {
          taskName = '';
        }
        if (order == undefined) {
          order = 'created_at,asc'
        }
        const orderOptions = order.split(",");

        if (status != undefined) {
          const requestStatus = await models.Status.findOne({
            attributes: ['id'],
            where: {
              status_name: {
                [Op.iLike]: '%' + status + '%'
              },
            }
          });
          statusID = requestStatus?.dataValues.id;
        }
        if (statusID != null) {
          whereCondition = {
            task_name: {
              [Op.iLike]: '%' + taskName + '%'
            },
            status_id: statusID,
          }
        } else {
          whereCondition = {
            task_name: {
              [Op.iLike]: '%' + taskName + '%'
            },
          }
        }
        const tasks = await models.Task
          .findAll({
            where: whereCondition,
            order: [
              [orderOptions[0], orderOptions[1]],
            ],
          });

        const finalResult = await Promise.all(tasks.map(async task => {
          const foundAssignee = task.dataValues.assignee;
          const foundCreatedBy = task.dataValues.createdBy;
          const foundStatusID = task.dataValues.statusId;
          var status, statusName;
          if (foundStatusID != undefined) {
            status = await models.Status
              .findOne({
                attributes: ['status_name'],
                where: {id: foundStatusID}
              });
            statusName = status.dataValues.status_name;
          }
          const assignee = await models.User
            .findOne({
              attributes: ['username'],
              where: {id: foundAssignee}
            });
          const assigneeUsername = assignee.dataValues.username;
          const createdBy = await models.User
            .findOne({
              attributes: ['username'],
              where: {id: foundCreatedBy}
            });
          const createdByUsername = createdBy.dataValues.username;
          return {...task.dataValues, assigneeUsername, createdByUsername, statusName}
        }));
        res
          .send({
            success: true,
            message: finalResult
          });
      } catch (error) {
        next(error)
      }
    },
  },

  view_post_details: {
    async get(req, res, next) {
      try {
        const post = await models.Post
          .findOne({
            attributes: {
              exclude: ['category_id', 'user_id', 'userId']
            },
            where: {
              id: req.params.postId
            }
          });
        //data from initial response
        const foundCategoryID = post.dataValues.categoryId;
        const foundPostID = post.dataValues.id;
        //Additional data for Post
        const totalLikes = await models.Like
          .findAndCountAll({
            where: {post_id: foundPostID, is_liked: true}
          });
        const totalComments = await models.Comment
          .findAndCountAll({
            where: {post_id: foundPostID, is_deleted: false}
          });
        const stepsData = await models.Step
          .findAndCountAll({
            attributes: ['id', 'description', 'stepCount', 'imageUrl'],
            where: {post_id: foundPostID}
          });
        const category = await models.Category
          .findOne({
            attributes: ['category_name'],
            where: {id: foundCategoryID}
          });
        //Get data from requests
        const likeCount = totalLikes.count;
        const commentCount = totalComments.count;
        const stepCount = stepsData.count;
        const categoryName = category.dataValues.category_name;
        const steps = stepsData.rows;
        const finalResult = {...post.dataValues, categoryName, likeCount, commentCount, stepCount, steps};
        res.status(status.OK)
          .send({
            success: true,
            message: finalResult,
          });
      } catch (error) {
        next(error)
      }
    },
  },

  delete: {
    async put(req, res, next) {
      try {
        const result = await models.Post.update(
          {isDeleted: true},
          {where: {post_id: req.params.postId}}
        );
        res.status(status.OK)
          .send({
            success: true,
            message: result
          });
      } catch (error) {
        next(error)
      }
    }
  },

  set_avail_status: {
    async put(req, res, next) {
      try {
        const post = await models.Post.findOne({
            attributes: [
              'is_deleted',
            ],
            where: {
              id: req.params.postId
            }
          },
        );
        const newStatus = !post.dataValues.is_deleted;
        const result = await models.Post.update(
          {isDeleted: newStatus},
          {
            where: {
              id: req.params.postId
            }
          }
        );
        res.status(status.OK)
          .send({
            success: true,
            message: result
          });
      } catch (error) {
        next(error)
      }
    }
  },
  search: {
    async get(req, res, next) {
      try {
        const queryData = url.parse(req.url, true).query;
        const type = queryData.type;
        const query = queryData.query;
        var foundPosts;
        if (query == '') {
          res.status(status.OK)
            .send({
              success: false,
              message: "Input search query!"
            });
        } else {
          switch (type) {
            //Find by postName
            case "name": {
              foundPosts = await models.Post.findAll({
                where: {
                  post_name: {
                    [Op.iLike]: '%' + query + '%'
                  },
                }
              });
              break;
            }
            //Find by categoryName
            case "category": {
              const category = await models.Category.findAll({
                attributes: ['id'],
                where: {
                  category_name: {
                    [Op.iLike]: '%' + query + '%'
                  }
                },
                raw: true,
              });
              const categoryIds = category.map(category => category.id);
              foundPosts = await models.Post.findAll({
                where: {category_id: categoryIds}
              });
              break;
            }
            //Find by ingredientName
            case "ingredient": {
              const ingredients = await models.Ingredient.findAll({
                attributes: ['post_id'],
                where: {
                  ingredient_name: {
                    [Op.iLike]: '%' + query + '%'
                  }
                },
                raw: true,
              });
              const postIds = ingredients.map(ingredient => ingredient.post_id);
              foundPosts = await models.Post.findAll({
                where: {id: postIds}
              });
              break;
            }
            default: {
              res.status(status.OK)
                .send({
                  success: false,
                  message: "Invalid search type!"
                });
            }
          }
          const finalResult = await Promise.all(foundPosts.map(async post => {
            const foundPostID = post.dataValues.id;
            const foundCategoryID = post.dataValues.categoryId;
            const totalLikes = await models.Like
              .findAndCountAll({
                where: {post_id: foundPostID, is_liked: true}
              });
            const totalComments = await models.Comment
              .findAndCountAll({
                where: {post_id: foundPostID, is_deleted: false}
              });
            var category;
            var categoryName;
            if (foundCategoryID != undefined) {
              category = await models.Category
                .findOne({
                  attributes: ['category_name'],
                  where: {id: foundCategoryID}
                });
              categoryName = category.dataValues.category_name;
            }
            const likeCount = totalLikes.count;
            const commentCount = totalComments.count;
            return {...post.dataValues, categoryName, likeCount, commentCount}
          }));
          return res.status(status.OK)
            .send({
              success: true,
              message: finalResult
            });
        }
      } catch
        (error) {
        next(error)
      }
    }
  },
}