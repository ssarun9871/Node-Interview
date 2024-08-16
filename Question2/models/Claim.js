const Sequelize = require('sequelize');
const db = require('../Config/database/database');

const Claim = db.define('Claim', {
    claim_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    claim_timestamp: {
      type: Sequelize.INTEGER
    },
    claim_amount: {
      type: Sequelize.INTEGER
    }
  });

  module.exports = Claim;
  