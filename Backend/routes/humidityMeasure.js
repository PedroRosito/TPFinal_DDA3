var express = require('express');
var humMeasure_router = express.Router();
var postgreClient = require('../postgreSQL/postgreHandler');

humMeasure_router.get('/:id', function(req, res, next) {
  postgreClient.query("SELECT * FROM humiditymeasure WHERE id_sensor=?",[Number(id)]).then(
    (response)=>res.send(response)
  ).catch(
    (err)=>res.send(err)
  );
});

module.exports = humMeasure_router;