const execute = (client, message, args) => {

  const guild = message.guild;

  if (args[0] == null)
    return message.reply("digite o nome do cargo a ser excluido!");

  if (args[0]) {
    guild.roles.cache.find((role) => role.name === args[0]).delete();
    message.reply(`Cargo ${args[0]} foi deletado.`);
  }
};

module.exports = {
  name: "roleDelete",
  description: "Deleta o cargo",
  execute,
};
