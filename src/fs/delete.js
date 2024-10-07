import fs from 'fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

const remove = async () => {
  const fileToRemove = path.join(__dirname, 'files', 'fileToRemove.txt');

  const fileToRemoveExists = await fs
    .stat(fileToRemove, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);

  if (!fileToRemoveExists) {
    throw new Error('FS operation failed: File to remove does not exist');
  }

  await fs.unlink(fileToRemove);
};

await remove();
