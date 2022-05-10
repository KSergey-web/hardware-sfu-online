class DetailedError extends Error {
  constructor(message, details) {
    super(message);
    this.name = this.constructor.name;
    if (details) this.details = details;
  }
}

module.exports = DetailedError;
