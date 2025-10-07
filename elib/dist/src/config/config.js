"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const _config = {
    port: process.env.PORT,
    database: process.env.MONGO_CONNECTION,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    CloudinaryCloud: process.env.cloudinary_Cloud,
    CloudinaryApiKey: process.env.Cloudinary_API_KEY,
    CloudinaryApiSecret: process.env.Cloudinary_SECRET,
    frontendDomain: process.env.FRONTEND_DOMAIN
};
exports.config = Object.freeze(_config);
