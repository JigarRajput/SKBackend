const mongoose = require("mongoose");
const servicePersonSchema = new mongoose.Schema({
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
  serviceCategory: {
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

// service person schema
const ServicePerson = mongoose.model("ServicePerson", servicePersonSchema);

module.exports = ServicePerson;
