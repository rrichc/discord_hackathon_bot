const AlreadyTeamMemberException = require("./exceptions/AlreadyTeamMemberException");
const TeamFullException = require("./exceptions/TeamFullException");
const ValueNotFoundException = require("./exceptions/ValueNotFoundException");
const { Collection } = require("discord.js");

class Team {
  constructor(teamName, teamLeader, capacity, hackathonName) {
    this._teamName = teamName;
    this._teamLeader = { id: teamLeader.id, username: teamLeader.username };
    this._capacity = capacity;
    this._hackathonName = hackathonName;
    this._teamMembers = new Collection();
    this._teamMembers.set(teamLeader.id, teamLeader.username);
  }

  get name() {
    return this._teamName;
  }

  get teamLeader() {
    return this._teamLeader;
  }

  get capacity() {
    return this._capacity;
  }

  get hackathonName() {
    return this._hackathonName;
  }

  get teamMembers() {
    return this._teamMembers;
  }

  set name(newName) {
    this._teamName = newName;
  }

  set teamLeader(newTeamLeader) {
    this._teamLeader = newTeamLeader;
  }

  set capacity(newCapacity) {
    this._capacity = newCapacity;
  }

  set teamMembers(newTeamMembers) {
    this._teamMembers = newTeamMembers;
  }

  equals(team) {
    return this._teamName == team.name;
  }

  // Consider a check to see if part of other teams already
  joinTeam(user) {
    if (this.teamMembers.has(user.id)) {
      throw new AlreadyTeamMemberException(
        "You are already a member of this team.",
      );
    }
    if (this.teamMembers.keyArray().length >= this.capacity) {
      throw new TeamFullException("The team is full!");
    }
    this.teamMembers.set(user.id, user.username);
    // TODO: Remove when done debugging
    console.log(this._teamMembers);
  }

  // Implement leave as team member method
  // Check if already a member, and if they are the team leader
  // Leaving as team leader should designate the next person in line as team leader
  // If they are the only person left in the team, team is deleted
  leaveTeam(user, hackathon) {
    if (!this.teamMembers.has(user.id)) {
      throw new ValueNotFoundException("You are not a part of this team.");
    }
    // check if they are the only one left in the team, delete team, else continue below
    if (this.teamMembers.keyArray().length <= 1) {
      hackathon.teams.delete(this.name);
      // else remove as a teammember, then check if also a team leader
      // if team leader than remove as team leader and designate the next in line
    } else {
      this.teamMembers.delete(user.id);
      if (user.id === this.teamLeader.id) {
        const newTeamLeader = this.teamMembers.first(1);
        this.teamLeader({ id: newTeamLeader[0], username: newTeamLeader[1] });
      }
    }
  }

  // Implement remove team member as team leader method
}

module.exports = Team;
