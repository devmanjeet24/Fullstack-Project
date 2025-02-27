
import express, { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
// import { config } from './config/config';
import errorHandler from './middleware/globalerrorhandler';
import router from './user/userRouter';
import bookrouter from './Book/bookrouter';
const app = express();
app.use(express.json());

app.get('/', (req : Request, res : Response, next : NextFunction) => {
    // throw new Error("something wents wrong");
    const error = createHttpError(400, "Somethng went wrong");
    throw error;
    res.json({message : 'welcome to elib api'})
})


app.use('/api/users', router);
app.use('/api/books', bookrouter);


// Global error handler 

app.use(errorHandler);

export default app; 