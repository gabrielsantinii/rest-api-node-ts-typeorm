import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
	sub: string;
}

export function ensureAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const AuthToken = req.headers.authorization;
	if (!AuthToken) {
		return res.status(401).end();
	}

	const [, token] = AuthToken.split(" ");

	try {
		const { sub: userId } = verify(
			token,
			"8d217b47af294de7663d8353b653a501"
		) as IPayload;

		req.user_id = userId;
		next();
	} catch (err) {
		res.status(401).json({ error: err });
	}
}
