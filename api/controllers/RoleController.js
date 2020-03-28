'use strict';
const models = require('../db/models/index');
const status = require('http-status');
const {Op} = require("sequelize");
const url = require('url');

module.exports = {
  view: {
    async get(req, res, next) {
      try {
        var roles = await models.Role
          .findAll({
            attributes: [
              'id',
              'roleName'
            ]
          });
        res.status(status.OK)
          .send({
            success: true,
            message: roles,
          });
      } catch (error) {
        next(error)
      }
    },
  },
};