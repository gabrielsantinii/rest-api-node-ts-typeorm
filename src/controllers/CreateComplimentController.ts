import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimenttService";

interface IComplimentRequest {
	tag_id: string;
	user_receiver_id: string;
	created_at: Date;
	message: string;
}

class CreateComplimentController {
	async handle(req: Request, res: Response) {
		const { message, tag_id, user_receiver_id }: IComplimentRequest =
			req.body;
			
		const user_sender_id = req.user_id;

		const createComplimentService = new CreateComplimentService();

		const createdCompliment = await createComplimentService.execute({
			tag_id,
			user_receiver_id,
			message,
			user_sender_id,
		});

		res.json(createdCompliment);
	}
}

export { CreateComplimentController };
