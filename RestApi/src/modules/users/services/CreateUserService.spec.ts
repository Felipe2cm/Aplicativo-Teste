import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepostory from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user.', async () => {
    const fakeUserRepository = new FakeUsersRepostory();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'Felipe',
      email: 'teste@teste',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email.', async () => {
    const fakeUserRepository = new FakeUsersRepostory();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'Felipe',
      email: 'teste@teste',
      password: '123',
    });

    expect(
      createUserService.execute({
        name: 'Felipe',
        email: 'teste@teste',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
