const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/skdb", { useNewUrlParser: true });

try {
  //all the variables for mongodb connection
  const url = process.env.MONGODB_URL;
  const dbName = process.env.MONGODB_DATABASE;

  //making the connection
  mongoose.connect(url + dbName);
  const con = mongoose.connection;

  //checking the connection
  con.on("open", () => {
    console.log("Connection established with database");
  });
} catch {
  console.log("Error Generated while making connection to the database");
}
