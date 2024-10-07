import fs from 'fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

const copy = async () => {
  const files = await fs.readdir(path.join(__dirname, 'files')).catch((err) => {
    throw new Error('FS operation failed:: files folder doesnt exist');
  });

  let filesCopyFolderExists = await fs
    .access(path.join(__dirname, 'files_copy'), fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);

  if (filesCopyFolderExists) {
    throw new Error('FS operation failed: files_copy already exists');
  }

  await fs.mkdir(path.join(__dirname, 'files_copy'));

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    await fs.copyFile(path.join(__dirname, 'files', fileName), path.join(__dirname, 'files_copy', fileName));
  }
};

await copy();
