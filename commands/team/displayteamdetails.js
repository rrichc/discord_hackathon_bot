const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const Hackathons = require("../../model/hackathons");
const Teams = require("../../model/teams");
const ValueNotFoundException = require("../../model/exceptions/ValueNotFoundException");

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
      const hackathon = Hackathons.getHackathon(this.client, hackathonName);
      const team = Teams.getTeam(hackathon, teamName);
      return message.reply(createEmbed(hackathon, team));
    } catch (e) {
      if (e instanceof ValueNotFoundException) {
        return message.reply(e.message);
      }
    }
  }
};

function createEmbed(hackathon, team) {
  return (
    new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle(team.name + " | " + hackathon.name)
      .setAuthor("BCS Hackathon Bot", "https://i.imgur.com/wSTFkRM.png")
      // .setDescription("----------------------")
      .addFields(
        { name: "Team Leader", value: "<@" + team.teamLeader.id + ">" },
        // { name: "\u200B", value: "\u200B" },
        { name: "Team Members", value: createTeamList(team), inline: true },
        { name: "Notes", value: "Lorem ipsum", inline: true },
      )
      .setTimestamp()
      .setFooter("Page #X", "https://i.imgur.com/wSTFkRM.png")
  );
}

function createTeamList(team) {
  let teamList = "";
  const teamMembers = team.teamMembers.keyArray();
  let i;
  for (i in teamMembers) {
    teamList += "<@" + teamMembers[i] + ">\n";
  }
  return teamList;
}
