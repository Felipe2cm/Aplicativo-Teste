import { container } from 'tsyringe';

import IStorageProvider from '../providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '../providers/StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

// container.registerSingleton<IMailProvider>(
//   'MailProvider',

// )
