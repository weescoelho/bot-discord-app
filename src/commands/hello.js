const execute = (client, message, args) => {
  let guild = message.guild;
  console.log(guild.roles)
}

module.exports = {
  name:"hello",
  description:"Teste",
  execute,
}