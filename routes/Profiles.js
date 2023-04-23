const express = require("express");
const route = express.Router();
const ServicePerson = require("../models/servicePerson");

route.get("/all", async (req, res) => {
  try {
    const profiles = await ServicePerson.find({});
    res.status(200).send(profiles);
  } catch (e) {
    console.log(e);
  }
});

module.exports = route;
