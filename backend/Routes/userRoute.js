const express = require('express');
const userRouter = express.Router();
const UserController = require('../Controllers/UserController');
userRouter.post('/Register', UserController.RegisterUser);
userRouter.post('/Login', UserController.CheckLogin);
module.exports = userRouter;