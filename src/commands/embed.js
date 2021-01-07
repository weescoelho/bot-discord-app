const Discord = require('discord.js')

const execute = (client, message,args) => {
  const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Titulo')
    .setURL('https://google.com')
    .setAuthor(message.author.username)
    .setDescription('Embed de teste')
    .setThumbnail(message.author.displayAvatarURL())
    .setFooter('Desenvolvido por Weslley Coelho, 2020.')

    message.channel.send(embed)
}

module.exports = {
  name:'embed',
  description:'Teste de mensagem embed',
  execute
}