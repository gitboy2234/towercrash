const { response } = require("express");
const express = require("express");
const modelTemplate = require("../models/models");
const router = express.Router();

router.post("/leaderboards", (req, res) => {
  const address = new modelTemplate({});
});

module.exports = router;
