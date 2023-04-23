const express = require("express");
const route = express.Router();
const ServicePerson = require("../models/servicePerson");

route.get("/all", async (req, res) => {
  const profiles = await ServicePerson.find({});
  res.status(200).send(profiles);
});

module.exports = route;
