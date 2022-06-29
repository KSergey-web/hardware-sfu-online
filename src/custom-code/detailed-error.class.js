class DetailedError extends Error {
  constructor(message, details, status) {
    super(message);
    this.name = this.constructor.name;
    if (details) this.details = details;
    if (status) this.status = status;
  }
}

module.exports = DetailedError;
