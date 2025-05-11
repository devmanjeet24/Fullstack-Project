<<<<<<< HEAD
import express from "express";
import createHttpError from "http-errors";
import errorHandler from "./middleware/globalErrorHandler";
import userRouter from "./user/userRouter";
// import { connectDB } from "./config/db";

=======
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookroutes";
import { config } from "./config/config";
>>>>>>> manjeet

const app = express();

app.use(
    cors({
        origin: config.frontendDomain,
    })
);

app.use(express.json());

<<<<<<< HEAD
//Routes

// HTTP methods

app.get("/", (req, res, next) => {

    const error = createHttpError(400, "something went wrong");
    throw error;

    res.json({message : "hello world"});
=======
// Routes
// Http methods: GET, POST, PUT, PATCH, DELETE
app.get("/", (req : Request, res : Response, next : NextFunction) => {
    res.json({ message: "Welcome to elib apis" });
>>>>>>> manjeet
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

<<<<<<< HEAD


// Global error handler middleware

app.use(errorHandler);


app.use("/api/users", userRouter);



export default app; 
=======
// Global error handler
app.use(globalErrorHandler);

export default app;
>>>>>>> manjeet
