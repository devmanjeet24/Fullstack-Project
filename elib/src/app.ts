import express from "express";
import createHttpError from "http-errors";
// import { config } from "./config/config";
import errorHandler from "./middleware/globalErrorHandler";
// import { connectDB } from "./config/db";


const app = express();

//Routes

// HTTP methods

app.get("/", (req, res, next) => {

    const error = createHttpError(400, "something went wrong");
    throw error;

    res.json({message : "hello world"});
});



// Global error handler middleware

app.use(errorHandler);



export default app; 