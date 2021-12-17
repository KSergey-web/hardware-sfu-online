module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '3e0694df930480ab7fdb2b7a3c12388b'),
  },
});
