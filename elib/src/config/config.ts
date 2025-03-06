import {config as conf} from "dotenv";
conf();

const _config = {
    port : process.env.PORT,
    databaseURL : process.env.Mongo_Connection_String,
    env : process.env.NODE_ENV,
    jwtsecret : process.env.JWT_SECRET,
    cloudinarycloud : process.env.CLOUDINARY_CLOUD,
    CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET,
}

export const config = Object.freeze(_config);