const Sequelize = require("sequelize");
const connection = require("./database");

const Members = connection.define("Members", {
  memberName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  memberRole: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Members.sync({force:false}).then(() => {});
module.exports = Members;