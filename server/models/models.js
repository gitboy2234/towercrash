const mongoose = require("mongoose");

const newData = new mongoose.Schema({
  address: {
    type: String,
  },
});

module.exports = mongoose.model("towercrash", newData);
