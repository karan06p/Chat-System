const express = require('express');

const authRoutes = express.Router();

const { signUp } = require('../controllers/auth/sign-up');
const { signIn } = require('../controllers/auth/sign-in');

authRoutes.post("/sign-up", signUp);

authRoutes.post("/sign-in", signIn);

// authRoutes.post("/delete-account", deleteAccount);

module.exports = authRoutes;