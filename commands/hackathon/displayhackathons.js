const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
// const Hackathons = require("../../model/hackathons");

module.exports = class DisplayHackathonsCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "displayhackathons",
      aliases: [
        "disphack",
        "disphacks",
        "displayhacks",
        "showhacks",
        "showhackathons",
      ],
      group: "hackathon",
      memberName: "displayhackathons",
      description: "Displays the list of on-going hacks.",
      examples: ["h!displayhackathons"],
    });
  }

  run(message) {
    return message.reply(createEmbed(this.client));
  }
};

function createEmbed(client) {
  return (
    new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Hackathons")
      .setURL("https://discord.js.org/")
      .setAuthor(
        "BCS Hackathon Bot",
        "https://i.imgur.com/wSTFkRM.png",
        "https://discord.js.org",
      )
      .setDescription(createDescription(client))
      // .setThumbnail("https://i.imgur.com/wSTFkRM.png")
      // .addFields(createRows(client))
      // .setImage("https://i.imgur.com/wSTFkRM.png")
      .setTimestamp()
      .setFooter("Page #X", "https://i.imgur.com/wSTFkRM.png")
  );
}

// TODO: Sort the hackathons by start date before creating the rows

function createDescription(client) {
  const nameOffset = 20;
  const dateOffset = 15;
  const rows = client.hackathons.map(createRow);
  const header =
    "`" +
    "Hackathon".padStart(nameOffset) +
    "` `" +
    "Start Date".padStart(dateOffset) +
    "` `" +
    "End Date".padStart(dateOffset) +
    "`" +
    "\n";
  const description = header + rows;
  const descriptionClean = description.replace(/,/g, "");
  // TODO: Remove after debugging
  // console.log(descriptionClean);
  return descriptionClean;
}

function createRow(hackathon) {
  const nameOffset = 20;
  const dateOffset = 15;
  return (
    "`" +
    hackathon.name.padStart(nameOffset) +
    "` `" +
    hackathon.startDate.format("MMM Do YYYY").padStart(dateOffset) +
    "` `" +
    hackathon.endDate.format("MMM Do YYYY").padStart(dateOffset) +
    "`" +
    "\n"
  );
}
