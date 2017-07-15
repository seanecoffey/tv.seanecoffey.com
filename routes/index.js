const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next) {
  res.render("index.html");
});

router.get("*", function(req,res) {
  res.status(404).send("Hello friend I am sorry but I could not find the page you were looking for, would you care to try again?");
});

module.exports = router;
