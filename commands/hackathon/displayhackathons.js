const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
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
    HackthonsEmbed.createHackathonsEmbedPromptTeam(this.client, message);
    return;
  }
};
