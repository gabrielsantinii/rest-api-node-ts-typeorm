import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

interface IAuthRequest {
  email: string;
  password: string;
}

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password }: IAuthRequest = req.body;

    const authenticateUserService = new AuthenticateUserService();

    const token = await authenticateUserService.execute({
      email,
      password,
    });

    return res.json({ token });
  }
}

export { AuthenticateUserController };
