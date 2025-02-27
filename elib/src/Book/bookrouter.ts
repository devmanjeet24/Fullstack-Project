
import express from 'express';

const bookrouter = express.Router();
import Createbook from './bookcontroller';
import multer from 'multer';


const upload = multer({
    
})

bookrouter.post('/', Createbook);


export default bookrouter;