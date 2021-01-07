const execute = async (client,message,args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("Você não tem permissão necessária para utilizar este comando!")

  const deleteCount = parseInt(args[0], 10)
  if(!deleteCount || deleteCount < 1 || deleteCount >= 100)
    return message.reply("Forneça um número de até 100 mensagens a serem excluídas")

  const fetched = await message.channel.messages.fetch({limit: deleteCount + 1});
  message.channel
    .bulkDelete(fetched)
    message.channel.send(`${args[0]} mensagens limpas neste chat!`)
    .catch(error => console.log(`Não foi possível deletar mensagens devido a: ${error}`))
}

module.exports = {
  name:"clear",
  description:"Executa limpeza de chat de 0 á 100 messagens",
  execute
}