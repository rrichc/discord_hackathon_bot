const Discord = require("discord.js");
const Hackathons = require("./hackathons");
const TeamDetailedEmbed = require("./TeamDetailedEmbed");

class TeamsEmbed {
  static createTeamsEmbed(client, hackathonName) {
    const hackathon = Hackathons.getHackathon(client, hackathonName);
    return createEmbed(hackathon);
  }

  static createTeamsEmbedPromptTeam(client, message, hackathonName) {
    const hackathon = Hackathons.getHackathon(client, hackathonName);
    const teamArray = Array.from(hackathon.teams.keys());
    message.reply(createEmbed(hackathon));
    const filter = (response) => {
      const intResponse = parseInt(response.content);
      return (
        response.author.id === message.author.id &&
        !isNaN(intResponse) &&
        intResponse >= 1 &&
        intResponse <= teamArray.length
      );
    };
    message.channel
      .send("Enter a corresponding number to view detailed team info:")
      .then(() => {
        message.channel
          .awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
          .then((collected) => {
            const teamIndex = parseInt(collected.first().content);
            if (!isNaN(teamIndex)) {
              message.reply(
                TeamDetailedEmbed.createTeamDetailedEmbed(
                  client,
                  hackathon.name,
                  teamArray[teamIndex - 1]
                )
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

function createEmbed(hackathon) {
  return new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle(hackathon.name)
    .setAuthor(
      "BCS Hackathon Organizer ALPHA",
      "https://i.imgur.com/wSTFkRM.png"
    )
    .setDescription(createDescription(hackathon))
    .setTimestamp()
    .setFooter("Page #X", "https://i.imgur.com/wSTFkRM.png");
}

function createDescription(hackathon) {
  const nameOffset = 20;
  const capacityOffset = 8;
  const teamsArray = hackathon.teams.array();
  const rows = teamsArray.map(createRow);
  const header =
    "`" +
    "#".padStart(2) +
    "` `" +
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

function createRow(team, index) {
  const num = index + 1;
  const nameOffset = 20;
  const capacityOffset = 8;
  const userMention = "<@" + team.teamLeader.id + ">";
  const capacityText = team.teamMembers.keyArray().length + "/" + team.capacity;
  return (
    "`" +
    num.toString().padStart(2) +
    "` `" +
    team.name.padEnd(nameOffset) +
    "` `" +
    capacityText.padEnd(capacityOffset) +
    "` " +
    userMention +
    "\n"
  );
}

module.exports = TeamsEmbed;
