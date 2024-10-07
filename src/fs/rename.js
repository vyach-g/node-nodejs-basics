import path from 'path';
import fs from 'fs/promises';

const __dirname = import.meta.dirname;

const rename = async () => {
  const srcFilePath = path.join(__dirname, 'files', 'wrongFileName.txt');
  const destFilePath = path.join(__dirname, 'files', 'properFileName.md');

  const srcFileExists = await fs
    .access(srcFilePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);

  if (!srcFileExists) {
    throw new Error('FS operation failed: Source file does not exist');
  }

  const destFileExists = await fs
    .access(destFilePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);

  if (destFileExists) {
    throw new Error('FS operation failed: Destination file already exists');
  }

  await fs.rename(srcFilePath, destFilePath);
};

await rename();
