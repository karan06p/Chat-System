require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET not defined in .env");
}

function authMiddleware(req, res, next) {

  // this middleware works on non-auth urls
  if (!req.originalUrl.startsWith("/auth")) {

    // fetch the JWT token from the cookies for auth
    const token = req.cookies.auth;
    if (!token) {
      return res.redirect(401, "/auth/sign-in"); // if no token received then redirect user to sign-in 
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
