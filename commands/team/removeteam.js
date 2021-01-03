const { Command } = require("discord.js-commando");
const InsufficientPermissionException = require("../../model/exceptions/InsufficientPermissionException");
const ValueNotFoundException = require("../../model/exceptions/ValueNotFoundException");
const Teams = require("../../model/teams");
const Hackathons = require("../../model/hackathons");

module.exports = class RemoveTeamCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "removeteam",
      // aliases: ["rteam"],
      group: "team",
      memberName: "removeteam",
      description: "Removes an existing team from a hackathon.",
      guildOnly: true,
      examples: ["h!removeteam hackathonName teamName"],
      args: [
        {
          key: "hackathonName",
          prompt: "What is the name of the hackathon the team is in?",
          type: "string",
        },
        {
          key: "teamName",
          prompt: "What is the name of the team to be removed?",
          type: "string",
        },
      ],
    });
  }

  run(message, { hackathonName, teamName }) {
    try {
      const hackathon = Hackathons.getHackathon(this.client, hackathonName);
      Teams.removeTeam(hackathon, teamName, message);
      // TODO: Remove after debugging
      // console.log(hackathon);
      return message.reply(
        `Team Name: ${teamName}\nhas been successfully removed!`,
      );
    } catch (e) {
      if (e instanceof ValueNotFoundException) {
        return message.reply(e.message);
      } else if (e instanceof InsufficientPermissionException) {
        return message.reply(e.message);
      }
    }
  }
};
