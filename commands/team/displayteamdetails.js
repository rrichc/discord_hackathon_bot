const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const Hackathons = require("../../model/hackathons");
const Teams = require("../../model/teams");
const ValueNotFoundException = require("../../model/exceptions/ValueNotFoundException");
const TeamDetailedEmbed = require("../../model/TeamDetailedEmbed");

module.exports = class DisplayTeamDetailsCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "displayteamdetails",
      aliases: [
        "dispteam",
        "showteam",
        "displayteamdetailed",
        "dispteamdetailed",
      ],
      group: "team",
      memberName: "displayteamdetails",
      description: "Displays the details for a team in a hackathon.",
      examples: ["h!displayteamdetails hackathonName teamName"],
      args: [
        {
          key: "hackathonName",
          prompt:
            "What is the name of the hackathon you would like to team detail for?",
          type: "string",
        },
        {
          key: "teamName",
          prompt:
            "What is the name of the team you would like to view in more detail?",
          type: "string",
        },
      ],
    });
  }

  run(message, { hackathonName, teamName }) {
    try {
      return message.reply(
        TeamDetailedEmbed.createTeamDetailedEmbed(
          this.client,
          hackathonName,
          teamName
        )
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
