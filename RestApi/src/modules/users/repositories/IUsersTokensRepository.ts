import UserToken from '../infra/typeorm/entities/UserTOken';

export default interface IUsersTokensRepository {
  generate(user_id: string): Promise<UserToken>;
}
