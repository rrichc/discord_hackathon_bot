const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const Hackathons = require("../../model/hackathons");
const ValueNotFoundException = require("../../model/exceptions/ValueNotFoundException");
const TeamsEmbed = require("../../model/TeamsEmbed");

module.exports = class DisplayTeamsCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "displayteams",
      aliases: ["dispteams", "showteams"],
      group: "team",
      memberName: "displayteams",
      description: "Displays the list of teams for a hackathon.",
      examples: ["h!displayteams hackathonName"],
      args: [
        {
          key: "hackathonName",
          prompt:
            "What is the name of the hackathon you would like to view teams for?",
          type: "string",
        },
      ],
    });
  }

  run(message, { hackathonName }) {
    try {
      return message.reply(
        TeamsEmbed.createTeamsEmbed(this.client, hackathonName)
      );
    } catch (e) {
      if (e instanceof ValueNotFoundException) {
        return message.reply(e.message);
      } else {
        throw e;
      }
    }
  }
};
