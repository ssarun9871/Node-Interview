const Router = require('express').Router();
const {addUser, getBalance} = require('../Controller/UserController')

Router.post('/add', addUser);
Router.get('/balance', getBalance);

module.exports = Router;