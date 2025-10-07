"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const config_1 = require("./config");
// Configuration
cloudinary_1.v2.config({
    cloud_name: config_1.config.CloudinaryCloud,
    api_key: config_1.config.CloudinaryApiKey,
    api_secret: config_1.config.CloudinaryApiSecret
});
exports.default = cloudinary_1.v2;
