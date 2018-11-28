const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project"
  },
  user: {
    type: Schema.Types.ObjectId, 
         ref: 'User'
  },
  updated: {
    type: Date,
    default: Date.now
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  active:{
    type: Boolean,
    default: true
  },
  endTime: {
    type: Date
  },
  timeConsumed: {
    type: Number
  },
  notes: {
    type: String
  }
});

module.exports = mongoose.model("Session", sessionSchema);
