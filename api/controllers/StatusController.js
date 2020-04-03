'use strict';
const models = require('../db/models/index');
const status = require('http-status');
module.exports = {
  view: {
    async get(req, res) {
      try {
        const statusResult = await models.Status.findAll();
        res.status(status.OK)
          .send({
            success: true,
            message: statusResult
          });
      } catch (error) {
        res.status(status.BAD_REQUEST)
          .send({
            success: false,
            message: error
          });
      }
    }
  }
}