import express from 'express';
import {createUser, loginUser}  from './usercontrolller';

const userRouter = express.Router();

// routes

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);  


export default userRouter;