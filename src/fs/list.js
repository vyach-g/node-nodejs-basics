import fs from 'fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

const list = async () => {
  const filesDirPath = path.join(__dirname, 'files');

  const filesDirExists = await fs
    .stat(filesDirPath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);

  if (!filesDirExists) {
    throw new Error('FS operation failed: Files folder does not exist');
  }

  const fileList = await fs.readdir(filesDirPath);
  console.log(fileList);
};

await list();
