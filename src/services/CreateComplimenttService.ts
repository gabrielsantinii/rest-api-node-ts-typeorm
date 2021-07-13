import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { UsersRepositories } from "../repositories/UserRepositories";

interface IComplimentRequest {
	tag_id: string;
	user_sender_id: string;
	user_receiver_id: string;
	message: string;
}

class CreateComplimentService {
	async execute({
		user_sender_id,
		user_receiver_id,
		tag_id,
		message,
	}: IComplimentRequest) {
		if (!user_sender_id) {
			throw new Error("User Sender ID is mandatory");
		}
		if (!user_receiver_id) {
			throw new Error("User Receiver ID is mandatory");
		}
		if (!tag_id) {
			throw new Error("Tag ID is mandatory");
		}
		if (!message) {
			throw new Error("Message is mandatory");
		}
		if (user_sender_id === user_receiver_id) {
			throw new Error("An user cannot send a compliment to yourself.");
		}

		const complimentsRepositories = getCustomRepository(
			ComplimentsRepositories
		);
		const usersRepositories = getCustomRepository(UsersRepositories);
		const tagsRepositories = getCustomRepository(TagsRepositories);

		const isValidReceiver = await usersRepositories.findOne(
			user_receiver_id
		);

		const isValidTag = await tagsRepositories.findOne(tag_id);

		if (!isValidReceiver) {
			throw new Error("The receiver user ID given is not valid.");
		}

		if (!isValidTag) {
			throw new Error("The Tag ID given is not valid.");
		}
		const createdCompliment = complimentsRepositories.create({
			user_sender: user_sender_id,
			user_receiver: user_receiver_id,
			message,
			tag_id: tag_id,
		});

			await complimentsRepositories.save(createdCompliment);
			return createdCompliment;
	}
}

export { CreateComplimentService };
