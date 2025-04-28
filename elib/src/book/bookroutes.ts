import express from 'express';
import { createBook } from './bookController';

const bookrouter = express.Router();



bookrouter.post("/", createBook);



export default bookrouter;