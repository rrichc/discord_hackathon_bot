const Discord = require("discord.js");
const TeamsEmbed = require("./TeamsEmbed");

class HackathonsEmbed {
  static createHackathonsEmbed(client) {
    return createEmbed(client);
  }

  static createHackathonsEmbedPromptTeam(client, message) {
    const hackathonArray = Array.from(client.hackathons.keys());
    message.reply(createEmbed(client));
    const filter = (response) => {
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
            const hackathonIndex = parseInt(collected.first().content);
            if (!isNaN(hackathonIndex)) {
              TeamsEmbed.createTeamsEmbedPromptTeam(
                client,
                message,
                hackathonArray[hackathonIndex - 1]
              );
            }
          })
          .catch((collected) => {
            return;
          });
      });
    return;
  }
}

function createEmbed(client) {
  return new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Hackathons")
    .setAuthor(
      "BCS Hackathon Organizer ALPHA",
      "https://i.imgur.com/wSTFkRM.png"
    )
    .setDescription(createDescription(client))
    .setTimestamp()
    .setFooter("Page #X", "https://i.imgur.com/wSTFkRM.png");
}

// TODO: Sort the hackathons by start date before creating the rows

function createDescription(client) {
  const nameOffset = 20;
  const dateOffset = 15;
  const hackathonsArray = client.hackathons.array();
  const rows = hackathonsArray.map(createRow);
  const header =
    "`" +
    "#".padStart(2) +
    "` `" +
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

function createRow(hackathon, index) {
  const num = index + 1;
  const nameOffset = 20;
  const dateOffset = 15;
  return (
    "`" +
    num.toString().padStart(2) +
    "` `" +
    hackathon.name.padStart(nameOffset) +
    "` `" +
    hackathon.startDate.format("MMM Do YYYY").padStart(dateOffset) +
    "` `" +
    hackathon.endDate.format("MMM Do YYYY").padStart(dateOffset) +
    "`" +
    "\n"
  );
}

module.exports = HackathonsEmbed;
