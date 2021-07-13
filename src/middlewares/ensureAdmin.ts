import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";

export async function ensureAdmin(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { user_id } = req;

	const usersRepositories = getCustomRepository(UsersRepositories);
	const user = await usersRepositories.findOne(user_id);
	if (!user)
		return res.status(400).json({ error: "The user cannot be found" });

	if (user.admin) {
		return next();
	}

	res.status(401).json({ error: "Unauthorized action." });
}
