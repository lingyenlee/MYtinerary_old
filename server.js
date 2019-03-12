//---------Use dotenv to read .env into node-----------------
require("dotenv").config();

//------------set up express app----------------
// var cors = require("cors");
const express = require("express");
const path = require("path");
const fs = require("fs");
const https = require("https");
const http = require("http");
//--------initialise app ------------
const app = express();
//-------------initialize express----------------
app.use(express.json());
// const cors = require("cors");

let server;
// if we are in production we are already running in https
if (process.env.NODE_ENV === "production") {
  server = http.createServer(app);
}

// we are not in production so load up our certifications to be able to
// run the server in https mode locally
else {
  const certOptions = {
    key: fs.readFileSync(path.resolve("./ssl/server.key")),
    cert: fs.readFileSync(path.resolve("./ssl/server.crt")),
  };
  server = https.createServer(certOptions, app);
}

// -------------express middleware that read form's input and stores in req.body
const bodyParser = require("body-parser");
//--------------initialize body parser-----------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//------------uploads for files---------------------
// app.use("itineraries/:city", express.static(process.cwd() + "/uploads"));
app.use("/itineraries/uploads", express.static("uploads"));
// app.use("/favourites/uploads", express.static("uploads"));
app.use("/profile/uploads", express.static("uploads"));
app.use("/register/uploads", express.static("uploads"));
app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));

//--------------import routes---------------------
const apiroutes = require("./routes/api-routes");
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");

//-------------set up mongoose connection to mlab---------------
const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URI || process.env.DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true });
// .then(() => console.log("MongoDB connected"))
// .catch(err => console.log(err));

mongoose.set("useCreateIndex", true);

// serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   // set static folder in the frontend
//   app.use(express.static(path.join(__dirname, "client/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build")); // serve the static react app
  app.get(/^\/(?!api).*/, (req, res) => {
    // don't serve api routes to react app
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
  console.log("Serving React App...");
}

//--------- set port --------------------
const port = process.env.PORT || 5000;

//--------connection config-----------------
const connection = mongoose.connection;

connection.on("connected", function() {
  server.listen(port, () => {
    console.log(`db connected..Listening on ${port} for request`);
  });
});

connection.on("disconnected", function() {
  console.log("db disconnected");
});

connection.on("error", function(error) {
  console.log("db connection error", error);
});

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
