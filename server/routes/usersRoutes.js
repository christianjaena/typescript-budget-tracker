"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var usersControllers_js_1 = require("../controllers/usersControllers.js");
var route = express_1.default.Router();
route.post('/signin', usersControllers_js_1.userSignIn);
route.post('/signup', usersControllers_js_1.userSignUp);
exports.default = route;
