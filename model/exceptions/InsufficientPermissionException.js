class InsufficientPermissionException extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = InsufficientPermissionException;
