import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepostory from '../repositories/fakes/FakeUsersRepository';

describe('CreateUser', () => {
  it('should be able to create a new user.', async () => {
    const fakeUserRepository = new FakeUsersRepostory();
    const createUserService = new CreateUserService(fakeUserRepository);

    const user = await createUserService.execute({
      name: 'Felipe',
      email: 'teste@teste',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two user with same email.', async () => {
    const fakeUserRepository = new FakeUsersRepostory();
    const createUserService = new CreateUserService(fakeUserRepository);

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
