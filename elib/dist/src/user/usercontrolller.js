"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const userModel_1 = __importDefault(require("./userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config/config");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        const error = (0, http_errors_1.default)(400, "All fields are required");
        return next(error);
    }
    // Database call 
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            const error = (0, http_errors_1.default)(400, "user already exits");
            return next(error);
        }
    }
    catch (error) {
        console.log(error);
        return next((0, http_errors_1.default)(500, "Error while creating user"));
    }
    const hashedpassword = yield bcrypt_1.default.hash(password, 10);
    let newUser;
    try {
        newUser = yield userModel_1.default.create({
            name,
            email,
            password: hashedpassword,
        });
    }
    catch (error) {
        console.log(error);
        return next((0, http_errors_1.default)(500, "Error while signing the jwt token"));
    }
    // Token Generation JWT 
    try {
        const token = (0, jsonwebtoken_1.sign)({ sub: newUser._id }, config_1.config.jwtSecret, {
            expiresIn: 24 * 60 * 60,
        });
        res.status(201).json({ accessToken: token });
    }
    catch (error) {
        console.log(error);
        return next((0, http_errors_1.default)(500, "Error while redirecting"));
    }
});
exports.createUser = createUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return next((0, http_errors_1.default)(400, "All fields are required"));
    }
    const user = yield userModel_1.default.findOne({ email });
    try {
        if (!user) {
            return next((0, http_errors_1.default)(404, "User not registred , Please sign up"));
        }
    }
    catch (error) {
        console.log(error);
        return next((0, http_errors_1.default)(500, "Error while logging in"));
    }
    const ismatcchpassword = yield bcrypt_1.default.compare(password, user.password);
    if (!ismatcchpassword) {
        return next((0, http_errors_1.default)(401, "username or password is in correct"));
    }
    //  accesstoken 
    const token = (0, jsonwebtoken_1.sign)({ sub: user._id }, config_1.config.jwtSecret, {
        expiresIn: 24 * 60 * 60
    });
    res.json({ accessToken: token });
});
exports.loginUser = loginUser;
