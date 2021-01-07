const Members = require("../database/Members");
const execute = (client, message, args) => {
  Members.findAll({ raw: true }).then((member) => {
    // message.channel.send(require('util').inspect(member));
    member.forEach((member) => {
      message.channel.send(`**Nome:** ${member.memberName}\n**Cargo:** ${member.memberRole}`);
    });
  });
};

module.exports = {
  name: "memberList",
  description: "Lista os membros do banco de dados",
  execute,
};
