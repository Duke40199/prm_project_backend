'use strict';
const models = require('../db/models/index');
const status = require('http-status');
module.exports = {
  view: {
    async get(req, res) {
      try {
        const ratings = await models.Rating.findAll();
        const finalResult = await Promise.all(ratings.map(async rating => {
          const foundUserID = rating.dataValues.userId;
          const foundTaskID = rating.dataValues.taskId;
          const user = await models.User
            .findOne({
              attributes: ['username'],
              where: {id: foundUserID}
            });
          const username = user.dataValues.username;
          const task = await models.Task
            .findOne({
              attributes: ['taskName'],
              where: {id: foundTaskID}
            });
          const taskName = task.dataValues.taskName;
          return {...rating.dataValues, username, taskName}
        }));
        res.status(status.OK)
          .send({
            success: true,
            message: finalResult
          });
      } catch (error) {
        res.status(status.BAD_REQUEST)
          .send({
            success: false,
            message: error
          });
      }
    }
  },
  create: {
    async post(req, res) {
      try {
        console.log(req.body.postId);
        await models.Rating
          .create(req.body);
        await models.Task.update(
          {statusId: 5},
          {
            where: {
              id: req.body.taskId
            }
          }
        );
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
}