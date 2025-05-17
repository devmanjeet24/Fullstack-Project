import express from 'express';
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookroutes";
import { config } from "./config/config";

const app = express();

app.use(
    cors({
        origin: config.frontendDomain,
    })
);

app.use(express.json());

// Routes
// Http methods: GET, POST, PUT, PATCH, DELETE
// app.get("/", (req : Request, res : Response, next : NextFunction) => {
//     res.json({ message: "Welcome to elib apis" });
// });

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// Global error handler
app.use(globalErrorHandler);

export default app;