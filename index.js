require("dotenv-flow").config({ silent: true });
const { CommandoClient } = require("discord.js-commando");
const path = require("path");
const { Collection } = require("discord.js");
const Database = require("./database/Database.js");

// ================= EXPRESS SERVER FOR REPL ===================

// const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/", (req, res) => res.send("Hello World!"));

// app.listen(port, () =>
//   console.log(`Example app listening at http://localhost:${port}`)
// );

// ================= START BOT CODE ===================

const client = new CommandoClient({
  commandPrefix: "h!",
  owner: process.env.OWNERID,
});
client.hackathons = new Collection();
client.database = new Database(client);
client.database.read();

client.registry
  .registerDefaultTypes()
  .registerTypes([require("./types/date.js")])
  .registerGroups([
    ["hackathon", "Hackathon Command Group"],
    ["team", "Team Command Group"],
    ["tools", "Tool Command Group"],
  ])
  .registerDefaultGroups({
    eval: false,
  })
  .registerDefaultCommands({
    unknownCommand: false,
  })
  .registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
  client.user.setActivity("with h!help");
});

client.on("error", console.error);

client.login(process.env.TOKEN);
