require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET not defined in .env");
}

function authMiddleware(req, res, next) {
  if (!req.originalUrl.startsWith("/auth")) {
    const token = req.cookies.auth;
    if (!token) {
      return res.redirect(401, "/auth/sign-in");
    }

    try {
      jwt.verify(token, jwtSecret);
      // here if the token is valid we continue
    } catch (error) {
      console.error(error);
      return res.redirect(401, "/auth/sign-in");
    }
  }

  next();
}

module.exports = authMiddleware;
