const { Command } = require("discord.js-commando");
const AlreadyTeamMemberException = require("../../model/exceptions/AlreadyTeamMemberException");
const ValueNotFoundException = require("../../model/exceptions/ValueNotFoundException");
const TeamFullException = require("../../model/exceptions/TeamFullException");
const Teams = require("../../model/Teams");
const Hackathons = require("../../model/Hackathons");

module.exports = class JoinTeamCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "jointeam",
      // aliases: ["jteam"],
      group: "team",
      memberName: "jointeam",
      description: "Join an existing team in a hackathon.",
      guildOnly: true,
      examples: ["h!jointeam hackathonName teamName"],
      args: [
        {
          key: "hackathonName",
          prompt: "What is the name of the hackathon the team is in?",
          type: "string",
        },
        {
          key: "teamName",
          prompt: "What is the name of the team you want to join?",
          type: "string",
        },
      ],
    });
  }

  run(message, { hackathonName, teamName }) {
    try {
      const hackathon = Hackathons.getHackathon(this.client, hackathonName);
      const team = Teams.getTeam(hackathon, teamName);
      team.joinTeam(this.client, message.author);
      return message.reply(
        `Team Name: ${teamName}\nhas been successfully joined!`
      );
    } catch (e) {
      if (e instanceof ValueNotFoundException) {
        return message.reply(e.message);
      } else if (e instanceof AlreadyTeamMemberException) {
        return message.reply(e.message);
      } else if (e instanceof TeamFullException) {
        return message.reply(e.message);
      } else {
        throw e;
      }
    }
  }
};
