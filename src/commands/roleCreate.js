const { Guild, Channel } = require("discord.js");
const Discord = require("discord.js");

const execute = (client, message, args) => {

  const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setAuthor(`Cargo criado por: ${message.author.username}`)
    .setThumbnail(message.author.displayAvatarURL())
    .addFields({name:`Cargo criado:`,value:`${args[0]}`,inline:true},
               {name:`Cor:`, value:`${args[1]}`,inline:true})
    .setFooter('Desenvolvido por Weslley Coelho, 2020.')

    message.channel.send(embed)

  let guild = message.guild;
  if (args[0] == null || args[1] == null) {
    message.reply("Comando inválido! >roleCreate [nome do cargo] [cor]");
  }
  if (args[0] && args[1]) {
    guild.roles
      .create({
        data: {
          name: args[0],
          color: args[1],
        },
        reason: `Você precisa do cargo de ${this.name}`,
      })
      .then(console.log)
      .catch(console.error);
  }
};

module.exports = {
  name: "roleCreate",
  description: "Comando para criação de cargos",
  execute,
};
