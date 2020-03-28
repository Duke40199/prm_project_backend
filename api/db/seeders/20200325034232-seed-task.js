'use strict';
const uuid = require('uuid/v4');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('task', [
      {
        task_name: "Create API",
        description: "Create a new API for potato.",
        status_id: 3,
        assignee: '468ab892-7518-4520-8243-db1c1b9607dd',
        created_by: '9903c282-06ed-48fe-9607-76e7903f6b72',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        task_name: "Test API",
        description: "Must create Functional Test.",
        status_id: 2,
        assignee: '468ab892-7518-4520-8243-db1c1b9607dd',
        created_by: 'ef71e125-37b5-4a5f-87e1-fdda43a4ccb2',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        task_name: "Deploy API",
        description: "Deploy for usages.",
        status_id: 1,
        assignee: '468ab892-7518-4520-8243-db1c1b9607dd',
        created_by: 'da9c7b32-0f05-48f7-b74d-d052df2347d2',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};