"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercontrolller_1 = require("./usercontrolller");
const userRouter = express_1.default.Router();
// routes
userRouter.post("/register", usercontrolller_1.createUser);
userRouter.post("/login", usercontrolller_1.loginUser);
exports.default = userRouter;
