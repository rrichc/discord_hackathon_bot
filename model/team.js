const AlreadyTeamMemberException = require("./exceptions/AlreadyTeamMemberException");
const TeamFullException = require("./exceptions/TeamFullException");

class Team {
  constructor(teamName, teamLeader, capacity, hackathonName) {
    this._teamName = teamName;
    this._teamLeader = { username: teamLeader.username, id: teamLeader.id };
    this._capacity = capacity;
    this._hackathonName = hackathonName;
    this._teamMembers = [];
    this._teamMembers.push(this._teamLeader);
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

  // Implement add team member method
  // Check if already a member and less than capacity
  joinTeam(user) {
    const userNameID = { username: user.username, id: user.id };
    let alreadyMember = false;
    this.teamMembers.forEach(function (member) {
      if (member.id === userNameID.id) {
        alreadyMember = true;
      }
    });
    if (alreadyMember) {
      throw new AlreadyTeamMemberException(
        "You are already a member of this team.",
      );
    }
    if (this.teamMembers.length >= this.capacity) {
      throw new TeamFullException("The team is full!");
    }
    this.teamMembers.push(userNameID);
    // TODO: Remove when done debugging
    console.log(this._teamMembers);
  }

  // Implement leave as team member method
  // Check if already a member, and if they are the team leader
  // Leaving as team leader should designate the next person in line as team leader
  // If they are the only person left in the team, team is deleted

  // Implement remove team member as team leader method
}

module.exports = Team;
