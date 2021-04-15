var express = require('express');
var router = express.Router();
var postgreClient = require('../postgreSQL/postgreHandler');

router.get('/:id', function(req, res, next) {
  postgreClient.query("SELECT * FROM sensor WHERE id=?",[Number(id)]).then(
    (response)=>res.send(response)
  ).catch(
    (err)=>res.send(err)
  );
});

module.exports = router;
