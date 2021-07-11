import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

interface IUserRequest {
  name: string;
  email: string;
  admin: boolean;
  password: string;
}
class CreateUserController {
  async handle(req: Request, res: Response) {
    const { admin, name, email, password }: IUserRequest = req.body;

    const createUserService = new CreateUserService();

    const result = await createUserService.execute({
      name,
      email,
      admin,
      password,
    });

    return res.json(result);
  }
}

export { CreateUserController };
