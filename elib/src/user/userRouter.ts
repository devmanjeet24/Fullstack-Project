import express from 'express';
import { createUser } from './usercontrolller';

const userRouter = express.Router();

// routes

userRouter.post("/register", createUser);


export default userRouter;