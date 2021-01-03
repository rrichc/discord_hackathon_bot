class TeamFullException extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = TeamFullException;
