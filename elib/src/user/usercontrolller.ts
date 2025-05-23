import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";
<<<<<<< HEAD
import { access } from "fs";
=======

>>>>>>> manjeet


const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }


    // Database call 

    try {
        const user = await userModel.findOne({ email });
        if (user) {
            const error = createHttpError(400, "user already exits");
            return next(error);
        }

    } catch (error) {
        console.log(error);
        return next(createHttpError(500, "Error while creating user"));
    }






    const hashedpassword = await bcrypt.hash(password, 10);

    let newUser: User;

    try {

        newUser = await userModel.create({
            name,
            email,
            password: hashedpassword,
        });

    } catch (error) {
        console.log(error);
        return next(createHttpError(500, "Error while signing the jwt token"));
    }



    // Token Generation JWT 

    try {

        const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
            expiresIn: "1d"
        });

        res.status(201).json({ accessToken: token });

    } catch (error) {
        console.log(error);
        return next(createHttpError(500, "Error while redirecting"));

    }


}


const loginUser = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return next(createHttpError(400, "All fields are required"));

    }

    const user = await userModel.findOne({ email });

    try {
        if (!user) {
            return next(createHttpError(404, "User not registred , Please sign up"));
        }
    } catch (error) {
        console.log(error);
        return next(createHttpError(500, "Error while logging in"));

    }

     const ismatcchpassword = await bcrypt.compare(password, user.password);

     if(!ismatcchpassword) {
        return next(createHttpError(401, "username or password is in correct"));
     }


    //  accesstoken 

    const token = sign({sub : user._id}, config.jwtSecret as string, {
        expiresIn : "1d"
    })


    res.json({ accessToken : token });
}

export { createUser, loginUser };