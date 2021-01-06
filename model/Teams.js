const moment = require("moment");
const DuplicateValueException = require("./exceptions/DuplicateValueException");
const InsufficientPermissionException = require("./exceptions/InsufficientPermissionException");
const ValueNotFoundException = require("./exceptions/ValueNotFoundException");
const Team = require("./Team");

class Teams {
  static addNewTeam(client, hackathon, teamName, teamLeader, capacity) {
    const newTeam = new Team(teamName, teamLeader, capacity, hackathon.name);
    // TODO: Use fuzzy string matching to determine if trying to add a similar team?
    if (!hackathon.teams.has(teamName)) {
      hackathon.teams.set(teamName, newTeam);
      client.database.addTeam(
        hackathon.name,
        hackathon.teams.keyArray(),
        newTeam
      );
    } else {
      throw new DuplicateValueException(
        "A team with this name already exists."
      );
    }
  }

  static removeTeam(client, hackathon, teamName, message) {
    const team = this.getTeam(hackathon, teamName);
    const user = message.author;
    const member = message.member;
    if (
      user.id === team.teamLeader.id ||
      member.hasPermission("MANAGE_GUILD")
    ) {
      // Make change directly to client
      hackathon.teams.delete(teamName);
      client.database.removeTeam(
        hackathon.name,
        teamName,
        hackathon.teams.keyArray()
      );
    } else {
      throw new InsufficientPermissionException(
        "You are not the team's leader or server member with sufficient permission."
      );
    }
  }

  static getTeam(hackathon, teamName) {
    const team = hackathon.teams.get(teamName);
    if (!team) {
      throw new ValueNotFoundException(
        `No team with the name: ${teamName} was found.`
      );
    }
    return team;
  }
}

module.exports = Teams;
