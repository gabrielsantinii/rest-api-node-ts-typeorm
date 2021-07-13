import { Request, Response } from "express";
import { ListComplimentsSentByUserService } from "../services/ListComplimentsSentByUserService";

interface IUserRequest {
	user_id: string;
}

class ListComplimentsSentByUserController {
	async handle(req: Request, res: Response) {
		const { user_id }: IUserRequest = req.body;

		if (!user_id) {
			res.status(400).json({ message: "The User ID is required." });
		}

		const listComplimentsSentService =
			new ListComplimentsSentByUserService();

		const listCompliments = await listComplimentsSentService.execute(
			user_id
		);
		return res.json({ listSentCompliments: listCompliments });
	}
}

export { ListComplimentsSentByUserController }
