const Sequelize = require("sequelize");

const connection = new Sequelize("botdatabase", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
