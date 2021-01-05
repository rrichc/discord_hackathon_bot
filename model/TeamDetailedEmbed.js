const Discord = require("discord.js");
const Hackathons = require("./hackathons");
const Teams = require("./teams");

class TeamDetailedEmbed {
  static createTeamDetailedEmbed(client, hackathonName, teamName) {
    const hackathon = Hackathons.getHackathon(client, hackathonName);
    const team = Teams.getTeam(hackathon, teamName);
    return createEmbed(hackathon, team);
  }
}

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
        { name: "Notes", value: "To be implemented later.", inline: true }
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

module.exports = TeamDetailedEmbed;
