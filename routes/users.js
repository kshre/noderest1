var express = require('express');
var router = express.Router();

router.get('/userlist', function(req, res, next) {
  var db = req.db;
  var collection = db.get('userlist');
  collection.find( {}, {}, function(err, docs) {
    res.json(docs);
  });
});

module.exports = router;
