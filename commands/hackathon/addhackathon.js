const { Command } = require("discord.js-commando");
const DuplicateValueException = require("../../model/exceptions/DuplicateValueException");
const Hackathons = require("../../model/hackathons");

module.exports = class AddHackathonCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "addhackathon",
      aliases: ["addhack"],
      group: "hackathon",
      memberName: "addhackathon",
      description: "Adds a new hackathon to the list of on-going hacks.",
      examples: ["h!addhackathon hackathonName 01-15-2021 01-16-2021"],
      args: [
        {
          key: "hackathonName",
          prompt: "What is the name of the hackathon?",
          type: "string",
        },
        {
          key: "startDate",
          prompt: "When does the hackathon start? Enter MM-DD-YYYY",
          type: "date",
        },
        {
          key: "endDate",
          prompt: "When does the hackathon end? Enter MM-DD-YYYY",
          type: "date",
        },
      ],
    });
  }

  run(message, { hackathonName, startDate, endDate }) {
    try {
      Hackathons.addNewHackathon(
        this.client,
        hackathonName,
        startDate,
        endDate
      );
      // TODO: Remove after debugging
      // console.log(this.client.hackathons);
      return message.reply(
        `Hackathon Name: ${hackathonName}\nHackathon Start: ${startDate.format(
          "MMM Do YYYY"
        )}\nHackathon End: ${endDate.format(
          "MMM Do YYYY"
        )}\nhas been successfully added!`
      );
    } catch (e) {
      if (e instanceof DuplicateValueException) {
        return message.reply(e.message);
      }
    }
  }
};
