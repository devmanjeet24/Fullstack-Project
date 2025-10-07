"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config/config");
const authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    // const token = req.headers["authorization"];
    // const token = req.get("authorization");
    if (!token) {
        return next((0, http_errors_1.default)(401, "Unauthorized token not found"));
    }
    try {
        const parsetoken = token.split(" ")[1];
        const decoded = (0, jsonwebtoken_1.verify)(parsetoken, config_1.config.jwtSecret);
        console.log('decoded', decoded);
        const _req = req;
        _req.userId = decoded.sub;
        next();
    }
    catch (error) {
        console.log(error);
        return next((0, http_errors_1.default)(401, "Unauthorized token not found"));
    }
};
exports.default = authenticate;
