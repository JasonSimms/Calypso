const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  project: {
    type: String,
    required: true
  },
  updated: { 
      type: Date, 
      default: Date.now 
    },
  timeConsumed: {
    type: Number
  },
  notes: {
    type: String
  }
});

module.exports = mongoose.model("Session", sessionSchema);
