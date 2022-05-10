module.exports = {
  sanitizeUser(user) {
    const {
      blocked,
      confirmed,
      provider,
      password,
      resetPasswordToken,
      confirmationToken,
      ...sanitizedUser
    } = user;
    return sanitizedUser;
  },
};
