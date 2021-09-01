import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserTOken';

class FakeUsersTokensRepository implements IUsersTokensRepository {
  userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    return this.userTokens[1];
  }
}

export default FakeUsersTokensRepository;
