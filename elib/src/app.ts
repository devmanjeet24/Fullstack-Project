import express, { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
// import { connectDB } from "./config/db";


const app = express();

//Routes

// HTTP methods

app.get("/", (req, res) => {
    res.send("hello");
});



// Global error handler middleware

app.use((err : HttpError, req : Request, res : Response, next : NextFunction) => {
    const statsusCode = err.statusCode || 500;


    return res.status(statsusCode).json({

})



export default app; 