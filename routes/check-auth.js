require("dotenv").config();
const jwt = require("jsonwebtoken");


//------------verify token middleware----------------
module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      return authData;
    }
  });
  req.decoded = decoded;
  console.log("decoded:", decoded);
  next();
};
