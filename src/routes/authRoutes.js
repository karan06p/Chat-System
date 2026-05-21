const express = require('express');

const authRoutes = express.Router();

const { signUp } = require('../controllers/auth/sign-up');

authRoutes.post("/sign-up", signUp);

// authRouter.post("/sign-in", signIn);

// authRouter.post("/delete-account", deleteAccount);

module.exports = authRoutes;