import { Router } from "express";

// Controllers
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListComplimentsReceivedByUserController } from "./controllers/ListComplimentsReceivedByUserController";
import { ListComplimentsSentByUserController } from "./controllers/ListComplimentsSentByUserController";

// Middlewares
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listComplimentsReceivedByUserController =
	new ListComplimentsReceivedByUserController();
const listComplimentsSentByUserController =
	new ListComplimentsSentByUserController();

router.post("/users", createUserController.handle);

router.post(
	"/tags",
	ensureAuthenticated,
	ensureAdmin,
	createTagController.handle
);

router.post("/login", authenticateUserController.handle);

router.post(
	"/compliments",
	ensureAuthenticated,
	ensureAdmin,
	createComplimentController.handle
);

router.get(
	"/compliments/received",
	ensureAuthenticated,
	listComplimentsReceivedByUserController.handle
);

router.get(
	"/compliments/sent",
	ensureAuthenticated,
	listComplimentsSentByUserController.handle
);

export { router };
