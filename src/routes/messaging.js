var express = require('express');
var router = express.Router();

var assistant = require('../watson/assistant');


// Endpoint to be call from the client side
router.post('/api/message', function (req, res) {

   assistant.processMessage(req)
   .then( (data) => {
     res.json(data);
   })
   .catch( (err) => {
      res.status(err.code || 500).json(err);
   });

});

router.get('/api/session', function (req, res) {

  assistant.getSession(req)
  .then( (data) => {
    res.send(data);
  })
  .catch( (err) => {
      res.status(err.code || 500).send(err);
  });

});

module.exports = router;
