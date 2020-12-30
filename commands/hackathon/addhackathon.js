const { Command } = require("discord.js-commando");
const DuplicateHackathonException = require("../../model/exceptions/DuplicateHackathonException");
const Hackathons = require("../../model/hackathons");

module.exports = class SayCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "addhackathon",
      aliases: ["addhack"],
      group: "hackathon",
      memberName: "addhackathon",
      description: "Adds a new hackathon to the list of on-going hacks.",
      examples: ["h!addhackathon 01-15-2021 01-16-2021"],
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
        endDate,
      );
      console.log(this.client.hackathons);
      return message.reply(
        `Hackathon Name: ${hackathonName}\nHackathon Start: ${startDate.toString()}\nHackathon End: ${endDate.toString()}\nhas been successfully added!`,
      );
    } catch (e) {
      if (e instanceof DuplicateHackathonException) {
        console.log(this.client.hackathons);
        return message.reply(e.message);
      }
    }
  }
};
