var express = require('express');
var humMeasure_router = express.Router();
var postgreClient = require('../postgreSQL/postgreHandler');

router.get('/:id', function(req, res, next) {
  postgreClient.query("SELECT * FROM humidityMeasure WHERE id=?",[Number(id)]).then(
    (response)=>res.send(response)
  ).catch(
    (err)=>res.send(err)
  );
});

module.exports = humMeasure_router;