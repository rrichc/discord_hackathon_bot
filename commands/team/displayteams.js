const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
// const Hackathons = require("../../model/hackathons");

module.exports = class DisplayTeamsCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "displayteams",
      aliases: ["dispteam", "dispteams", "showteam", "showteams"],
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
    const hackathon = this.client.hackathons.get(hackathonName);
    if (!hackathon) {
      return message.reply(
        `No hackathon with the name ${hackathonName} exists! Please double check your spelling.`,
      );
    }
    return message.reply(createEmbed(hackathon));
  }
};

function createEmbed(hackathon) {
  return (
    new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle(hackathon.name)
      // .setURL("https://discord.js.org/")
      .setAuthor(
        "BCS Hackathon Bot",
        "https://i.imgur.com/wSTFkRM.png",
        "https://discord.js.org",
      )
      .setDescription(createDescription(hackathon))
      // .setThumbnail("https://i.imgur.com/wSTFkRM.png")
      // .addFields(createRows(client))
      // .setImage("https://i.imgur.com/wSTFkRM.png")
      .setTimestamp()
      .setFooter("Page #X", "https://i.imgur.com/wSTFkRM.png")
  );
}

// TODO: Sort the hackathons by start date before creating the rows

function createDescription(hackathon) {
  const nameOffset = 20;
  const capacityOffset = 8;
  const rows = hackathon.teams.map(createRow);
  const header =
    "`" +
    "Team Name".padStart(nameOffset) +
    "` `" +
    "Team Leader".padStart(nameOffset) +
    "` `" +
    "Capacity".padStart(capacityOffset) +
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
  return (
    "`" +
    team.name.padStart(nameOffset) +
    "` `" +
    team.teamLeader.username.padStart(nameOffset) +
    "` `" +
    team.capacity.toString().padStart(capacityOffset) +
    "`" +
    "\n"
  );
}
