import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  admin: boolean;
  password: string;
}

class CreateUserService {
  async execute({ name, email, admin, password }: IUserRequest) {
    if (!email) {
      throw new Error("E-mail is mandatory");
    }
    if (!name) {
      throw new Error("Name is mandatory");
    }
    if (!password) {
      throw new Error("Password is mandatory");
    }

    const usersRepository = getCustomRepository(UsersRepositories);
    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error("E-mail already exists.");
    }

    const hashedPassword = await hash(password, 8);

    const createdUser = usersRepository.create({
      name,
      email,
      admin,
      password: hashedPassword,
    });
    await usersRepository.save(createdUser);

    return createdUser;
  }
}

export { CreateUserService };
