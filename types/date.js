const { ArgumentType } = require("discord.js-commando");
const moment = require("moment-timezone");

class DateArgumentType extends ArgumentType {
  constructor(client) {
    super(client, "date");
    moment.tz.setDefault("America/Vancouver");
  }

  validate(val) {
    return moment(val, "MM-DD-YYYY", true).isValid();
  }

  parse(val) {
    return moment(val, "MM-DD-YYYY");
  }
}

module.exports = DateArgumentType;
