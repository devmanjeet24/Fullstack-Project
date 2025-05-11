
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";


export interface AuthRequest extends Request {
    userId: string
}
const authenticate = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header("Authorization");

    if (!token) {
        return next(createHttpError(401, "Unauthorized token not found"));
    }


    


    try {
    const parsetoken = token.split(" ")[1];
    const decoded = verify(parsetoken, config.jwtSecret as string);

    console.log('decoded', decoded);

    const _req = req as AuthRequest;
    _req.userId = decoded.sub as string;

    next();
    } catch (error) {
        console.log(error);
        return next(createHttpError(401, "Unauthorized token not found"));
    }





};

export default authenticate;