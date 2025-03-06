import { NextFunction, Request, Response } from "express"
import cloudinary from "../config/cloudinary";
import path from "node:path";
import createHttpError from "http-errors";

const Createbook = async (req: Request, res: Response, next: NextFunction) => {
    console.log("files", req.files);




    try {

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);

        const fileName = files.coverImage[0].filename;

        const filepath = path.resolve(__dirname, '../../public/data/uploads', fileName);

        const uploadResult = await cloudinary.uploader.upload(filepath, {
            filename_override: fileName,
            folder: "book-covers",
            format: coverImageMimeType
        });

        console.log('upload result', uploadResult);




        const Bookfilename = files.file[0].filename;
        const BookFilePath = path.resolve(__dirname, '../../public/data/uploads', Bookfilename);



        const BookFileuploadresult = await cloudinary.uploader.upload(BookFilePath, {
            filename_override: Bookfilename,
            folder: "bookPDFs",
            resource_type: "raw",
            format: "pdf"
        });

        console.log('BookFileuploadresult', BookFileuploadresult);

        res.json({ message: 'welcome to elib api' });


    } catch (err) {

        console.log(err)

        return next( createHttpError(500, "something went wrong while uploading the file") )

    }













}

export { Createbook };