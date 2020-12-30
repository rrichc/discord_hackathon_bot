const { Collection } = require("discord.js");

class Hackathon {
  constructor(hackathonName, startDate, endDate) {
    this._hackathonName = hackathonName;
    this._startDate = startDate;
    this._endDate = endDate;
    this._teams = new Collection();
  }

  get name() {
    return this._hackathonName;
  }

  get startDate() {
    return this._startDate;
  }

  get endDate() {
    return this._endDate;
  }

  get teams() {
    return this._teams;
  }

  set name(newName) {
    this._hackathonName = newName;
  }

  set startDate(newDate) {
    this._startDate = newDate;
  }

  set endDate(newDate) {
    this._endDate = newDate;
  }

  equals(hackathon) {
    return this._hackathonName == hackathon.name();
  }

  addTeam() {
    // ..
  }
}

module.exports = Hackathon;
