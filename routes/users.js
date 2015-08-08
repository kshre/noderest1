var express = require('express');
var router = express.Router();

/*
 * GET /users/userlist
 */
router.get('/userlist', function(req, res, next) {
  var db = req.db;
  var collection = db.get('userlist');
  collection.find( {}, {}, function(err, docs) {
    res.json(docs);
  });
});

/*
 * POST to adduser
 */
router.post('/adduser', function(req, res, next) {
  var db = req.db;
  var collection = db.get('userlist');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? {msg: ''} : {msg:err}	    
    );
  });
});

module.exports = router;
