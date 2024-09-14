const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password") {
    res.json({ token: jwt.sign({ username }, "secret") });
  }
  res.status(401).json({ error: "Invalid username or password" });
});

module.exports = router;
// The users router has one route:
// A POST route that authenticates a user and returns a JWT token.
// The users router uses the jwt module to sign JWT tokens.
// The users router returns JSON responses for all routes.
// The users router uses the /login route to authenticate users.
