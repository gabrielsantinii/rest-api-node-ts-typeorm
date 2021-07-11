import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";

interface IUserRequest {
  name: string;
  email: string;
  admin: boolean;
}

class CreateUserService {
  async execute({ name, email, admin }: IUserRequest) {
    if (!email) {
      throw new Error("E-mail is mandatory");
    }
    if (!name) {
      throw new Error("Name is mandatory");
    }

    const usersRepository = getCustomRepository(UsersRepositories);
    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error("E-mail already exists.");
    }

    const createdUser = usersRepository.create({ name, email, admin });
    await usersRepository.save(createdUser);

    return createdUser;
  }
}

export { CreateUserService };
