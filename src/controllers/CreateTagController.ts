import { Request, Response } from "express";
import { CreateTagService } from "../services/CreateTagService";

interface ITagRequest {
  name?: string;
}

class CreateTagController {
  async handle(req: Request, res: Response) {
    const { name }: ITagRequest = req.body;

    const createTagService = new CreateTagService();
    const createdTag = await createTagService.execute({ name });

    return res.json(createdTag);
  }
}

export { CreateTagController };
