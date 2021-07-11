import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

interface ITagRequest {
  name: string;
}

class CreateTagService {
  async execute({ name }: ITagRequest) {
    if (!name) {
      throw new Error("Name is mandatory");
    }

    const tagsRepositories = getCustomRepository(TagsRepositories);
    const tagAlreadyExists = await tagsRepositories.findOne({ name });

    if (tagAlreadyExists) {
      throw new Error("Tag name already exists.");
    }

    const createdTag = tagsRepositories.create({ name });
    await tagsRepositories.save(createdTag);

    return createdTag;
  }
}

export { CreateTagService }
