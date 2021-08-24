import AppError from '@shared/errors/AppError';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRepostory from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('should be able to authenticate the user', async () => {
    const fakeUserRepository = new FakeUsersRepostory();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'Felipe',
      email: 'teste@teste',
      password: '123',
    });

    const userAuth = await authenticateUserService.execute({
      email: 'teste@teste',
      password: '123',
    });

    expect(userAuth).toHaveProperty('token');
    expect(userAuth.user).toEqual(user);
  });

  it('should not be able to authenticate with not existing user', async () => {
    const fakeUserRepository = new FakeUsersRepostory();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUserService.execute({
        email: 'testeee@teste',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUsersRepostory();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'Felipe',
      email: 'teste@teste',
      password: '123',
    });

    expect(
      authenticateUserService.execute({
        email: 'teste@teste',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
