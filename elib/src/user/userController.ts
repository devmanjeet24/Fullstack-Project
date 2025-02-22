
import { NextFunction, Request, Response } from "express";
// import errorHandler from "../middleware/globalerrorhandler";
import createHttpError from "http-errors";
import userModel from './userModel';
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from '../config/config';
import { User } from "./userTypes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    // validation 

    if (!name || !email || !password) {

        const error = createHttpError(400, "All fields are required");
        return next(error);

    }

    // database call 





    try {
        const User = await userModel.findOne({ email });
        if (User) {
            const error = createHttpError(400, "User already exists");
            return next(error);
        }
    } catch (err) {
        console.error(err);
        return next(createHttpError(500, "user not getting"));
    }




    // hash the passsword

    const hashpassword = await bcrypt.hash(password, 10);

    let newuser : User;

    try {
         newuser = await userModel.create({
            name,
            email,
            password: hashpassword
        })
        
    } catch (err) {
        console.error(err);
        return next(createHttpError(500, "error while creating user"));
        
    }



    try {

        const token = sign({ sub: newuser._id }, config.jwtsecret as string, { expiresIn: "7d" });

        res.status(201).json({ access_token: token });
        
    } catch (err) {
        console.error(err);
        return next(createHttpError(500, "error while signing the JWT"));
    }
    // Token generation

}



export {
    createUser
};