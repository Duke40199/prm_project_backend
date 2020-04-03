'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('status', [
      {
        status_name: 'Not started',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        status_name: 'In progress',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        status_name: 'Completed',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        status_name: 'Will not resolve',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        status_name: 'Reviewed',
        created_at: new Date(),
        updated_at: new Date()
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
