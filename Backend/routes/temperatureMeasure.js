var express = require('express');
var tempMeasure_router = express.Router();
var postgreClient = require('../postgreSQL/postgreHandler');

tempMeasure_router.get('/:id', function(req, res, next) {
  postgreClient.query("SELECT * FROM temperaturemeasure WHERE id_sensor=?",[Number(id)]).then(
    (response)=>res.send(response)
  ).catch(
    (err)=>res.send(err)
  );
});

module.exports = tempMeasure_router;