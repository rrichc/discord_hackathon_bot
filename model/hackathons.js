// const { ArgumentType } = require("discord.js-commando");
const moment = require("moment");
const DuplicateHackathonException = require("./exceptions/DuplicateHackathonException");
const Hackathon = require("./hackathon");

class Hackathons {
  //   constructor(client) {
  //     this.client = client;
  //   }

  static addNewHackathon(client, hackathonName, startDate, endDate) {
    const newHackathon = new Hackathon(hackathonName, startDate, endDate);
    if (!client.hackathons.has(hackathonName)) {
      client.hackathons.set(hackathonName, newHackathon);
    } else {
      throw new DuplicateHackathonException(
        "A hackathon with this name already exists.",
      );
    }
  }
}

module.exports = Hackathons;
