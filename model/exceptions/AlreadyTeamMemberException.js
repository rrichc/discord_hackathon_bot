class AlreadyTeamMemberException extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = AlreadyTeamMemberException;
