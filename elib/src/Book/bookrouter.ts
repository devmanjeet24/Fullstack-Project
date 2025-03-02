
import express from 'express';

const bookrouter = express.Router();
import {Createbook} from './bookcontroller';
import multer from 'multer';
import path from 'path';


const upload = multer({
    dest : path.resolve(__dirname, '../../public/data/uploads'),
    limits : {fileSize : 3e7} // 30mb - 30*1024*1024
})


bookrouter.post('/', upload.fields([
    {
        name : 'coverImage', maxCount : 1
    },

    {
        name : 'file', maxCount : 1
    }
]) , Createbook);


export default bookrouter;