var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("API is working properly");
});

router.post("/save", null, (req, res, next) => {
  req.data.forEach((users) => {
    if (users.name != null) {
      mongo.save(user);
    }
  });
});

module.exports = router;
