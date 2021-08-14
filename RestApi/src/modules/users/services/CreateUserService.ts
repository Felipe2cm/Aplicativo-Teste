import { hash } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
     private usersRepository: IUsersRepository
     ) {}

  public async execute({ name, email, password }: Request): Promise<User> {

    const checksUserExists = await this.usersRepository.findByEmail(email);

    if (checksUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
