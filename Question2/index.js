const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const associations = require("./Config/database/associations");
const db = require("./Config/database/database");

const MiningRoutes = require('../Question2/Router/MininigRoute');
const UserRoutes = require('../Question2/Router/UserRoute');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/mining', MiningRoutes);
app.use('/user', UserRoutes);

db
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3000);
    console.log("Server is live on port: " + (process.env.PORT || 3000));
  })
  .catch((err) => {
    console.error(err);
  });
