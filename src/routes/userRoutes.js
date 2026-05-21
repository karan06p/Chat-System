const express = require('express');

const userRouter = express.Router();

const { fetchUsers } = require('../controllers/userController');

userRouter.get("/", fetchUsers);

module.exports = userRouter;