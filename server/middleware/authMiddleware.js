const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "vacebook");

      req.user = await User.findById(decoded).select("-password");
      next();
    } catch (err) {
      res
        .status(401)
        .send({ error: err.message, message: "Not authorzied , token failed" });
    }
  }
  if (!token) {
    res.status(401).send("Not authorzied , no token");
  }
};

module.exports = protect;
