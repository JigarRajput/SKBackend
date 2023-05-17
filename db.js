const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/skdb", { useNewUrlParser: true });

try {
  //all the variables for mongodb connection
  const url = process.env.MONGODB_URL;
  const dbName = process.env.MONGODB_DATABASE;

  //making the connection
  mongoose.connect(
    "mongodb+srv://rajputjigar455:jigar@cluster0.8zvegwv.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
  const con = mongoose.connection;
  //checking the connection
  con.on("open", () => {
    console.log("Connection established with database");
  });
} catch (e) {}
