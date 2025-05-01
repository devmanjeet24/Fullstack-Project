import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import createHttpError from "http-errors";
import fs from 'node:fs';
import bookModel from "./bookModel";

const createBook = async (req: Request, res: Response, next: NextFunction) => {

    console.log("files", req.files);

    const { title, genre } = req.body;

    try {


        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
        const fileName = files.coverImage[0].filename;

        const filePath = path.resolve(__dirname, '../../public/uploads', fileName);


        const uploadReult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: "MyBookCover",
            format: coverImageMimeType,
        });



        const bookFileName = files.file[0].filename;
        const bookFilepath = path.resolve(__dirname, "../../public/uploads", bookFileName);



        const bookFileUploadResult = await cloudinary.uploader.upload(bookFilepath, {
            resource_type: "raw",
            filename_override: bookFileName,
            folder: "MyBookPDFs",
            format: 'pdf',
        });

        console.log("bookFileUploadResult", bookFileUploadResult);


        console.log("uploadReult", uploadReult);

        // @ts-ignore
        console.log('userId', req.userId);


        const newBook = await bookModel.create({
            title,
            genre,
            author : "680cb5c076bbd33da1cf6905",
            coverImage : uploadReult.secure_url,
            file : bookFileUploadResult.secure_url

        });


        // Delete Temp files 

        try {
            await fs.promises.unlink(filePath);
            await fs.promises.unlink(bookFilepath);
        } catch (error) {
            return next(createHttpError(500, "Error while deleting temp files"));
        }



        res.status(200).json({ id: newBook._id });


    } catch (error) {
        console.log("error", error);
        return next(createHttpError(500, "Error while uploading the files"));
    }






}

export {
    createBook,
}