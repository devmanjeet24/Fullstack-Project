import express from "express";
import { createUser, loginuser } from "./userController";

const router = express.Router();


router.post("/register", createUser);

router.post("/login", loginuser);



export default router;