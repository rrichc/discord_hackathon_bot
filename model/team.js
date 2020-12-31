class Team {
  constructor(teamName, teamLeader, capacity, hackathonName) {
    this._teamName = teamName;
    this._teamLeader = teamLeader;
    this._capacity = capacity;
    this._hackathonName = hackathonName;
    this._teamMembers = [];
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
}

module.exports = Team;
