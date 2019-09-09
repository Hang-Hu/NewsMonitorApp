var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource in users");
});
// router.get("/user", function(req, res, next) {
//   res.send("User get");
// });

module.exports = router;
