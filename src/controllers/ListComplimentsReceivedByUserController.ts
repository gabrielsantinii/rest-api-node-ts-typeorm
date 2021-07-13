import { Request, Response } from "express";
import { ListComplimentsReceivedByUserService } from "../services/ListComplimentsReceivedByUserService";

interface IUserRequest {
	user_id: string;
}

class ListComplimentsReceivedByUserController {
	async handle(req: Request, res: Response) {
		const { user_id }: IUserRequest = req.body;

		if (!user_id) {
			res.status(400).json({ message: "The User ID is required." });
		}

		const listComplimentsReceivedService =
			new ListComplimentsReceivedByUserService();

		const listCompliments = await listComplimentsReceivedService.execute(
			user_id
		);
		return res.json({ listReceivedCompliments: listCompliments });
	}
}

export { ListComplimentsReceivedByUserController }
