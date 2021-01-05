const { Command } = require("discord.js-commando");
const ValueNotFoundException = require("../../model/exceptions/ValueNotFoundException");
const Teams = require("../../model/teams");
const Hackathons = require("../../model/hackathons");

module.exports = class LeaveTeamCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "leaveteam",
      // aliases: ["lteam"],
      group: "team",
      memberName: "leaveteam",
      description: "Leave a team in a hackathon.",
      guildOnly: true,
      examples: ["h!leaveteam hackathonName teamName"],
      args: [
        {
          key: "hackathonName",
          prompt:
            "What is the name of the hackathon the team is in?\nWarning: If you are the team leader a new one will be chosen. If you leave as the last member of the team, the team will be disbanded.",
          type: "string",
        },
        {
          key: "teamName",
          prompt: "What is the name of the team you want to leave?",
          type: "string",
        },
      ],
    });
  }

  run(message, { hackathonName, teamName }) {
    try {
      const hackathon = Hackathons.getHackathon(this.client, hackathonName);
      const team = Teams.getTeam(hackathon, teamName);
      team.leaveTeam(this.client, message.author, hackathon);
      return message.reply(
        `Team Name: ${teamName}\nhas been successfully left!`
      );
    } catch (e) {
      if (e instanceof ValueNotFoundException) {
        return message.reply(e.message);
      }
    }
  }
};
