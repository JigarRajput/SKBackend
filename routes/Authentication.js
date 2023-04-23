const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const ServicePerson = require("../models/servicePerson");
const NormalPerson = require("../models/NormalUser");

// this function is used to enocode the password using bcrypt
const encodePass = async (pass) => {
  try {
    return bcrypt.hash(pass, 10);
  } catch (error) {
    console.log("error while encoding the password");
  }
};

route.post("/signup", async (req, res) => {
  console.log(req.body);

  // encode password before storing
  const hashedPassword = await encodePass(req.body.password);

  if (req.body.serviceCategory) {
    // if user provides service, move it to servicePeople collection

    // it will check whether the user is already registered or not
    const userMobile = await ServicePerson.findOne({
      mobileNumber: req.body.mobileNumber,
    });

    if (userMobile === null) {
      try {
        const serviceProviderUser = new ServicePerson({
          fullName: req.body.fullName,
          mobileNumber: req.body.mobileNumber,
          password: hashedPassword,
          serviceCategory: req.body.serviceCategory,
          country: req.body.country,
          state: req.body.state,
          city: req.body.city,
        });

        // save user to database
        await serviceProviderUser.save();
        // send response
        res.status(201).send({ message: "User created" });
      } catch (error) {
        res.status(400).send(error);
      }
    } else {
      // if user already exist with the same mobile
      res
        .status(401)
        .json({ message: "Mobile number already exists!", success: false });
    }
  } else {
    // check if this user already exists
    const userMobile = NormalPerson.findOne({
      mobileNumber: req.body.mobileNumber,
    });

    if (userMobile === null) {
      try {
        const normalUser = new NormalPerson({
          fullName: req.body.fullName,
          mobileNumber: req.body.mobileNumber,
          password: req.body.hashedPassword,
          country: req.body.country,
          state: req.body.state,
          city: req.body.city,
        });

        // save user to database
        await normalUser.save();
        // send response
        res.status(201).send({ message: "User created" });
      } catch (error) {
        res.status(400).send(error);
      }
    } else {
      // if user already exist with the same mobile
      res
        .status(401)
        .json({ message: "Mobile number already exists!", success: false });
    }
  }
});

route.post("/login", async (req, res) => {
  try {
    // if user is of service person
    let user = await ServicePerson.findOne({
      mobileNumber: req.body.mobileNumber,
    });
    if (user === null) {
      user = await NormalPerson.findOne({
        mobileNumber: req.body.mobileNumber,
      });
    }

    if (user) {
      // if user exists with that mobile
      // verify if password is same
      const isPassSame = await bcrypt.compare(req.body.password, user.password);

      if (isPassSame) {
        res.status(200).json({
          message: "Logged In Succesfully",
          success: true,
          user: user,
        });
      } else {
        // if incorrect password
        res.status(401).json({ message: "Incorrect Password", success: false });
      }
    }
  } catch (e) {
    // error in making any operation while login
    console.log("Error Generated while login");
    res.status(401).json({ message: "Error while login", success: false, e });
  }
});

module.exports = route;
