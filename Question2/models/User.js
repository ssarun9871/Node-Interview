const Sequelize = require('sequelize');
const db = require('../Config/database/database');

const User = db.define('User', {
  user_id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  balance: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  last_mine_timestamp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  earned_today:{
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  unclaimed: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});


module.exports = User ;
