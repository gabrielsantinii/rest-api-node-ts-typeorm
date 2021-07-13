import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import "reflect-metadata";
import { router } from "./routes";

import "./database";

const app = express();
app.use(express.json());

app.use(router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	// Se for um erro tratado
	console.log("has error aqui hein");
	if (err instanceof Error) {
		return res.status(400).json({
			error: err.message,
		});
	} else if (err && !(err instanceof Error)) {
		return res.status(500).json({
			error: "Internal Server Error...",
		});
	}

	next();
});

app.listen(3005, () => {
	console.log(`Server running on port ${3005}`);
});
