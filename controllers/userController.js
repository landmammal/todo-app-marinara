
module.exports = function(app, passport) {
  // strategy

  // signing users
  app.get('/sign-in', (req, res) => {
    res.render('sign-in')
  });

  // sign-up users
  app.get('/sign-up', (req, res) => {
    res.render('sign-up')
  });

  // successful sign-in
  app.get('/success', (req, res) => {
    res.send("Welcome "+ req.query.username + "!!")
  });

  // error sign-in
  app.get('/error', (req, res) => {
    res.send("error logging in")
  });

  // authenticating user
  app.post('/sign-in', passport.authenticate('local-login', { failureRedirect: '/error'}),
    (req, res) => {
      res.redirect('/success?username='+req.user.username);
  });
  // sign up users
  app.post('/sign-up', passport.authenticate('local-signup', { failureRedirect: '/error'}),
    (req, res) => {
      res.redirect('/success?username='+req.user.username);
    }
  );
};
