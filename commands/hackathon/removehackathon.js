const { Command } = require("discord.js-commando");
const ValueNotFoundException = require("../../model/exceptions/ValueNotFoundException");
const Hackathons = require("../../model/hackathons");

module.exports = class RemoveHackathonCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "removehackathon",
      aliases: ["removehack"],
      group: "hackathon",
      memberName: "removehackathon",
      description:
        "Removes an existing hackathon from the list of on-going hacks.",
      userPermissions: ["MANAGE_GUILD"],
      guildOnly: true,
      examples: ["h!removehackathon hackathonName"],
      args: [
        {
          key: "hackathonName",
          prompt: "What is the name of the hackathon to be removed?",
          type: "string",
        },
      ],
    });
  }

  // TODO: Implement the ability for non-admins to remove a hackathon if within a certain time limit of creation (10 mins)?

  run(message, { hackathonName }) {
    try {
      Hackathons.removeHackathon(this.client, hackathonName);
      // TODO: Remove after debugging
      console.log(this.client.hackathons);
      return message.reply(
        `Hackathon Name: ${hackathonName}\nhas been successfully removed!`,
      );
    } catch (e) {
      if (e instanceof ValueNotFoundException) {
        return message.reply(e.message);
      }
    }
  }
};
