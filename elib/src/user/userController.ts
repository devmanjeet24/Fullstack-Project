
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

    let newuser: User;

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


// login user 
const loginuser = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(createHttpError(400, "All fields are required"));
    }


    let user: User | null;
    try {

        user = await userModel.findOne({ email });

        if (!user) {
            return next(createHttpError(404, "user not found"));
        }


        // match username and password 

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return next(createHttpError(401, "Invalid credentials"));
        }

        // if credential match then giving a new token 

        const token = sign({ sub: user._id }, config.jwtsecret as string, { expiresIn: "7d" });

        res.status(200).json({ access_token: token });



    } catch (error) {
        console.error(error);
        return next(createHttpError(500, "error while finding user"));
    }
}


export {
    createUser,
    loginuser
};