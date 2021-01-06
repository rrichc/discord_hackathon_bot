const DuplicateValueException = require("./exceptions/DuplicateValueException");
const ValueNotFoundException = require("./exceptions/ValueNotFoundException");
const Hackathon = require("./Hackathon");

class Hackathons {
  static addNewHackathon(client, hackathonName, startDate, endDate) {
    const newHackathon = new Hackathon(hackathonName, startDate, endDate);
    // TODO: Use fuzzy string matching to determine if trying to add a similar hackathon?
    if (!client.hackathons.has(hackathonName)) {
      client.hackathons.set(hackathonName, newHackathon);
      client.database.addNewHackathon(hackathonName, startDate, endDate);
    } else {
      throw new DuplicateValueException(
        "A hackathon with this name already exists."
      );
    }
  }

  static removeHackathon(client, hackathonName) {
    if (!client.hackathons.delete(hackathonName)) {
      throw new ValueNotFoundException(
        `No hackathon with the name: ${hackathonName} was found. Please double check your spelling.`
      );
    }
    client.database.removeHackathon(hackathonName);
  }

  static getHackathon(client, hackathonName) {
    const hackathon = client.hackathons.get(hackathonName);
    if (!hackathon) {
      throw new ValueNotFoundException(
        `No hackathon with the name: ${hackathonName} was found. Please double check your spelling.`
      );
    }
    return hackathon;
  }
}

module.exports = Hackathons;
