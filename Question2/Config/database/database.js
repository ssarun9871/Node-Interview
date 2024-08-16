const Sequelize  = require('sequelize');
const path = require('path');
require('dotenv').config();

const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
   dialect: "sqlite",
   storage:path.join(__dirname,'../../database/data.sqlite')
})

module.exports = database;


