const { Command } = require("discord.js-commando");
const DuplicateValueException = require("../../model/exceptions/DuplicateValueException");
const ValueNotFoundException = require("../../model/exceptions/ValueNotFoundException");
const Teams = require("../../model/teams");
const Hackathons = require("../../model/hackathons");

module.exports = class AddTeamCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "addteam",
      aliases: ["addteam"],
      group: "team",
      memberName: "addteam",
      description: "Adds a new team to the hackathon.",
      examples: ["h!addteam hackathonName teamName capacity"],
      args: [
        {
          key: "hackathonName",
          prompt: "What is the name of the hackathon?",
          type: "string",
        },
        {
          key: "teamName",
          prompt: "What is the name of the team?",
          type: "string",
        },
        {
          key: "capacity",
          prompt: "What is the max capacity of the team?",
          type: "integer",
        },
      ],
    });
  }

  run(message, { hackathonName, teamName, capacity }) {
    try {
      const hackathon = Hackathons.getHackathon(this.client, hackathonName);
      Teams.addNewTeam(hackathon, teamName, message.author, capacity);
      // TODO: Remove after debugging
      console.log(hackathon);
      return message.reply(
        `Team Name: ${teamName}\nTeam Leader: ${
          message.author.username
        }\nTeam Capacity: ${capacity.toString()}\nhas been successfully added!`,
      );
    } catch (e) {
      if (e instanceof DuplicateValueException) {
        return message.reply(e.message);
      } else if (e instanceof ValueNotFoundException) {
        return message.reply(e.message);
      }
    }
  }
};
