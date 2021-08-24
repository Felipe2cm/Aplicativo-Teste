import IStorageprovider from '../models/IStorageProvider';
import uplaodConfig from '@config/upload';
import fs from 'fs';
import path from 'path';

export default class DiskStorageProvider implements IStorageprovider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uplaodConfig.directory, file),
      path.resolve(uplaodConfig.uploadFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uplaodConfig.uploadFolder, file);

    try {
      fs.promises.stat(filePath);
    } catch (error) {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
