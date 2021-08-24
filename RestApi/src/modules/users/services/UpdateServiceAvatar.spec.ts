import FakeDiskStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeDiskStorageProvider';
import UpadateUserAvatarService from './UpdateUserAvatarService';
import FakeUsersRepostory from '../repositories/fakes/FakeUsersRepository';

describe('UpdateServiceAvatar', () => {
  it('should be set a new avatar', () => {
    const fakeUsersRepository = new FakeUsersRepostory();
    const fakeDiskStorageRepository = new FakeDiskStorageProvider();
    const upadateUserAvatarService = new UpadateUserAvatarService(
      fakeUsersRepository,
      fakeDiskStorageRepository,
    );
  });
});
