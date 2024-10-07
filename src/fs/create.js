import fs from 'fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

const create = async () => {
  const content = 'I am fresh and young';
  const filePath = path.join(__dirname, 'files', 'fresh.txt');

  let fileExists = false;
  try {
    await fs.access(filePath, fs.constants.F_OK);
    fileExists = true;
  } catch {}

  if (fileExists) {
    throw new Error('FS operation failed: File already exists');
  }

  try {
    await fs.writeFile(filePath, content);
  } catch (err) {
    console.log(err);
    throw new Error('FS operation failed:', err);
  }
};

await create();
