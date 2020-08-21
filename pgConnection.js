"use strict";
var Pool = require('pg').Pool;
require('dotenv').config();
var devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
};
var prodConfig = {
    connectionString: process.env.DATABASE_URL,
};
var pool = new Pool(process.env.NODE_ENV === 'production' ? prodConfig : devConfig);
module.exports = pool;
