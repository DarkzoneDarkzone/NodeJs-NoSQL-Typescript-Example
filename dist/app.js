"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const Sockets_1 = require("./utils/Sockets");
const config_1 = require("./utils/config");
// import cors from "cors"
// import cookieParser from 'cookie-parser'
// import morgan from 'morgan'
const database_1 = require("./utils/database");
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, './../dist/public/')));
/*  -------- converting json -------- */
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
/* Middleware */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
//connect to db
(0, database_1.connectDB)();
/** router */
// app.use(todoRouter)
/* Socket Start */
const server = app.listen(config_1.socketPort);
const io = Sockets_1.SIO.init(server);
app.listen(config_1.serverPort);
