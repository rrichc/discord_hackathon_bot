const { Command } = require("discord.js-commando");

module.exports = class SayCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "say",
      aliases: ["parrot", "copy"],
      group: "first",
      memberName: "say",
      description: "Replies with the text you provide.",
      args: [
        {
          key: "text",
          prompt: "What text would you like the bot to say?",
          type: "string",
        },
        {
          key: "text2",
          prompt: "What text would you like the bot to say 2?",
          type: "string",
        },
      ],
    });
  }

  run(message, { text, text2 }) {
    return message.reply(text + text2);
  }
};
