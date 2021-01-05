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
    const hackathonArray = Array.from(this.client.hackathons.keys());
    message.reply(createEmbed(this.client));
    const filter = (response) => {
      // console.log(response); // add a check for the response.author.id === message.author.id
      const intResponse = parseInt(response.content);
      return (
        response.author.id === message.author.id &&
        !isNaN(intResponse) &&
        intResponse >= 1 &&
        intResponse <= hackathonArray.length
      );
    };
    message.channel
      .send(
        "Enter a corresponding number to view the current teams within a specific Hackathon:"
      )
      .then(() => {
        message.channel
          .awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
          .then((collected) => {
            // Initiate displaying teams for a specific hackathon here.

            message.channel.send(
              `${collected.first().author} Filter worked. ${
                hackathonArray[parseInt(collected.first().content) - 1]
              }.`
            );
          });
      });
    return;
  }
};

function createEmbed(client) {
  return (
    new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Hackathons")
      .setAuthor("BCS Hackathon Bot", "https://i.imgur.com/wSTFkRM.png")
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
