import express from "express";
import router from "./router/router";

import "./app/database/index";

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));
        // this.server.use(authMiddleware);
    }

    routes() {
        this.server.use(router);
    }
}

export default new App().server;
