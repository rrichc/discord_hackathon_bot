const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "args-info") {
    if (!args.length) {
      return message.channel.send(
        `You didn't provide any arguments, ${message.author}!`,
      );
    }
    message.channel.send(`Command name: ${command}\nArguments: ${args}`);
  } else if (command === "avatar") {
    if (!message.mentions.users.size) {
      return message.channel.send(
        `Your avatar: <${message.author.displayAvatarURL({
          format: "png",
          dynamic: true,
        })}>`,
      );
    }

    const avatarList = message.mentions.users.map((user) => {
      return `${user.username}'s avatar: <${user.displayAvatarURL({
        format: "png",
        dynamic: true,
      })}>`;
    });

    // send the entire array of strings as a message
    // by default, discord.js will `.join()` the array with `\n`
    message.channel.send(avatarList);
  }
});

client.login(token);
