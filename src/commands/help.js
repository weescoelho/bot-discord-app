const { help } = require("./hello")

const execute = (client,message,args) => {
  message.reply('** segue lista de comandos implementados! **')
  client.commands.forEach(command =>{
    message.channel.send(`
    >${command.name} : ${command.description}
    `)
  })
}

module.exports = {
  name:"help",
  description:"Apresenta lista de comandos",
  execute
}