"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message,
        errorStack: config_1.config.env === "development" ? err.stack : "",
    });
};
exports.default = errorHandler;
