const { firebaseConfig, databaseURL } = require("../config.json");
const admin = require("firebase-admin");
// const moment = require("moment");
// const DuplicateValueException = require("./exceptions/DuplicateValueException");
// const ValueNotFoundException = require("./exceptions/ValueNotFoundException");
// const Hackathon = require("./hackathon");

class Database {
  constructor() {
    console.log(firebaseConfig);
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: databaseURL,
    });
    this._database = admin.database();
  }

  get database() {
    return this._database;
  }
}

module.exports = Database;
