const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shortVideoSchema = new Schema({
  url: {
    type: String,
  },
  channel: {
    type: String,
  },
  description: {
    type: String,
  },
  song: {
    type: String,
  },
  likes: {
    type: String,
  },
  shares: {
    type: String,
  },
  messages: String,
});

module.exports = mongoose.model("video", shortVideoSchema);
