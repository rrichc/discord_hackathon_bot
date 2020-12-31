// const { ArgumentType } = require("discord.js-commando");
const moment = require("moment");
const DuplicateValueException = require("./exceptions/DuplicateValueException");
const InsufficientPermissionException = require("./exceptions/InsufficientPermissionException");
const ValueNotFoundException = require("./exceptions/ValueNotFoundException");
const Team = require("./team");

class Teams {
  static addNewTeam(hackathon, teamName, teamLeader, capacity) {
    const newTeam = new Team(teamName, teamLeader, capacity, hackathon.name);
    // TODO: Use fuzzy string matching to determine if trying to add a similar team?
    if (!hackathon.teams.has(teamName)) {
      hackathon.teams.set(teamName, newTeam);
    } else {
      throw new DuplicateValueException(
        "A team with this name already exists.",
      );
    }
  }

  static removeTeam(hackathon, teamName, message) {
    const teamNotFound = new ValueNotFoundException(
      `No team with the name: ${teamName} was found.`,
    );
    const team = hackathon.teams.get(teamName);
    if (!team) {
      throw teamNotFound;
    }
    const user = message.author;
    const member = message.member;
    if (
      user.id === team.teamLeader.id ||
      member.hasPermission("MANAGE_GUILD")
    ) {
      if (!hackathon.teams.delete(teamName)) {
        throw teamNotFound;
      }
    } else {
      throw new InsufficientPermissionException(
        "You are not the team's leader or server member with sufficient permission.",
      );
    }
  }

  // Implement add team member method
}

module.exports = Teams;
