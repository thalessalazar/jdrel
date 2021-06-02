import { Router } from "express";

import authMiddleware from "../app/middlewares/auth";
import sessions from "../app/controller/Sessions";
import customers from "../app/controller/Customers";
import contacts from "../app/controller/Contacts";
import users from "../app/controller/Users";

const routes = new Router();
// sessions
routes.post("/sessions", sessions.create);

routes.use(authMiddleware);
// customers
routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.destroy);

// contacts
routes.get("/customers/:customerId/contacts", contacts.index);
routes.get("/customers/:customerId/contacts/:id", contacts.show);
routes.post("/customers/:customerId/contacts", contacts.create);
routes.put("/customers/:customerId/contacts/:id", contacts.update);
routes.delete("/customers/:customerId/contacts/:id", contacts.destroy);

// users
routes.get("/users", users.index);
routes.get("/users/:id", users.show);
routes.post("/users", users.create);
routes.put("/users/:id", users.update);
routes.delete("/users/:id", users.destroy);

export default routes;
