require("dotenv-flow").config({ silent: true });
const admin = require("firebase-admin");
const { Collection } = require("discord.js");
const Hackathon = require("../model/Hackathon");
const Team = require("../model/Team");
const moment = require("moment");

class Database {
  constructor(client) {
    this._client = client;
    admin.initializeApp({
      credential: admin.credential.cert({
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
      }),
      databaseURL: process.env.DATABASEURL,
      databaseAuthVariableOverride: {
        uid: process.env.UID,
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

  get client() {
    return this._client;
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
    const teamHackathonRef = this.teamsRef.child(hackathonName);
    // Updates the list of team names under the according hackathon
    this.updateHackathonTeamList(hackathonName, newTeamList);
    // Adds the team to the team database
    const teamMembersJSONObj = Object.fromEntries(newTeam.teamMembers);
    const newTeamRef = teamHackathonRef.push();
    newTeamRef.set({
      name: newTeam.name,
      teamLeader: newTeam.teamLeader,
      capacity: newTeam.capacity,
      hackathonName: hackathonName,
      teamMembers: teamMembersJSONObj,
    });
  }

  removeTeam(hackathonName, teamName, newTeamList) {
    // Updates the list of team names under the according hackathon
    this.updateHackathonTeamList(hackathonName, newTeamList);
    // Removes the team to the team database
    const teamHackathonRef = this.teamsRef.child(hackathonName);
    teamHackathonRef
      .orderByChild("name")
      .equalTo(teamName)
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

  updateTeamMembers(hackathonName, teamName, teamMembers) {
    const teamMembersJSONObj = Object.fromEntries(teamMembers);
    const teamHackathonRef = this.teamsRef.child(hackathonName);
    teamHackathonRef
      .orderByChild("name")
      .equalTo(teamName)
      .once("child_added", function (snapshot) {
        snapshot.ref.update({
          teamMembers: teamMembersJSONObj,
        });
      });
  }

  updateTeamLeader(hackathonName, teamName, newTeamLeader) {
    const teamHackathonRef = this.teamsRef.child(hackathonName);
    teamHackathonRef
      .orderByChild("name")
      .equalTo(teamName)
      .once("child_added", function (snapshot) {
        snapshot.ref.update({
          teamLeader: newTeamLeader,
        });
      });
  }

  read() {
    const client = this.client;
    const teamsRef = this.teamsRef;
    this.hackathonsRef
      .orderByChild("name")
      .once("value", function (hackathonQuerySnapshot) {
        hackathonQuerySnapshot.forEach(function (hackathonSnapshot) {
          const dbHackathonObj = hackathonSnapshot.val();
          const newHackathon = new Hackathon(
            dbHackathonObj.name,
            moment(dbHackathonObj.startDate, "MM-DD-YYYY"),
            moment(dbHackathonObj.endDate, "MM-DD-YYYY")
          );
          client.hackathons.set(dbHackathonObj.name, newHackathon);
          //
          const teamHackathonRef = teamsRef.child(dbHackathonObj.name);
          teamHackathonRef
            .orderByChild("name")
            .once("value", function (teamQuerySnapshot) {
              teamQuerySnapshot.forEach(function (teamSnapshot) {
                const dbTeamObj = teamSnapshot.val();
                const newTeam = new Team(
                  dbTeamObj.name,
                  dbTeamObj.teamLeader,
                  dbTeamObj.capacity,
                  dbTeamObj.hackathonName
                );
                newTeam.teamMembers = new Collection(
                  Object.entries(dbTeamObj.teamMembers)
                );
                newHackathon.teams.set(dbTeamObj.name, newTeam);
              });
            });
          //
        });
      });
  }
}

module.exports = Database;
