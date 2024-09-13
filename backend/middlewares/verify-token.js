const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.get("x-token");

  try {
    jwt.verify(token, "secret");
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};
