import express from 'express';
import { createBook, ListBooks, updateBook } from './bookController';
import path from 'node:path';
import multer from 'multer';
import authenticate from '../middleware/authenticate';

const bookrouter = express.Router();


const upload = multer({
  dest: path.resolve(__dirname, '../../public/uploads'),
  limits: { fileSize: 3e7 }
})


bookrouter.post(
  "/",
  authenticate,

  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ]),

  createBook);


  bookrouter.patch(
    "/:bookID",
    authenticate,
  
    upload.fields([
      { name: 'coverImage', maxCount: 1 },
      { name: 'file', maxCount: 1 },
    ]),
  
    updateBook);


    bookrouter.get('/', ListBooks);

    // bookrouter.get('/:bookID', getsinglebook);



export default bookrouter;