import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";


 const createUser = async (req: Request, res: Response, next: NextFunction) => {
 
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }


    // Database call 

    const user = await userModel.findOne({email});

    if(user){
        const error = createHttpError(400, "user already exits");
        return next(error);
    }


    const hashedpassword = await bcrypt.hash(password, 10); 

    const newUser = await userModel.create({
        name,
        email,
        password: hashedpassword,
    })


    res.json(
        { message: "This is register route" }
    );

}

export {createUser};