import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListComplimentsReceivedByUserService {
	async execute(user_id: string) {

		const complimentsRepositores = getCustomRepository(
			ComplimentsRepositories
		);
    
		const foundCompliments = await complimentsRepositores.find({
			where: {
				user_receiver: user_id,
			},
		});

		if (!foundCompliments) {
			throw new Error("Incorrect user ID.");
		}

		return foundCompliments;
	}
}

export { ListComplimentsReceivedByUserService };
