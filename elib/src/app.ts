import express from "express";
import createHttpError from "http-errors";
import errorHandler from "./middleware/globalErrorHandler";
import userRouter from "./user/userRouter";
// import { connectDB } from "./config/db";


const app = express();
app.use(express.json());

//Routes

// HTTP methods

app.get("/", (req, res, next) => {

    const error = createHttpError(400, "something went wrong");
    throw error;

    res.json({message : "hello world"});
});




// Global error handler middleware

app.use(errorHandler);


app.use("/api/users", userRouter);



export default app; 