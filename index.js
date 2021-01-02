const { ownerID, token } = require("./config.json");
const { CommandoClient } = require("discord.js-commando");
const path = require("path");
const { Collection } = require("discord.js");

const client = new CommandoClient({
  commandPrefix: "h!",
  owner: ownerID,
});
// TODO: Maybe subject to change based on Firebase file structure
client.hackathons = new Collection();

client.registry
  .registerDefaultTypes()
  .registerTypes([require("./types/date.js")])
  .registerGroups([
    ["hackathon", "Hackathon Command Group"],
    ["team", "Team Command Group"],
  ])
  .registerDefaultGroups({
    eval: false,
  })
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
  client.user.setActivity("with h!help");
});

client.on("error", console.error);

client.login(token);
