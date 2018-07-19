var data = [{id: 1, item: 'eat'}, {id: 2, item: 'sleep'}, {id: 3, item: 'code'}];

const bodyParser = require('body-parser');
const urlencodeParser = bodyParser.urlencoded({extended: false});


module.exports = function(app, db) {
  // reading data
  app.get('/todo', function(req, res) {
    console.log('we reading');
    let sql = 'SELECT * FROM todoItems;';
    db.query(sql, (err, results) => {
      if (err) throw err;
      // console.log(results);
      res.render('todo', {todos: results} );
    });
  });

  // posting data
  app.post('/todo', urlencodeParser, function(req, res){
    console.log('we posting');
    let item = req.body;
    console.log(item);
    let sql = 'INSERT INTO todoItems SET ?';
    let query = db.query(sql, item, (err, result) => {
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
      res.json(data);
    });    
  });
};
