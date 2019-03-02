//---------Use dotenv to read .env into node-----------------
require("dotenv").config();

//------------set up express app----------------
// var cors = require("cors");
const express = require("express");
const path = require("path");
const fs = require("fs");
const https = require("https");
const app = express();
// const cors = require("cors");

const certOptions = {
  key: fs.readFileSync(path.resolve("./ssl/server.key")),
  cert: fs.readFileSync(path.resolve("./ssl/server.crt")),
};

const server = https.createServer(certOptions, app);

// -------------express middleware that read form's input and stores in req.body
const bodyParser = require("body-parser");

//------------uploads for files---------------------
// app.use("itineraries/:city", express.static(process.cwd() + "/uploads"));
app.use("/addItinerary", express.static("uploads"));
app.use("/itineraries/:city", express.static("uploads"));
app.use("/activities/:id", express.static("uploads"));
app.use("/createAccount", express.static("uploads"));
app.use("/favourites", express.static("uploads"));

//--------------import routes---------------------
const apiroutes = require("./routes/api-routes");
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");

//----------import passport, passportSetUp-----------------

const cookieSession = require("cookie-session");

//-------------set up mongoose connection to mlab---------------
const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URI || process.env.DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);

mongoose.Promise = global.Promise; //WHAT IS THIS????

//--------connection config-----------------
const connection = mongoose.connection;

connection.on("connected", function() {
  server.listen(process.env.PORT, () => {
    console.log(`db connected..Listening on ${process.env.PORT} for request`);
  });
});

connection.on("disconnected", function() {
  console.log("db disconnected");
});

connection.on("error", function(error) {
  console.log("db connection error", error);
});

//-------------initialize express----------------
app.use(express.json());

//--------------initialize body parser-----------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//------------passport setup and initialize----------------
const passportSetUp = require("./config/passport-setup");
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
// app.use(
//   cors({
//     origin: "https://localhost:3000",
//     credentials: true
//   })
// );

//------------set up routes------------------
app.use("/api", apiroutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
