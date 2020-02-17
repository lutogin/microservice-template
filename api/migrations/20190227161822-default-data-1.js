const userDefaultData = require('../default-database-data/user-default-data.1');
const authDefaultData = require('../default-database-data/auth-default-data.1');
const userBeginSchema = require('./schemas/user-begin-schema');
const authBeginSchema = require('./schemas/auth-begin-schema');
const hobbiesBeginSchema = require('./schemas/hobby-begin-schema');
const newsBeginSchema = require('./schemas/news-begin-schema');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', userBeginSchema(Sequelize));
    await queryInterface.createTable('auths', authBeginSchema(Sequelize));
    await queryInterface.createTable('hobbies', hobbiesBeginSchema(Sequelize));
    await queryInterface.createTable('news', newsBeginSchema(Sequelize));
    await queryInterface.bulkInsert('users', userDefaultData);
    await queryInterface.bulkInsert('auths', authDefaultData);
  },
  down: async queryInterface => {
    queryInterface.dropTable('news');
    queryInterface.dropTable('auths');
    queryInterface.dropTable('hobbies');
    queryInterface.dropTable('users');
  },
};
