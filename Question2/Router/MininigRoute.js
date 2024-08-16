const Router = require('express').Router();
const {startMining, claimCoins} = require('../Controller/MiningController')

Router.post('/start', startMining);
Router.post('/claim', claimCoins);

module.exports = Router;