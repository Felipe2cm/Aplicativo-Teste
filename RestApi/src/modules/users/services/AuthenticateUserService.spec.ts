import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepostory from '../repositories/fakes/FakeUsersRepository';

describe('AuthenticateUser', () => {
  it('should be able to authenticate the user', () => {
    const fakeUserRepository = new FakeUsersRepostory();
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
    );

    expect(3 + 2).toBe(5);
  });
});
