// const { ArgumentType } = require("discord.js-commando");
const moment = require("moment");
const DuplicateValueException = require("./exceptions/DuplicateValueException");
const ValueNotFoundException = require("./exceptions/ValueNotFoundException");
const Hackathon = require("./hackathon");

class Hackathons {
  static addNewHackathon(client, hackathonName, startDate, endDate) {
    const newHackathon = new Hackathon(hackathonName, startDate, endDate);
    if (!client.hackathons.has(hackathonName)) {
      client.hackathons.set(hackathonName, newHackathon);
    } else {
      throw new DuplicateValueException(
        "A hackathon with this name already exists.",
      );
    }
  }

  static removeHackathon(client, hackathonName) {
    if (!client.hackathons.delete(hackathonName)) {
      throw new ValueNotFoundException(
        `No hackathon with the name: ${hackathonName} was found.`,
      );
    }
  }
}

module.exports = Hackathons;
