import { Request, Response } from "express";
import { container } from "tsyringe";
import UpadateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";

export default class UsersController {
  public async create(request: Request, response: Response) {
    const updateUserAvatar = container.resolve(UpadateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}
