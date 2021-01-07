const Members = require("../database/Members")

const execute = (client, message,args) => {

  Members.create({
    memberName: args[0],
    memberRole: args[1],
  }).then(()=>{
    message.reply(`Membro ${args[0]} foi registrado com sucesso!`)
  })
}

module.exports = {
  name: 'memberRegister',
  description: 'Registra um membro no banco de dados',
  execute,
}