module.exports = function(app, db, passport) {
  // reading data
  app.get('/todo', isLoggedIn, function(req, res) {
    console.log('we reading');
    // console.log(req.user)
    let sql = 'SELECT * FROM todoItems WHERE userID=' + req.user.id + ';';
    db.query(sql, (err, results) => {
      if (err) throw err;
      // console.log(results);
      res.render('todo', {todos: results, user: req.user} );
    });
  });

  // posting data
  app.post('/todo', function(req, res){
    console.log('we posting');
    let item = req.body;
    item['userID'] = req.user.id ;
    console.log(item);
    let sql = 'INSERT INTO todoItems SET ?';
    db.query(sql, item, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
  });

  // destroying data
  app.delete('/todo/:id', function(req, res) {
    console.log('we deleting');
    let sql =`DELETE FROM todoItems WHERE id = ${req.params.id};`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
  });

  // display sign up
  app.get('/signup', function(req, res) {
    res.render('signup');
  });

  // handling sign up form
  app.post('/signup', passport.authenticate('local-signup',  {
     successRedirect: '/todo',
     failureRedirect: '/signup'}
    )
  );

  // displaying sign in
  app.get('/signin', function(req,res){
  	res.render('signin',  { message: req.flash('loginMessage') } );
  });

  // handling sign in form
  app.post('/signin', passport.authenticate('local-signin',  {
     successRedirect: '/todo',
     failureRedirect: '/signin'}
    )
  );

  // destorying sessions
  app.get('/logout', function(req,res) {
    req.session.destroy(function(err) {
    res.redirect('/signin');
    })
  });
};
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/signin');
}

























//
