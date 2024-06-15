// ---------------------------------------------------
// CONFIG SETUP - Authentication
// ---------------------------------------------------

// 1) Importing External Libraries
const jwt = require("jsonwebtoken");

// 2) Exporting a function for checking authentication
module.exports = {
  authenticate: (req, res, next) => {
    jwt.verify(
      req.cookies.usertoken,
      process.env.JWT_SECRET,
      (err, payload) => {
        if (err) {
          res.status(401).json({ verified: false });
        } else {
          console.log("You are authenticated!");
          next();
        }
      }
    );
  },
};
