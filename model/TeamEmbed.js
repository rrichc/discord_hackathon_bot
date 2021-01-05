const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const Hackathons = require("../../model/hackathons");

class TeamEmbed {
  static teamsEmbed(client, hackathonName) {
    const hackathon = Hackathons.getHackathon(client, hackathonName);
    return createEmbed(hackathon);
  }
}

function createEmbed(hackathon) {
  return (
    new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle(hackathon.name)
      // .setURL("https://discord.js.org/")
      .setAuthor("BCS Hackathon Bot", "https://i.imgur.com/wSTFkRM.png")
      .setDescription(createDescription(hackathon))
      // .setThumbnail("https://i.imgur.com/wSTFkRM.png")
      // .addFields(createRows(client))
      // .setImage("https://i.imgur.com/wSTFkRM.png")
      .setTimestamp()
      .setFooter("Page #X", "https://i.imgur.com/wSTFkRM.png")
  );
}

function createDescription(hackathon) {
  const nameOffset = 20;
  const capacityOffset = 8;
  const rows = hackathon.teams.map(createRow);
  const header =
    "`" +
    "Team Name".padEnd(nameOffset) +
    "` `" +
    "Capacity".padEnd(capacityOffset) +
    "` `" +
    "Team Leader".padEnd(nameOffset) +
    "`" +
    "\n";
  const description = header + rows;
  const descriptionClean = description.replace(/,/g, "");
  // TODO: Remove after debugging
  // console.log(descriptionClean);
  return descriptionClean;
}

function createRow(team) {
  const nameOffset = 20;
  const capacityOffset = 8;
  const userMention = "<@" + team.teamLeader.id + ">";
  const capacityText = team.teamMembers.keyArray().length + "/" + team.capacity;
  return (
    "`" +
    team.name.padEnd(nameOffset) +
    "` `" +
    capacityText.padEnd(capacityOffset) +
    "` " +
    userMention +
    "\n"
  );
}

module.exports = TeamEmbed;
