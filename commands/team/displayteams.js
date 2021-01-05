const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const Hackathons = require("../../model/hackathons");
const ValueNotFoundException = require("../../model/exceptions/ValueNotFoundException");

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
      const hackathon = Hackathons.getHackathon(this.client, hackathonName);
      return message.reply(createEmbed(hackathon));
    } catch (e) {
      if (e instanceof ValueNotFoundException) {
        return message.reply(e.message);
      } else {
        throw e;
      }
    }
  }
};

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
