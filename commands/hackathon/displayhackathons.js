const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const TeamsEmbed = require("../../model/TeamsEmbed");
const HackthonsEmbed = require("../../model/HackathonsEmbed");

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
    message.reply(HackthonsEmbed.createHackathonsEmbed(this.client));
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
            message.reply(
              TeamsEmbed.createTeamsEmbed(
                this.client,
                hackathonArray[parseInt(collected.first().content) - 1]
              )
            );
          });
      });
    return;
  }
};
