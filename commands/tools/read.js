const { Command } = require("discord.js-commando");

module.exports = class ReadCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "read",
      group: "management",
      memberName: "read",
      description: "Rebuilds the local memory from Firebase.",
      examples: ["h!read"],
      userPermissions: ["MANAGE_GUILD"],
    });
  }

  run(message) {
    this.client.database.read();
    return message.reply(`The local memory has been rebuilt.`);
  }
};
