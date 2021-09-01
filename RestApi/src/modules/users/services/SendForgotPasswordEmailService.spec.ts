import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepostory from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email.', async () => {
    const fakeUserRepository = new FakeUsersRepostory();

    const fakeMailProvider = new FakeMailProvider();

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
    );

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      email: 'teste@teste',
      name: 'Felipe',
      password: '1233456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'teste@teste',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password.', async () => {
    const fakeUserRepository = new FakeUsersRepostory();

    const fakeMailProvider = new FakeMailProvider();

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
    );

    await expect(
      sendForgotPasswordEmail.execute({
        email: 'asdfasdfasdfasd',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
