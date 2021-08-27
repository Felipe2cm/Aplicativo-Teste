import AppError from '@shared/errors/AppError';

import FakeDiskStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeDiskStorageProvider';
import UpadateUserAvatarService from './UpdateUserAvatarService';
import FakeUsersRepostory from '../repositories/fakes/FakeUsersRepository';

describe('UpdateServiceAvatar', () => {
  it('should be create a new avatar to user', async () => {
    const fakeUsersRepository = new FakeUsersRepostory();
    const fakeDiskStorageRepository = new FakeDiskStorageProvider();
    const updateUserAvatarService = new UpadateUserAvatarService(
      fakeUsersRepository,
      fakeDiskStorageRepository,
    );

    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste',
      password: '123456'
    });

    const updatedUser = await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'image.jpg',
    });

    expect(updatedUser.avatar).toBe('image.jpg');
  });

  it('should not be create a new avatar to not existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepostory();
    const fakeDiskStorageRepository = new FakeDiskStorageProvider();
    const updateUserAvatarService = new UpadateUserAvatarService(
      fakeUsersRepository,
      fakeDiskStorageRepository,
    );

    expect(
      updateUserAvatarService.execute({
      user_id: '123123',
      avatarFilename: 'image.jpg',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be set a new avatar to user', async () => {
    const fakeUsersRepository = new FakeUsersRepostory();
    const fakeDiskStorageProvider = new FakeDiskStorageProvider();

    const deleteFile = jest.spyOn(fakeDiskStorageProvider, 'deleteFile');

    const updateUserAvatarService = new UpadateUserAvatarService(
      fakeUsersRepository,
      fakeDiskStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste',
      password: '123456'
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'image.jpg',
    });

    const updatedUser = await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'file.jpg',
    });

    expect(deleteFile).toBeCalledWith('image.jpg');
    expect(updatedUser.avatar).toBe('file.jpg');
  });
});
