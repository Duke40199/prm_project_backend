'use strict';
const models = require('../db/models/index');
const status = require('http-status');
const {Op} = require("sequelize");
const url = require('url');
module.exports = {

  create: {
    async post(req, res) {
      //creator
      try {
        const creatorUsername = req.body.creatorUsername;
        console.log("Creator Username:" + creatorUsername);
        const creator = await models.User.findOne({
          attributes: ['id'],
          where: {
            username: {
              [Op.eq]: creatorUsername
            },
          }
        });
        req.body.createdBy = creator.dataValues.id;
        //assignee
        const assigneeUsername = req.body.assigneeUsername;
        console.log("Assignee Username:" + assigneeUsername);
        const assignee = await models.User.findOne({
          attributes: ['id'],
          where: {
            username: {
              [Op.eq]: assigneeUsername
            },
          }
        });
        req.body.assignee = assignee.dataValues.id;
        //status
        const statusName = req.body.statusName;
        console.log("StatusName: " + statusName);
        const status = await models.Status.findOne({
          attributes: ['id'],
          where: {
            status_name: {
              [Op.eq]: statusName
            },
          }
        });
        req.body.status_id = status.dataValues.id;
        console.log(status.dataValues.id);
        return models.Task
          .create(req.body)
        res.status(status.OK)
          .send({
            success: true,
            message: "OK",
          });
      } catch (error) {
        res.status(status.BAD_REQUEST)
          .send({
            success: false,
            message: error,
          });
      }
    },
  },

  update: {
    async put(req, res) {
      //creator
      try {
        const creatorUsername = req.body.creatorUsername;
        console.log("Creator Username:" + creatorUsername);
        const creator = await models.User.findOne({
          attributes: ['id'],
          where: {
            username: {
              [Op.eq]: creatorUsername
            },
          }
        });
        req.body.createdBy = creator.dataValues.id;
        //assignee
        const assigneeUsername = req.body.assigneeUsername;
        console.log("Assignee Username:" + assigneeUsername);
        const assignee = await models.User.findOne({
          attributes: ['id'],
          where: {
            username: {
              [Op.eq]: assigneeUsername
            },
          }
        });
        req.body.assignee = assignee.dataValues.id;
        //status
        const statusName = req.body.statusName;
        console.log("StatusName: " + statusName);
        const status = await models.Status.findOne({
          attributes: ['id'],
          where: {
            status_name: {
              [Op.eq]: statusName
            },
          }
        });
        req.body.status_id = status.dataValues.id;
        console.log(status.dataValues.id);
        console.log('TaskName:' + req.body.taskName);
        console.log('taskID'+ req.body.id);
        const result = await models.Task.update(req.body, {
          where: {
            id: {
              [Op.eq]: req.body.id
            }
          }
        })
        res.status(status.OK)
          .send({
            success: true,
            message: result,
          });
      } catch (error) {
        res.status(status.BAD_REQUEST)
          .send({
            success: false,
            message: error,
          });
      }
    },
  },

  view: {
    async get(req, res, next) {
      try {
        const queryData = url.parse(req.url, true).query;
        var order = queryData.order;
        var creatorUsername = queryData.creator;
        var assigneeUsername = queryData.assignee;
        var whereCondition;
        if (order == undefined) {
          order = 'created_at,desc'
        }
        if (creatorUsername == undefined) {
          creatorUsername = '';
        }
        if (assigneeUsername == undefined) {
          assigneeUsername = '';
        }
        const orderOptions = order.split(",");

        const creator = await models.User.findOne({
          attributes: ['id'],
          where: {
            username: {
              [Op.eq]: creatorUsername,
            }
          }
        });
        var creatorId = '';
        if (creator != null) {
          creatorId = creator.dataValues.id;
          whereCondition = {
            created_by: {
              [Op.eq]: creatorId
            }
          }
        }
        const assignee = await models.User.findOne({
          attributes: ['id'],
          where: {
            username: {
              [Op.eq]: assigneeUsername
            }
          }
        });
        var assigneeId = '';
        if (assignee != null) {
          assigneeId = assignee.dataValues.id;
          whereCondition = {
            assignee: {
              [Op.eq]: assigneeId
            }
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
        res.status(status.OK)
          .send({
            success: true,
            message: finalResult,
          });
      } catch
        (error) {
        res.status(status.BAD_REQUEST)
          .send({
            success: true,
            message: error,
          });
      }
    }
  },
  view_review_tasks: {
    async get(req, res, next) {
      try {
        const queryData = url.parse(req.url, true).query;
        var order = queryData.order;
        var createdByUsername = queryData.creator;
        var statusName = queryData.statusName;
        if (order == undefined) {
          order = 'created_at,desc'
        }
        if (createdByUsername == undefined) {
          createdByUsername = '';
        }
        const orderOptions = order.split(",");

        const creator = await models.User.findOne({
          attributes: ['id'],
          where: {
            username: {
              [Op.eq]: createdByUsername,
            }
          }
        });
        var creatorId = '';
        if (creator != null) {
          creatorId = creator.dataValues.id;
        }

        const statusObject = await models.Status.findOne({
          attributes: ['id'],
          where: {
            status_name: {
              [Op.eq]: statusName,
            }
          }
        });
        const statusId = statusObject.dataValues.id
        const tasks = await models.Task
          .findAll({
            where: [{
              created_by: {
                [Op.eq]: creatorId,
              }
            }, {
              status_id: {
                [Op.eq]: statusId
              }
            }],
            order: [
              [orderOptions[0], orderOptions[1]],
            ],
          });

        const finalResult = await Promise.all(tasks.map(async task => {
          const foundAssignee = task.dataValues.assignee;
          const assignee = await models.User
            .findOne({
              attributes: ['username'],
              where: {id: foundAssignee}
            });
          const assigneeUsername = assignee.dataValues.username;
          return {...task.dataValues, assigneeUsername, createdByUsername, statusName}
        }));
        res.status(status.OK)
          .send({
            success: true,
            message: finalResult,
          });
      } catch
        (error) {
        res.status(status.BAD_REQUEST)
          .send({
            success: true,
            message: error,
          });
      }
    }
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
}