const express = require('express');
const userRouter = express.Router();
const UserController = require('../Controllers/UserController');
userRouter.post('/Register', UserController.RegisterUser);
userRouter.post('/Login', UserController.CheckLogin);
userRouter.post('/resetPasswordAuth', UserController.ResetPasswordAuth);
userRouter.put('/resetPassword', UserController.ResetPassword)
module.exports = userRouter;