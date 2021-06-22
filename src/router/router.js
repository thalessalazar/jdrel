import { Router } from "express";

import authMiddleware from "../app/middlewares/auth";
import sessions from "../app/controller/Sessions";
import User from "../app/controller/Users";
import Cep from "../app/controller/Cep";

const routes = new Router();

// sessions
routes.post("/api/users", User.create);
routes.post("/sessions", sessions.create);

routes.use(authMiddleware);

// users
routes.get("/api/users", User.index);
routes.get("/api/users/:id", User.show);
routes.put("/api/users/:id", User.update);
routes.delete("/api/users/:id", User.destroy);

// ceps
routes.get("/api/cep/", Cep.index);
routes.get("/api/cep/:cep", Cep.show);
routes.post("/api/cep/", Cep.create);
routes.put("/api/cep/:cep", Cep.update);
routes.delete("/api/cep/:cep", Cep.destroy);

// counts
routes.get("/api/count/cep", Cep.count);
routes.get("/api/count/users", User.count);

export default routes;
