import { config as conf} from "dotenv";
conf();

const _config = {
    port: process.env.PORT,
    database : process.env.MONGO_CONNECTION,
    env : process.env.NODE_ENV,
    jwtSecret : process.env.JWT_SECRET,
    CloudinaryCloud : process.env.cloudinary_Cloud,
    CloudinaryApiKey : process.env.Cloudinary_API_KEY,
    CloudinaryApiSecret : process.env.Cloudinary_SECRET,
    frontendDomain : process.env.FRONTEND_DOMAIN
}

export const config = Object.freeze(_config);