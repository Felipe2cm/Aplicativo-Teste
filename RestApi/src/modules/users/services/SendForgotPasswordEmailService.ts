import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { inject, injectable } from 'tsyringe';

interface Request {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: Request): Promise<void> {
    this.mailProvider.sendMail(email, 'Clique aqui para recuperar sua senha.');
  }
}
