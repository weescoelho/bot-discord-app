const Discord = require("discord.js");
const client = new Discord.Client();
const dotenv = require("dotenv");
const express = require("express");
const bot = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Members = require("./database/Members");
const routes = require("./routes/routes");
const fs = require("fs");
const path = require("path");
dotenv.config();

//Configuração do EJS
bot.set("view engine", "ejs");
bot.use(express.static("./src/public"));
bot.set("views", "./src/views");

//Configura Body-parser
bot.use(bodyParser.urlencoded({ extended: false }));
bot.use(bodyParser.json());

//Conexão com o banco de dados
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com banco de dados!");
  })
  .catch((error) => {
    console.log(error);
  });

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync(path.join(__dirname, "/commands"))
  .filter((filename) => filename.endsWith(".js"));

for (var filename of commandFiles) {
  const command = require(`./commands/${filename}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log("BOT Conectado!");
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(process.env.PREFIX)) return;

  const args = message.content.slice(process.env.PREFIX.length).split(" ");
  const command = args.shift();
  try {
    client.commands.get(command).execute(client, message, args);
  } catch (err) {
    message.reply("este comando ainda não foi implementado!");
  }
});

//Rotas

bot.get("/", (req, res) => {
  res.render("index");
});
bot.get("/membros", (req, res) => {
  Members.findAll({ raw: true }).then((members) => {
    res.render("members", {
      members: members,
    });
  });
});

bot.get("/cadastrar", (req, res) => {
  res.render("memberCreate");
});

bot.get("/editar", (req, res) => {
  res.render("editMember");
});

bot.post("/savemember", (req, res) => {
  var memberName = req.body.memberName;
  var memberRole = req.body.memberRole;
  Members.create({
    memberName: memberName,
    memberRole: memberRole,
  }).then(() => {
    res.redirect("/membros");
  });
});

bot.post("/deletemember", (req, res) => {
  var memberID = req.body.memberID;
  Members.destroy({ where: { id: memberID } }).then(() => {
    res.redirect("/membros");
  });
});

bot.post("/getmemberinfo", (req, res) => {
  var memberID = req.body.memberID;
  Members.findOne({raw:true, where: { id: memberID } }).then((member) => {
    res.render('editMember', {
      member:member
    })
  });
});

//Em implementação....
bot.post('/editmember', (req, res) => {
  var memberID = req.memberID
  var newMemberName = req.body.memberName;
  var newMemberRole = req.body.memberRole;
  Members.update({where:memberID},{
    memberName: newMemberName,
    memberRole: newMemberRole,
  }).then(() => {
    res.redirect('members');
  })
})
// -------------------------------------------------------

bot.use("/routes", routes);

client.login(process.env.TOKEN);
bot.listen(4000, () => {
  console.log("Front-end Online!");
});
