"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var mongoDbURI;
if (process.env.NODE_ENV === 'production') {
    mongoDbURI = "" + process.env.MONGO_URI;
}
else {
    mongoDbURI = "" + process.env.MONGO_URI;
}
exports.default = mongoDbURI;
