// jai Ganesh
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/Authentication.js");
const profileRoute = require("./routes/Profiles.js");
require("./db.js");

// create express application
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/profiles", profileRoute);

// define port
const port = process.env.PORT || 3000;

// listen on port
app.listen(port, () => console.log(`App listening on port ${port}`));
