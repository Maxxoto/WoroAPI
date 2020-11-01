const passport = require('passport');
const keys = require('../config/keys');
module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect(keys.redirectDomain);
    },
  );

  // Get my profile
  app.get('/api/users/me', (req, res) => {
    res.send(req.user);
  });

  // Logout
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('https://woroapps.vercel.app/');
  });
};
