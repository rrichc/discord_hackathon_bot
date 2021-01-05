const { firebaseConfig, databaseURL, uid } = require("../config.json");
const admin = require("firebase-admin");
// const moment = require("moment");
// const DuplicateValueException = require("./exceptions/DuplicateValueException");
// const ValueNotFoundException = require("./exceptions/ValueNotFoundException");
// const Hackathon = require("./hackathon");

class Database {
  constructor(client) {
    this._client = client;
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: databaseURL,
      databaseAuthVariableOverride: {
        uid: uid,
      },
    });
    this._database = admin.database();
    this.rootRef = this.database.ref("/");
    this.hackathonsRef = this.rootRef.child("hackathons");
    this.teamsRef = this.rootRef.child("teams");
  }

  get database() {
    return this._database;
  }

  addNewHackathon(hackathonName, startDate, endDate) {
    const newHackathonRef = this.hackathonsRef.push();
    newHackathonRef.set({
      name: hackathonName,
      startDate: startDate.format("MM-DD-YYYY"),
      endDate: endDate.format("MM-DD-YYYY"),
    });
  }

  removeHackathon(hackathonName) {
    this.hackathonsRef
      .orderByChild("name")
      .equalTo(hackathonName)
      .once("child_added", function (snapshot) {
        snapshot.ref.remove();
      });
  }

  addTeam(hackathonName, newTeamList, newTeam) {
    // Updates the list of team names under the according hackathon
    this.updateHackathonTeamList(hackathonName, newTeamList);
    // Adds the team to the team database
    const newTeamRef = this.teamsRef.push();
    newTeamRef.set({
      name: newTeam.name,
      teamLeader: newTeam.teamLeader,
      capacity: newTeam.capacity,
      hackathonName: hackathonName,
      teamMembers: newTeam.teamMembers,
    });
  }

  removeTeam(hackathonName, teamName, newTeamList) {
    // Updates the list of team names under the according hackathon
    this.updateHackathonTeamList(hackathonName, newTeamList);
    // Removes the team to the team database
    this.teamsRef
      .orderByChild("hackathonName")
      .equalTo(hackathonName)
      .once("child_added", function (snapshot) {
        snapshot.ref.remove();
      });
  }

  updateHackathonTeamList(hackathonName, newTeamList) {
    this.hackathonsRef
      .orderByChild("name")
      .equalTo(hackathonName)
      .once("child_added", function (snapshot) {
        snapshot.ref.update({
          teams: newTeamList,
        });
      });
  }
}

module.exports = Database;
