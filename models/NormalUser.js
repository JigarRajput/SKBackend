const mongoose = require("mongoose");
const normalPersonSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

// Normal person schema
const NormalPerson = mongoose.model("NormalPerson", normalPersonSchema);

module.exports = NormalPerson;
