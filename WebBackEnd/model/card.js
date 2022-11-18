const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  name: {
    type: String,
  },
  imgURL: {
    type: String,
  },
});

module.exports = mongoose.model("card", cardSchema);
