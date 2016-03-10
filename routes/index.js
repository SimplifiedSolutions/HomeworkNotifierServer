var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('basic.html', { root:  'public' });
});
router.post('/AddUser', function(req, res, next) {
  //var jsonObject = req.body; //json object
  //var jsonObject = JSON.parse(req.body); //string
  console.log(req.body);
  var name = req.body.name;
  var netId = req.body.netId;
  var password = req.body.password;

  // Mongodb calls

  var jsonresult = { success: true, message: "Your awesome beans.", data: { key: "a1key" } };
  console.log(jsonresult);
  res.status(200).json(jsonresult);
});

module.exports = router;
